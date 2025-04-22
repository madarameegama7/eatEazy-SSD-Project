const pool = require('../config/db');
const axios = require('axios');

const PaymentRepository = {
  createPayment: async (paymentData) => {
    const { OrderID, TransactionID, PaymentMethod, PaymentStatus, Amount } = paymentData;
    const query = `
      INSERT INTO Payments (OrderID, Amount, TransactionID, PaymentMethod, PaymentStatus)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [OrderID, Amount, TransactionID, PaymentMethod, PaymentStatus]);
    return result.insertId;
  },
  getOrderDetails: async (OrderID) => {
    try {
      const response = await axios.get(`http://localhost:4000/orders/getOrder/${OrderID}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error.response?.data || error.message);
      throw new Error('Unable to fetch order details');
    }
  },
  getPaymentById: async (PaymentID) => {
    const query = 'SELECT * FROM Payments WHERE PaymentID = ?';
    const [rows] = await pool.execute(query, [PaymentID]);
    return rows[0];
  },
  updatePaymentStatus: async (PaymentID, PaymentStatus) => {
    const query = 'UPDATE Payments SET PaymentStatus = ? WHERE PaymentID = ?';
    await pool.execute(query, [PaymentStatus, PaymentID]);
  },
  getPaymentsByOrderId: async (OrderID) => {
    const query = 'SELECT * FROM Payments WHERE OrderID = ?';
    const [rows] = await pool.execute(query, [OrderID]);
    return rows;
  }
};

module.exports = PaymentRepository;