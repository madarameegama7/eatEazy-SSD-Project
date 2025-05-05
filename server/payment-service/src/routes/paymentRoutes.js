// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
// const PaymentRepository = require('../repository/paymentRepository');

// Route to get payment history for authenticated user
router.get('/history', authenticateToken, PaymentController.getPaymentHistory);
// Route to initiate payment
router.post('/initiate', authenticateToken, PaymentController.initiatePayment);

// Routes for PayHere callbacks
router.post('/notify', PaymentController.handlePayHereNotify);

// Route to manually update payment status (admin)
router.put('/status', authenticateToken, isAdmin, PaymentController.updatePaymentStatus);

// Route to get payment details
router.get('/:PaymentID', authenticateToken, PaymentController.getPaymentById);

// Route to get payments by order ID
router.get('/order/:OrderID', authenticateToken, PaymentController.getPaymentsByOrderId);

// // Route to get order details from the order service
// router.get('/orders/:OrderID',authenticateToken,PaymentRepository.getOrderDetailsFromService)

// Add this route to the payment routes
router.get('/health', (req, res) => {
    res.status(200).json({
      status: 'UP',
      service: 'Payment Service',
      timestamp: new Date().toISOString()
    });
  });
  

module.exports = router;