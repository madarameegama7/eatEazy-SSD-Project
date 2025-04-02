require('dotenv').config();

module.exports = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    AUTH_SERVICE_PORT: process.env.AUTH_SERVICE_PORT,
    PAYMENT_SERVICE_PORT: process.env.PAYMENT_SERVICE_PORT,
    PAYHERE_MERCHANT_ID: process.env.PAYHERE_MERCHANT_ID,
    PAYHERE_MERCHANT_SECRET: process.env.PAYHERE_MERCHANT_SECRET,
    PAYHERE_MODE: process.env.PAYHERE_MODE || 'sandbox',
    PAYHERE_SANDBOX_URL: process.env.PAYHERE_SANDBOX_URL || 'https://sandbox.payhere.lk/pay/checkout',
    PAYHERE_RETURN_URL: process.env.PAYHERE_RETURN_URL,
    PAYHERE_CANCEL_URL: process.env.PAYHERE_CANCEL_URL,
    PAYHERE_NOTIFY_URL: process.env.PAYHERE_NOTIFY_URL,
    FRONTEND_SUCCESS_URL: process.env.FRONTEND_SUCCESS_URL,
    FRONTEND_CANCEL_URL: process.env.FRONTEND_CANCEL_URL
};