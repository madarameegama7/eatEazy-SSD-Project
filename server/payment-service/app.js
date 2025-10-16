require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');   // ✅ add helmet
const paymentRoutes = require('./src/routes/paymentRoutes');
const { PAYMENT_SERVICE_PORT } = require('./src/config/env');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Security headers
app.use(helmet.noSniff());           // fixes ZAP warning
app.disable('x-powered-by');         // removes "X-Powered-By: Express" header

// Routes
app.use('/', paymentRoutes);

// Health Check
app.get('/', (req, res) => {
    res.json({ status: 'Payment Service is running' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// Start Server
const PORT = PAYMENT_SERVICE_PORT || 4010;
app.listen(PORT, () => {
    console.log(`Payment Service running on port ${PORT}`);
});
