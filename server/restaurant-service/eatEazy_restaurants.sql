-- Create the database
CREATE DATABASE eatEazy_restaurants;

-- Use the created database
USE eatEazy_restaurants;

-- Create the Restaurants table
CREATE TABLE Restaurants (
    RestaurantID INT AUTO_INCREMENT PRIMARY KEY,
    OwnerID INT,
    RestaurantName VARCHAR(255) NOT NULL,
    Address TEXT NOT NULL,
    Phone VARCHAR(15),
    Email VARCHAR(255),
    Availability VARCHAR(255) NOT NULL
);

-- Create the MenuItems table
CREATE TABLE MenuItems (
    MenuItemID INT AUTO_INCREMENT PRIMARY KEY,
    RestaurantID INT,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    IsAvailable BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (RestaurantID) REFERENCES Restaurants(RestaurantID)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    INDEX RestaurantID (RestaurantID)
);
