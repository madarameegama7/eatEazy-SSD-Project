require('dotenv').config();
console.log(process.env.DB_HOST);  // debug line

module.exports = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    DB_URL: process.env.DB_URL,
    AUTH_SERVICE_PORT: process.env.AUTH_SERVICE_PORT,
    ORDER_SERVICE_PORT: process.env.ORDER_SERVICE_PORT,
    RESTAURANT_SERVICE_PORT: process.env.RESTAURANT_SERVICE_PORT
};
