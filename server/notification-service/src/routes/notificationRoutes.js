const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { authenticateToken } = require("../middleware/authMiddleware");
const serviceAuth = require("../middleware/serviceAuth");

// Validation imports
const {
  validateCreateNotification,
  validateSendEmail,
  validateSendSMS,
} = require("../validation/notificationValidation");
const handleValidationErrors = require("../middleware/validationHandler");

// Service-to-service routes (protected by serviceAuth middleware)
router.post(
  "/create",
  serviceAuth,
  validateCreateNotification,
  handleValidationErrors,
  notificationController.createNotification
);

router.post(
  "/send-email",
  serviceAuth,
  validateSendEmail,
  handleValidationErrors,
  notificationController.sendEmailNotification
);

router.post(
  "/send-sms",
  serviceAuth,
  validateSendSMS,
  handleValidationErrors,
  notificationController.sendSMSNotification
);

// NEW SERVICE INTEGRATION ROUTES - all protected by serviceAuth
router.post("/service/order", serviceAuth, notificationController.processOrderNotification);
router.post("/service/payment", serviceAuth, notificationController.processPaymentNotification);
router.post("/service/delivery", serviceAuth, notificationController.processDeliveryNotification);
router.post("/service/restaurant", serviceAuth, notificationController.processRestaurantNotification);

// User-facing routes (protected by authenticateToken middleware)
router.get("/myNotifications", authenticateToken, notificationController.getMyNotifications);
router.put("/mark-all-read", authenticateToken, notificationController.markAllNotificationsAsRead);
router.put("/:notificationId/read", authenticateToken, notificationController.markNotificationAsRead);

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "Notification Service",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
