-- Create Notification Database
CREATE DATABASE IF NOT EXISTS eateazy_notification;
USE eateazy_notification;

-- Notifications Table
CREATE TABLE IF NOT EXISTS Notifications (
    NotificationID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL, -- Link to the user who receives the notification
    Message TEXT NOT NULL, -- The content of the notification
    Channel ENUM('SMS', 'Email', 'InApp') DEFAULT 'InApp', -- The channel used
    NotificationType VARCHAR(100),  -- e.g., orderConfirmation, paymentSuccess, deliveryAssigned
    NotificationDate DATETIME DEFAULT CURRENT_TIMESTAMP, -- When the notification was created/sent
    IsRead BOOLEAN DEFAULT FALSE, -- For 'InApp' notifications, tracks if the user has read it
    -- Consider adding a foreign key to Users table if it exists in this DB or via application logic
    -- FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

-- Add indexes for faster querying
CREATE INDEX idx_notifications_userid ON Notifications (UserID);
CREATE INDEX idx_notifications_date ON Notifications (NotificationDate);
CREATE INDEX idx_notifications_isread ON Notifications (IsRead);

