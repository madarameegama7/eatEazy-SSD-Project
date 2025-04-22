const PaymentService = require('../services/paymentService');

const initiatePayment = async (req, res) => {
  try {
    const { OrderID, PaymentMethod } = req.body;
    
    // Validate required fields
    if (!OrderID || !PaymentMethod) {
      return res.status(400).json({ error: 'OrderID and PaymentMethod are required' });
    }
    
    // Validate payment method
    const validPaymentMethods = ['PayHere', 'Dialog Genie', 'FriMi', 'Stripe', 'PayPal'];
    if (!validPaymentMethods.includes(PaymentMethod)) {
      return res.status(400).json({ error: `Invalid payment method. Supported methods: ${validPaymentMethods.join(', ')}` });
    }
    
    const paymentDetails = await PaymentService.initiatePayment(OrderID, PaymentMethod);
    res.status(201).json({ 
      message: 'Payment initiated successfully', 
      paymentDetails 
    });
  } catch (err) {
    console.error('Error initiating payment:', err);
    
    if (err.message.includes('not found')) {
      return res.status(404).json({ message: err.message });
    }
    
    res.status(500).json({ 
      message: 'Failed to initiate payment', 
      error: err.message 
    });
  }
};

const handlePayHereNotify = async (req, res) => {
  try {
    // Log the notification for debugging
    console.log('Received PayHere notification:', req.body);
    
    // Validate required fields
    const requiredFields = ['merchant_id', 'order_id', 'payment_id', 'payhere_amount', 'payhere_currency', 'status_code', 'md5sig'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'Invalid notification data', 
        missingFields 
      });
    }
    
    const result = await PaymentService.processPayHereNotification(req.body);
    
    // Return 200 OK to PayHere
    res.status(200).json(result);
  } catch (error) {
    console.error('Payment notification error:', error);
    res.status(400).json({ message: error.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { PaymentID, PaymentStatus } = req.body;
    
    // Validate required fields
    if (!PaymentID || !PaymentStatus) {
      return res.status(400).json({ error: 'PaymentID and PaymentStatus are required' });
    }
    
    // Validate payment status
    const validStatuses = ['Pending', 'Completed', 'Failed'];
    if (!validStatuses.includes(PaymentStatus)) {
      return res.status(400).json({ error: `Invalid payment status. Valid statuses: ${validStatuses.join(', ')}` });
    }
    
    await PaymentService.updatePaymentStatus(PaymentID, PaymentStatus);
    res.status(200).json({ message: 'Payment status updated successfully' });
  } catch (err) {
    console.error('Error updating payment status:', err);
    
    if (err.message.includes('not found')) {
      return res.status(404).json({ message: err.message });
    }
    
    res.status(500).json({ 
      message: 'Failed to update payment status', 
      error: err.message 
    });
  }
};

const getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    if (!paymentId) {
      return res.status(400).json({ error: 'Payment ID is required' });
    }
    
    const payment = await PaymentService.getPaymentById(paymentId);
    
    if (!payment) {
      return res.status(404).json({ error: `Payment #${paymentId} not found` });
    }
    
    res.status(200).json({ payment });
  } catch (err) {
    console.error('Error fetching payment details:', err);
    res.status(500).json({ 
      message: 'Failed to fetch payment details', 
      error: err.message 
    });
  }
};

module.exports = {
  initiatePayment,
  handlePayHereNotify,
  updatePaymentStatus,
  getPaymentDetails
};