const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/authMiddleware');
const PaymentModel = require('../models/paymentModel');

// Route to initiate payment
router.post('/initiate', authenticateToken, PaymentController.initiatePayment);

// Routes for PayHere callbacks
router.post('/notify', PaymentController.handlePayHereNotify);

// Route to manually update payment status (admin)
router.put('/status', authenticateToken, PaymentController.updatePaymentStatus);

// Route to get payment details
router.get('/:paymentId', authenticateToken, PaymentController.getPaymentDetails);

// Route to get payments by order ID
router.get('/order/:orderId', authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const payments = await PaymentModel.getPaymentsByOrderId(orderId);
    res.status(200).json({ payments });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch payments',
      error: error.message
    });
  }
});

module.exports = router;
