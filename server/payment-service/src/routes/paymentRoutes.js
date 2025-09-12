const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/history/:UserID', authenticateToken, PaymentController.getPaymentHistory);
router.post('/initiate/:OrderID',PaymentController.initiatePayment);
router.post('/notify', PaymentController.handlePayHereNotify);
router.put('/status', authenticateToken, isAdmin, PaymentController.updatePaymentStatus);
router.get('/:PaymentID', authenticateToken, PaymentController.getPaymentById);
router.get('/order/:OrderID', authenticateToken, PaymentController.getPaymentsByOrderId);


// Add this route to the payment routes
router.get('/health', (req, res) => {
    res.status(200).json({
      status: 'UP',
      service: 'Payment Service',
      timestamp: new Date().toISOString()
    });
  });
  

module.exports = router;