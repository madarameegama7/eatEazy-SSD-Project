// src/services/notificationService.js
const NotificationModel = require("../models/notificationModel");
const nodemailer = require("nodemailer");
const axios = require("axios");
const templates = require("./notificationTemplates");
require("dotenv").config();

// Import SERVICE_API_KEY and API_GATEWAY_URL from env
const { SERVICE_API_KEY, API_GATEWAY_URL } = require('../config/env');
// Assuming USER_SERVICE_URL is also defined in Notification Service's .env if not using Gateway
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:4001'; // Default if not set

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  debug: true // Enable debug logging
});

// Add verification
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

// Helper function to fetch user details (email, phone)
const fetchUserDetails = async (userId) => {
    // Ensure userId is valid
    const userIdInt = parseInt(userId, 10);
    if (isNaN(userIdInt)) {
        console.error(`Invalid UserID provided to fetchUserDetails: ${userId}`);
        throw new Error('Invalid User ID for fetching details.');
    }

    // Use API Gateway URL or direct User Service URL
    const userServiceUrl = API_GATEWAY_URL || USER_SERVICE_URL; 

    try {
        console.log(`Attempting to fetch user details for UserID ${userIdInt} from ${userServiceUrl}/users/${userIdInt}`);
        const response = await axios.get(`${userServiceUrl}/users/${userIdInt}`, {
            headers: {
                'Authorization': `Bearer ${SERVICE_API_KEY}`, 
                'Content-Type': 'application/json',
            },
            timeout: 5000
        });

        if (response.status >= 200 && response.status < 300 && response.data) {
            console.log(`Successfully fetched user details for UserID ${userIdInt}.`);
            return response.data;
        } else {
            console.error(`User service returned non-success status ${response.status} or empty data for UserID ${userIdInt}.`, response.data);
            throw new Error(`User service returned status ${response.status}`);
        }

    } catch (error) {
         const errorMessage = error.response?.data?.message || error.message;
        console.error(`Failed to fetch user details for UserID ${userIdInt}: ${errorMessage}`);
         if (axios.isAxiosError(error) && error.response?.status === 404) {
             throw new Error(`User with ID ${userIdInt} not found in User Service.`);
         }
        throw new Error(`Failed to fetch user details: ${errorMessage}`);
    }
};

// Helper function to map notification types to template keys
const mapOrderTypeToTemplate = (notificationType) => {
  const templateMap = {
    'ORDER_CREATED': 'orderConfirmation',
    'ORDER_CONFIRMED': 'orderConfirmation',
    'ORDER_CANCELLED': 'orderCancelled',
    'PAYMENT_COMPLETED': 'paymentSuccess',
    'PAYMENT_FAILED': 'paymentFailed',
    'DELIVERY_ASSIGNED': 'deliveryAssigned',
    'DELIVERY_COMPLETED': 'orderDelivered'
  };
  
  return templateMap[notificationType] || 'orderUpdate';
};

// Define the NotificationService object
const NotificationService = {
  // Email notification
  sendEmail: async (email, userId, type, data) => { 
    // Validate email and type
    if (!email || typeof type !== 'string' || !templates.emailTemplates[type]) {
        console.error(`Invalid input for sendEmail: email=${email}, type=${type}. Type must be a valid string template key.`);
        throw new Error("Invalid input or notification type for email.");
    }
    try {
        const { subject, text } = templates.emailTemplates[type](data); // Use template key

        console.log(`Attempting to send email to ${email} (UserID ${userId}) with subject: "${subject}"`);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log(`Email sent successfully to ${email} (UserID ${userId}). MessageId: ${info.messageId}`);

        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error(`Error sending email (type: ${type}) to ${email}:`, error.message);
        if (error.response) console.error("Email Service Response:", error.response.data);
        throw new Error(`Failed to send email: ${error.message}`);
    }
  },

  // SMS notification using FitSMS
  sendSMS: async (phone, userId, type, data) => { 
    try {
      // Validate phone and type
      if (!phone || typeof type !== 'string' || !templates.smsTemplates[type]) {
        console.error(`Invalid input for sendSMS: phone=${phone}, type=${type}`);
        throw new Error(`Invalid input or notification type for SMS: ${type}`);
      }
  
      const text = templates.smsTemplates[type](data);
      
      // Format the phone number correctly for FitSMS
      let formattedPhone = phone.toString().trim();
      
      // If number starts with '0', replace with Sri Lanka country code (94)
      if (formattedPhone.startsWith('0')) {
        formattedPhone = '94' + formattedPhone.substring(1);
      }
      
      // Remove any '+' signs as FitSMS seems to have issues with them
      formattedPhone = formattedPhone.replace(/\+/g, '');
      
      console.log(`Attempting to send SMS to ${phone} (UserID ${userId}) with formatted number ${formattedPhone}`);
      
      const response = await axios.post(
        'https://app.fitsms.lk/api/v3/sms/send',
        {
          sender_id: process.env.FITSMS_SENDER_ID,
          type: "plain", 
          message: text,
          recipient: formattedPhone, // Use the formatted phone number
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.FITSMS_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 5000
        }
      );
  
      if (response.data && response.data.status !== 'SUCCESS') {
        console.error(`FitSMS API returned non-SUCCESS status:`, response.data);
        throw new Error(`FitSMS Error: ${response.data.message || JSON.stringify(response.data)}`);
      }
  
      console.log(`SMS sent successfully to ${phone} (UserID ${userId}). FitSMS Response:`, response.data);
  
      return { success: true, data: response.data };
    } catch (error) {
      console.error(`Error sending SMS (type: ${type}) to ${phone} (UserID ${userId}):`, error.message);
      if (error.response) {
        console.error("FitSMS Response data:", error.response.data);
        console.error("FitSMS Response status:", error.response.status);
      }
      throw new Error("Failed to send SMS");
    }
  },

  // In-app notifications
  createNotification: async (userId, message, channel = 'InApp', type = null) => {
      if (channel !== 'InApp') {
          console.warn(`createNotification service called with non-InApp channel: ${channel}. Skipping DB creation.`);
          return null;
      }
      if (!userId || !message) {
          console.error('Invalid input for createNotification: userId or message missing.');
          throw new Error('User ID and message are required for In-App notification.');
      }
    return await NotificationModel.createNotification(userId, message, channel, type);
  },

  // Fetch notifications by user
  getNotificationsByUserId: async (userId) => {
      if (!userId) {
          console.error('UserID is required to fetch notifications.');
          throw new Error('User ID is required.');
      }
       console.log(`Fetching notifications for UserID: ${userId}`);
    return await NotificationModel.getNotificationsByUserId(userId);
  },

   // Mark a notification as read
   markAsRead: async (notificationId, userId) => { 
        if (!notificationId || !userId) {
             console.error('Notification ID and User ID are required to mark as read.');
            throw new Error('Notification ID and User ID are required.');
        }
        console.log(`Marking notification #${notificationId} as read for UserID ${userId}`);
        const updated = await NotificationModel.markAsRead(notificationId, userId);
        if (!updated) {
             console.warn(`Notification #${notificationId} was not marked as read (already read or not found for user ${userId}).`);
        }
        return { success: true, updated: updated };
   },

   // Mark all notifications as read
   markAllAsRead: async (userId) => {
       if (!userId) {
            console.error('UserID is required to mark all as read.');
           throw new Error('User ID is required.');
       }
        console.log(`Marking all notifications as read for UserID ${userId}`);
       const affectedRows = await NotificationModel.markAllAsRead(userId);
        console.log(`Marked ${affectedRows} notifications as read for UserID ${userId}.`);
       return { success: true, affectedRows: affectedRows };
   },

  // Process order notifications
  processOrderNotification: async (orderData, notificationType) => {
    try {
      const { orderId, userId, customerEmail, customerPhone, restaurantId, items, status } = orderData;
      
      console.log(`Processing ${notificationType} notification for order #${orderId}`);
      
      // Validate required data
      if (!orderId || !userId) {
        throw new Error('Missing required order data');
      }

      // Format notification data for templates
      const templateData = {
        orderId,
        customerName: orderData.customerName || 'Customer',
        items: items || [],
        status,
        total: orderData.total || 0,
        eta: orderData.eta || 'soon'
      };

      // Create in-app notification
      const inAppMessage = `Your order #${orderId} status is now: ${status}`;
      await NotificationService.createNotification(userId, inAppMessage, 'InApp', notificationType);

      // Send email if email is provided
      if (customerEmail) {
        await NotificationService.sendEmail(
          customerEmail,
          userId,
          mapOrderTypeToTemplate(notificationType),
          templateData
        );
      }

      // Send SMS if phone is provided
      if (customerPhone) {
        await NotificationService.sendSMS(
          customerPhone,
          userId,
          mapOrderTypeToTemplate(notificationType),
          templateData
        );
      }

      return { success: true };
    } catch (error) {
      console.error(`Failed to process order notification: ${error.message}`);
      return { success: false, error: error.message };
    }
  },

  // Process payment notifications
  processPaymentNotification: async (paymentData, notificationType) => {
    try {
      const { orderId, userId, customerEmail, customerPhone, amount, paymentMethod, status } = paymentData;
      
      console.log(`Processing ${notificationType} notification for payment on order #${orderId}`);
      
      if (!orderId || !userId) {
        throw new Error('Missing required payment data');
      }

      // Format data for templates
      const templateData = {
        orderId,
        customerName: paymentData.customerName || 'Customer',
        totalAmount: amount || 0,
        paymentMethod: paymentMethod || 'online payment',
        status
      };

      // Create in-app notification
      const inAppMessage = status === 'Completed' 
        ? `Payment of LKR ${amount} for your order #${orderId} was successful.`
        : `Payment for your order #${orderId} has ${status.toLowerCase()}.`;
      
      await NotificationService.createNotification(userId, inAppMessage, 'InApp', notificationType);

      // Send email
      if (customerEmail) {
        await NotificationService.sendEmail(
          customerEmail,
          userId,
          status === 'Completed' ? 'paymentSuccess' : 'paymentFailed',
          templateData
        );
      }

      // Send SMS
      if (customerPhone) {
        await NotificationService.sendSMS(
          customerPhone,
          userId,
          status === 'Completed' ? 'paymentSuccess' : 'paymentFailed',
          templateData
        );
      }

      return { success: true };
    } catch (error) {
      console.error(`Failed to process payment notification: ${error.message}`);
      return { success: false, error: error.message };
    }
  },

  // Process delivery notifications
  processDeliveryNotification: async (deliveryData, notificationType) => {
    try {
      const { orderId, userId, customerEmail, customerPhone, driverName, driverId, status, location } = deliveryData;
      
      console.log(`Processing ${notificationType} notification for delivery of order #${orderId}`);
      
      if (!orderId || !userId) {
        throw new Error('Missing required delivery data');
      }

      // Format data for templates
      const templateData = {
        orderId,
        customerName: deliveryData.customerName || 'Customer',
        driverName: driverName || 'your delivery partner',
        status,
        eta: deliveryData.eta || 'soon',
        location: location || {}
      };

      // Create different in-app messages based on status
      let inAppMessage;
      let templateType;
      
      switch (notificationType) {
        case 'DELIVERY_ASSIGNED':
          inAppMessage = `Your order #${orderId} will be delivered by ${driverName}.`;
          templateType = 'deliveryAssigned';
          break;
        case 'DELIVERY_PICKED_UP':
          inAppMessage = `Your order #${orderId} has been picked up and is on the way.`;
          templateType = 'deliveryPicked';
          break;
        case 'DELIVERY_COMPLETED':
          inAppMessage = `Your order #${orderId} has been delivered. Enjoy your meal!`;
          templateType = 'orderDelivered';
          break;
        default:
          inAppMessage = `Delivery update for your order #${orderId}: ${status}`;
          templateType = 'orderUpdate';
      }
      
      // Create in-app notification for customer
      await NotificationService.createNotification(userId, inAppMessage, 'InApp', notificationType);
      
      // Send notifications to customer
      if (customerEmail) {
        await NotificationService.sendEmail(customerEmail, userId, templateType, templateData);
      }
      
      if (customerPhone) {
        await NotificationService.sendSMS(customerPhone, userId, templateType, templateData);
      }
      
      // If this is a new delivery assignment, also notify the driver
      if (notificationType === 'DELIVERY_ASSIGNED' && driverId) {
        const driverMessage = `New delivery assignment: Order #${orderId}. Please pick up from restaurant.`;
        await NotificationService.createNotification(driverId, driverMessage, 'InApp', 'DRIVER_ASSIGNMENT');
        
        // Get driver contact details and send SMS notification
        try {
          const driverDetails = await fetchUserDetails(driverId);
          if (driverDetails && driverDetails.Phone) {
            const driverSmsData = {
              orderId,
              restaurantName: deliveryData.restaurantName || 'the restaurant',
              restaurantAddress: deliveryData.restaurantAddress || 'address on file',
              customerAddress: deliveryData.customerAddress || 'delivery address'
            };
            
            await NotificationService.sendSMS(
              driverDetails.Phone, 
              driverId, 
              'driverAssignment', 
              driverSmsData
            );
          }
        } catch (driverError) {
          console.error(`Failed to notify driver #${driverId}: ${driverError.message}`);
          // Continue execution - driver notification failure shouldn't block customer notification
        }
      }

      return { success: true };
    } catch (error) {
      console.error(`Failed to process delivery notification: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
};

module.exports = NotificationService;
