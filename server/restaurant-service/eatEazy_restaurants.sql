-- Create the database
CREATE DATABASE eatEazy_restaurants;

-- Use the created database
USE eatEazy_restaurants;

-- 1. Create restaurants table
CREATE TABLE restaurants (
    restaurantid SERIAL PRIMARY KEY,
    ownerid INT,
    restaurantname VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(255),
    availability VARCHAR(255) NOT NULL
);

-- 2. Create menuitems table
CREATE TABLE menuitems (
    menuitemid SERIAL PRIMARY KEY,
    restaurantid INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    isavailable BOOLEAN DEFAULT TRUE,
    CONSTRAINT menuitems_ibfk_1 FOREIGN KEY (restaurantid)
        REFERENCES restaurants (restaurantid)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);

-- 3. Create index on restaurantid in menuitems
CREATE INDEX restaurantid_idx ON menuitems (restaurantid);