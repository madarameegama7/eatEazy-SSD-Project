const express = require('express');
const notificationRoutes = require('./src/routes/notificationRoutes');
const { NOTIFICATION_SERVICE_PORT } = require('./src/config/env');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');   // ✅ add helmet for security headers

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Security headers
app.use(helmet.noSniff());               // Prevent MIME sniffing
app.use(helmet.hidePoweredBy());         // Remove X-Powered-By: Express
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],            // Block everything by default
      scriptSrc: ["'self'"],             // Allow scripts only from same origin
      styleSrc: ["'self'", "https:"],    // Allow styles from self + https
      imgSrc: ["'self'", "data:"],       // Allow images from self + base64
      connectSrc: ["'self'"],            // Allow API/XHR/WebSocket only to self
      objectSrc: ["'none'"],             // Block Flash/ActiveX
      upgradeInsecureRequests: [],       // Upgrade http -> https
    },
  })
);

// Routes
app.use('/', notificationRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Database connection test is complete!');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// Start the Server
app.listen(NOTIFICATION_SERVICE_PORT || 4010, () => {
    console.log(`Server is running on port ${NOTIFICATION_SERVICE_PORT || 4010}`);
});
