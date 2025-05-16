// repository/paymentRepository.js
require('dotenv').config();
const pool = require('../config/db');
const axios = require('axios');
const { ORDER_SERVICE_URL } = require('../config/env');

const PaymentRepository = {
  createPayment: async (paymentData) => {
    const { OrderID, UserID, Amount, PaymentMethod, PaymentStatus = 'Completed' } = paymentData;
    
    const query = `
      INSERT INTO Payments (OrderID, UserID, Amount, PaymentMethod, PaymentStatus)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [OrderID, UserID, Amount, PaymentMethod, PaymentStatus]);
    return result.insertId;
  },
  
  getOrderDetailsFromService: async (OrderID, userToken) => {
    try {
      // Only try to fetch order details if we have a user token
      if (userToken) {
        const url = `http://localhost:4000/orders/getOrderByOrderId/${OrderID}`;
        console.log(`Fetching order details with user token: ${url}`);
        
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': userToken.startsWith('Bearer ') ? userToken : `Bearer ${userToken}`
        };
        
        try {
          const response = await axios.get(url, {
            headers,
            timeout: 5000
          });
      
          if (response.data) {
            console.log(`Successfully fetched order details for OrderID ${OrderID}`);
            return response.data;
          }
        } catch (requestError) {
          console.log(`Could not fetch order details with user token: ${requestError.message}`);
          // Continue to fallback
        }
      }
      
      console.log(`OrderID ${OrderID}: No user token or fetching with token failed. Using fallback data.`);
      
      // Return fallback data that contains the minimum we need for payment processing
      return {
        OrderID: parseInt(OrderID),
        UserID: 3, 
        TotalAmount: 0, 
        Email: process.env.FALLBACK_ADMIN_EMAIL || 'kumodib@gmail.com',
        Phone: process.env.FALLBACK_ADMIN_PHONE || '94768501850',
        Name: 'Kumodi Bogahawatte'
      };
    } catch (error) {
      console.error(`Unexpected error fetching order details: ${error.message}`);
      // Return fallback data even on unexpected errors
      return {
        OrderID: parseInt(OrderID),
        UserID: 3,
        TotalAmount: 0,
        Email: process.env.FALLBACK_ADMIN_EMAIL || 'kumodib@gmail.com',
        Phone: process.env.FALLBACK_ADMIN_PHONE || '94768501850',
        Name: 'Kumodi Bogahawatte'
      };
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
  },
  getPaymentHistoryByUserId: async (userId) => {
    try {
      // Directly query by UserID
      const query = 'SELECT * FROM Payments WHERE UserID = ? ORDER BY PaymentDate DESC';
      const [rows] = await pool.execute(query, [userId]);
      return rows;
    } catch (error) {
      console.error('Error in getPaymentHistoryByUserId:', error);
      throw error;
    }
  },
  updatePaymentTransactionDetails: async (paymentID, transactionID, amount) => {
    try {
      const query = 'UPDATE Payments SET TransactionID = ?, Amount = ?, UpdatedAt = CURRENT_TIMESTAMP WHERE PaymentID = ?';
      const [result] = await pool.execute(query, [transactionID, amount, paymentID]);
      console.log(`Updated payment #${paymentID} with transaction ID ${transactionID} and amount ${amount}`);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error updating payment transaction details for payment #${paymentID}:`, error);
      throw error;
    }
  }
};

module.exports = PaymentRepository;