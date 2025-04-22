const crypto = require('crypto');
const axios = require('axios');
const PaymentModel = require('../models/paymentModel');
const {
  PAYHERE_MERCHANT_SECRET,
  PAYHERE_MERCHANT_ID,
  PAYHERE_RETURN_URL,
  PAYHERE_CANCEL_URL,
  PAYHERE_NOTIFY_URL,
  SERVICE_API_KEY
} = require('../config/env');

// Helper: Generate PayHere Signature
const generateSignature = (orderDetails, merchantSecret) => {
  const stringToHash = `${orderDetails.merchant_id}${orderDetails.order_id}${orderDetails.amount}${orderDetails.currency}${merchantSecret}`;
  return crypto.createHash('md5').update(stringToHash).digest('hex').toUpperCase();
};

// Helper: Update order service payment status (with retry)
const sendOrderPaymentUpdate = async (orderID, paymentStatus) => {
  const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:5006';

  return axios.put(`${ORDER_SERVICE_URL}/orders/${orderID}/payment-status`, {
    paymentStatus
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SERVICE_API_KEY}`
    },
    timeout: 5000
  });
};

const updateOrderPaymentStatus = async (orderID, paymentStatus) => {
  try {
    const response = await sendOrderPaymentUpdate(orderID, paymentStatus);
    console.log(`Order #${orderID} payment status updated to ${paymentStatus}`);
    return response.data;
  } catch (error) {
    console.error(`Initial update failed for order #${orderID}:`, error.response?.data || error.message);

    try {
      console.log(`Retrying update for order #${orderID}...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      const retryResponse = await sendOrderPaymentUpdate(orderID, paymentStatus);
      console.log(`Retry successful: Order #${orderID} payment status updated to ${paymentStatus}`);
      return retryResponse.data;
    } catch (retryError) {
      console.error(`Retry failed for order #${orderID}:`, retryError.message);
      throw new Error(`Failed to update order payment status: ${retryError.message}`);
    }
  }
};

// Helper: Send Notification
const sendPaymentNotification = async (orderID, paymentStatus, amount) => {
  try {
    const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:4010';

    const response = await axios.post(`${NOTIFICATION_SERVICE_URL}/notifications`, {
      type: 'PAYMENT_STATUS_CHANGE',
      orderID,
      paymentStatus,
      amount,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_API_KEY}`
      },
      timeout: 5000
    });

    console.log(`Payment notification sent for order #${orderID}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to send notification for order #${orderID}:`, error.response?.data || error.message);
    return { success: false, error: error.message };
  }
};

// Payment initiation
const initiatePayment = async (OrderID, PaymentMethod) => {
  const orderDetails = await PaymentModel.getOrderDetails(OrderID);
  if (!orderDetails) throw new Error(`Order #${OrderID} not found`);

  let orderTotal = typeof orderDetails.TotalAmount === 'number'
    ? orderDetails.TotalAmount
    : parseFloat(orderDetails.TotalAmount);

  if (isNaN(orderTotal)) {
    throw new Error('Invalid TotalAmount value');
  }

  const TransactionID = `TEMP_${Date.now()}`;
  const paymentData = {
    OrderID,
    TransactionID,
    PaymentMethod,
    PaymentStatus: 'Pending',
    Amount: orderTotal
  };

  const PaymentID = await PaymentModel.createPayment(paymentData);
  let redirectUrl = '';

  if (PaymentMethod === 'PayHere') {
    const baseUrl = process.env.PAYHERE_BASE_URL || 'https://sandbox.payhere.lk/pay/checkout';
    const hash = generateSignature({
      merchant_id: PAYHERE_MERCHANT_ID,
      order_id: OrderID.toString(),
      amount: orderTotal.toFixed(2),
      currency: 'LKR'
    }, PAYHERE_MERCHANT_SECRET);

    const queryParams = new URLSearchParams({
      merchant_id: PAYHERE_MERCHANT_ID,
      return_url: PAYHERE_RETURN_URL,
      cancel_url: PAYHERE_CANCEL_URL,
      notify_url: PAYHERE_NOTIFY_URL,
      order_id: OrderID.toString(),
      items: `Order #${OrderID}`,
      amount: orderTotal.toFixed(2),
      currency: 'LKR',
      hash
    }).toString();

    redirectUrl = `${baseUrl}?${queryParams}`;
  } else {
    redirectUrl = 'Not implemented yet';
  }

  try {
    await updateOrderPaymentStatus(OrderID, 'Pending');
  } catch (err) {
    console.error(`Order update failed during payment initiation:`, err.message);
  }

  return {
    PaymentID,
    redirectUrl,
    PaymentStatus: 'Pending'
  };
};

// Process PayHere Notification
const processPayHereNotification = async (data) => {
  const {
    merchant_id,
    order_id,
    payment_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig
  } = data;

  const stringToHash = `${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${crypto.createHash('md5').update(PAYHERE_MERCHANT_SECRET).digest('hex')}`;
  const localSig = crypto.createHash('md5').update(stringToHash).digest('hex').toUpperCase();

  if (md5sig !== localSig) {
    throw new Error('MD5 signature mismatch');
  }

  const paymentStatus = status_code === '2' ? 'Completed' : 'Failed';
  const existingPayments = await PaymentModel.getPaymentsByOrderId(order_id);
  let paymentID;

  if (existingPayments && existingPayments.length > 0) {
    const pendingPayment = existingPayments.find(p => p.PaymentStatus === 'Pending');
    if (pendingPayment) {
      paymentID = pendingPayment.PaymentID;
      await PaymentModel.updatePaymentStatus(paymentID, paymentStatus);
    } else {
      const paymentData = {
        OrderID: order_id,
        TransactionID: payment_id,
        PaymentMethod: 'PayHere',
        PaymentStatus: paymentStatus,
        Amount: payhere_amount
      };
      paymentID = await PaymentModel.createPayment(paymentData);
    }
  }

  try {
    await updateOrderPaymentStatus(order_id, paymentStatus);
  } catch (err) {
    console.error(`Failed to update order status for #${order_id}:`, err.message);
  }

  try {
    await sendPaymentNotification(order_id, paymentStatus, payhere_amount);
  } catch (err) {
    console.error(`Failed to send notification for #${order_id}:`, err.message);
  }

  return {
    message: 'Payment processed and saved',
    paymentID,
    status: paymentStatus
  };
};

// Update payment status manually
const updatePaymentStatus = async (PaymentID, PaymentStatus) => {
  await PaymentModel.updatePaymentStatus(PaymentID, PaymentStatus);
  const paymentDetails = await PaymentModel.getPaymentById(PaymentID);
  if (!paymentDetails) throw new Error(`Payment #${PaymentID} not found`);

  try {
    await updateOrderPaymentStatus(paymentDetails.OrderID, PaymentStatus);
  } catch (err) {
    console.error(`Failed to update order #${paymentDetails.OrderID} status:`, err.message);
  }

  try {
    await sendPaymentNotification(paymentDetails.OrderID, PaymentStatus, paymentDetails.Amount);
  } catch (err) {
    console.error(`Failed to notify for order #${paymentDetails.OrderID}:`, err.message);
  }
};

// Expose functions
module.exports = {
  initiatePayment,
  processPayHereNotification,
  updatePaymentStatus,
  generateSignature,
  updateOrderPaymentStatus,
  sendPaymentNotification
};
