// controllers/paymentController.js
const PaymentService = require('../services/paymentService');
require('dotenv').config();

const initiatePayment = async (req, res) => {
  try {
    // 1. Validate authentication
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided"
      });
    }
    const token = authHeader.split(" ")[1];

    // 2. Validate and parse OrderID
    const orderId = parseInt(req.params.OrderID); // Note: Changed from orderId to OrderID
    if (!orderId || isNaN(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID"
      });
    }

    // 3. Call payment service
    const paymentDetails = await PaymentService.initiatePayment(orderId, token);

    // 4. Return success response
    return res.status(201).json({
      success: true,
      message: 'Payment initiated successfully',
      data: paymentDetails
    });

  } catch (error) {
    // 5. Error handling
    console.error('Payment initiation failed:', error);

    // Handle specific error cases
    if (error.message.includes('Invalid order ID')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }

    if (error.message.includes('Authentication')) {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }

    // Generic error response
    return res.status(500).json({
      success: false,
      message: 'Failed to initiate payment',
      error: error.message
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

const getPaymentById = async (req, res) => {
  try {
    const { PaymentID } = req.params;
    
    // Guard against confusion with the /history endpoint
    if (PaymentID === 'history') {
      return res.status(400).json({ 
        error: 'Invalid payment ID. Did you mean to use the /payments/history endpoint?' 
      });
    }
    
    if (!PaymentID) {
      return res.status(400).json({ error: 'Payment ID is required' });
    }
    
    const payment = await PaymentService.getPaymentById(PaymentID);
    
    res.status(200).json({ payment });
  } catch (err) {
    console.error('Error fetching payment details:', err);
    
    if (err.message.includes('not found')) {
      return res.status(404).json({ message: err.message });
    }
    
    res.status(500).json({ 
      message: 'Failed to fetch payment details', 
      error: err.message 
    });
  }
};

const getPaymentsByOrderId = async (req, res) => {
  try {
    const { OrderID } = req.params;
    
    // Validate OrderID
    if (!OrderID) {
      return res.status(400).json({ error: 'OrderID is required' });
    }
    
    // Fetch payments for the specified OrderID
    const payments = await PaymentService.getPaymentsByOrderId(OrderID);

    // Return the payments associated with the OrderID
    res.status(200).json({ payments });
  } catch (error) {
    // Catch any error and send a 500 status with the error message
    console.error('Error fetching payments:', error);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }
    
    res.status(500).json({
      message: 'Failed to fetch payments',
      error: error.message
    });
  }
};

const getPaymentHistory = async (req, res) => {
  try {
    // Get user ID from authenticated token
    const userId = req.user.id || req.user.userId;
    
    if (!userId) {
      return res.status(400).json({ 
        message: 'User ID not found in token'
      });
    }
    
    // Pass the authorization token to the service
    const userToken = req.headers.authorization;
    
    // Get payment history for user
    const payments = await PaymentService.getPaymentHistoryByUserId(userId);
    
    res.status(200).json({
      success: true,
      payments: payments
    });
  } catch (err) {
    console.error('Error fetching payment history:', err);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch payment history', 
      error: err.message 
    });
  }
};


module.exports = {
  initiatePayment,
  handlePayHereNotify,
  updatePaymentStatus,
  getPaymentById,
  getPaymentsByOrderId,
  getPaymentHistory
};