// controllers/notificationController.js
const NotificationService = require('../services/notificationService'); 
const NotificationTypes = require('../constants/notificationTypes');
const { logger, mask } = require('../utils/logger');

// Handle request to create a notification (intended for service-to-service calls)
const createNotification = async (req, res) => {
    try {
        const { userId, message, channel, type } = req.body;

        if (!userId || !message || !channel) {
            return res.status(400).json({ message: 'userId, message, and channel are required' });
        }

        const result = await NotificationService.createNotification(userId, message, channel, type);

        if (channel === 'InApp') {
           res.status(201).json({ message: 'In-app notification created successfully', notificationId: result });
        } else {
           res.status(200).json({ message: `Notification request received for channel ${channel}` });
        }

    } catch (error) {
        console.error('Error in createNotification controller:', error);
        res.status(500).json({ message: 'Failed to create notification', error: error.message });
    }
};

// Handle request to send an email notification (intended for service-to-service calls)
const sendEmailNotification = async (req, res) => {
    try {
        const { email, userId, type, data } = req.body;

        if (!email || !userId || !type || !data) {
             return res.status(400).json({ message: 'email, userId, type, and data are required' });
        }

        // Call the service to send the email
        const result = await NotificationService.sendEmail(email, userId, type, data); // Pass all params

        res.status(200).json({ message: 'Email sent successfully', data: result });
    } catch (error) {
        console.error('Error in sendEmailNotification controller:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
};

// Handle request to send an SMS notification (intended for service-to-service calls)
const sendSMSNotification = async (req, res) => {
    try {
        const { phone, userId, type, data } = req.body;

         if (!phone || !userId || !type || !data) {
             return res.status(400).json({ message: 'phone, userId, type, and data are required' });
        }

        // Call the service to send the SMS
        const result = await NotificationService.sendSMS(phone, userId, type, data); // Pass all params

        res.status(200).json({ message: 'SMS sent successfully', data: result });
    } catch (error) {
        console.error('Error in sendSMSNotification controller:', error);
        res.status(500).json({ message: 'Failed to send SMS', error: error.message });
    }
};

// Handle request to get notifications for the authenticated user
const getMyNotifications = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId; 
        
        if (!userId) {
            console.error("User ID not found in req.user during getMyNotifications.");
            return res.status(401).json({ message: 'Unauthorized: User ID not found in token' });
        }

        console.log("Fetching notifications for user ID:", userId);

        const notifications = await NotificationService.getNotificationsByUserId(userId);

        res.status(200).json(notifications); 
    } catch (error) {
        console.error('Error in getMyNotifications controller:', error);
        res.status(500).json({ message: 'Failed to fetch notifications', error: error.message });
    }
};

// Corrected: Access functions directly from the imported NotificationService object
const markNotificationAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const userId = req.user?.id || req.user?.userId; 

        if (!userId) {
             console.error("User ID not found in req.user during markNotificationAsRead.");
            return res.status(401).json({ message: 'Unauthorized: User ID not found in token' });
        }
         if (!notificationId) {
             return res.status(400).json({ message: 'Notification ID is required' });
         }

        console.log(`Attempting to mark notification #${notificationId} as read for UserID ${userId}`);

        // Call the service function directly from the imported object
        const result = await NotificationService.markAsRead(notificationId, userId);

        if (result.updated) {
            res.status(200).json({ message: 'Notification marked as read successfully' });
        } else {
             res.status(400).json({ message: 'Notification not updated (already read or not found)' });
        }

    } catch (error) {
        console.error('Error in markNotificationAsRead controller:', error);
        res.status(500).json({ message: 'Failed to mark notification as read', error: error.message });
    }
};

// Corrected: Access functions directly from the imported NotificationService object
const markAllNotificationsAsRead = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId; 

        if (!userId) {
             console.error("User ID not found in req.user during markAllNotificationsAsRead.");
            return res.status(401).json({ message: 'Unauthorized: User ID not found in token' });
        }

         console.log(`Attempting to mark all notifications as read for UserID ${userId}`);

        // Call the service function directly from the imported object
        const result = await NotificationService.markAllAsRead(userId);

        res.status(200).json({ message: 'All unread notifications marked as read', affectedCount: result.affectedRows });

    } catch (error) {
        console.error('Error in markAllNotificationsAsRead controller:', error);
        res.status(500).json({ message: 'Failed to mark all notifications as read', error: error.message });
    }
};

// Process notifications from Order Service
const processOrderNotification = async (req, res) => {
    try {
      const { orderId, userId, customerEmail, customerPhone, status, notificationType } = req.body;
      
      // Validate required fields
      if (!orderId || !userId || !notificationType) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing required fields: orderId, userId, and notificationType are required'
        });
      }
      
      // Check if valid notification type
      if (!Object.values(NotificationTypes.ORDER).includes(notificationType)) {
        console.warn(`Received invalid order notification type: ${notificationType}`);
      }
      
      const result = await NotificationService.processOrderNotification(req.body, notificationType);
      
      return res.status(200).json({
        success: true,
        message: 'Order notification processed successfully'
      });
    } catch (error) {
      console.error('Error processing order notification:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to process order notification',
        error: error.message
      });
    }
  };
  
  // Process notifications from Payment Service
  const processPaymentNotification = async (req, res) => {
    try {
      const { orderId, userId, paymentId, amount, status, notificationType } = req.body;
      
      // Validate required fields
      if (!orderId || !userId || !notificationType) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing required fields: orderId, userId, and notificationType are required'
        });
      }
      
      // Check if valid notification type
      if (!Object.values(NotificationTypes.PAYMENT).includes(notificationType)) {
        console.warn(`Received invalid payment notification type: ${notificationType}`);
      }
      
      const result = await NotificationService.processPaymentNotification(req.body, notificationType);
      
      return res.status(200).json({
        success: true,
        message: 'Payment notification processed successfully'
      });
    } catch (error) {
      console.error('Error processing payment notification:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to process payment notification',
        error: error.message
      });
    }
  };
  
  // Process notifications from Delivery Service
  const processDeliveryNotification = async (req, res) => {
    try {
      const { orderId, userId, driverId, status, notificationType } = req.body;
      
      // Validate required fields
      if (!orderId || !userId || !notificationType) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing required fields: orderId, userId, and notificationType are required'
        });
      }
      
      // Check if valid notification type
      if (!Object.values(NotificationTypes.DELIVERY).includes(notificationType)) {
        console.warn(`Received invalid delivery notification type: ${notificationType}`);
      }
      
      const result = await NotificationService.processDeliveryNotification(req.body, notificationType);
      
      return res.status(200).json({
        success: true,
        message: 'Delivery notification processed successfully'
      });
    } catch (error) {
      console.error('Error processing delivery notification:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to process delivery notification',
        error: error.message
      });
    }
  };
  
  // Process notifications from Restaurant Service
  const processRestaurantNotification = async (req, res) => {
    try {
      const { orderId, userId, restaurantId, status, notificationType } = req.body;
      
      // Validate required fields
      if (!orderId || !userId || !notificationType) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing required fields: orderId, userId, and notificationType are required'
        });
      }
      
      // For simplicity, we'll reuse the order notification process
      const result = await NotificationService.processOrderNotification(req.body, notificationType);
      
      return res.status(200).json({
        success: true,
        message: 'Restaurant notification processed successfully'
      });
    } catch (error) {
      console.error('Error processing restaurant notification:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to process restaurant notification',
        error: error.message
      });
    }
  };


// Export controller functions
module.exports = {
    createNotification,
    sendEmailNotification,
    sendSMSNotification,
    getMyNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    processOrderNotification,
    processPaymentNotification,
    processDeliveryNotification,
    processRestaurantNotification
};
