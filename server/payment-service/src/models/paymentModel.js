// models/paymentModel.js
const PaymentRepository = require('../repository/paymentRepository');

const PaymentModel = {
  createPayment: async (paymentData) => {
    return await PaymentRepository.createPayment(paymentData);
  },
  
  getOrderDetailsFromService: async (OrderID, userToken) => {
    return await PaymentRepository.getOrderDetailsFromService(OrderID, userToken);
  },
  
  getPaymentById: async (PaymentID) => {
    return await PaymentRepository.getPaymentById(PaymentID);
  },
  
  updatePaymentStatus: async (PaymentID, PaymentStatus) => {
    return await PaymentRepository.updatePaymentStatus(PaymentID, PaymentStatus);
  },
  
  getPaymentsByOrderId: async (OrderID) => {
    return await PaymentRepository.getPaymentsByOrderId(OrderID);
  },

  getPaymentHistoryByUserId: async (userId) => {
    return await PaymentRepository.getPaymentHistoryByUserId(userId);
  },
  updatePaymentTransactionDetails: async (paymentID, transactionID, amount) => {
    const query = 'UPDATE Payments SET TransactionID = ?, Amount = ?, UpdatedAt = CURRENT_TIMESTAMP WHERE PaymentID = ?';
    await pool.execute(query, [transactionID, amount, paymentID]);
  },
};

module.exports = PaymentModel;
