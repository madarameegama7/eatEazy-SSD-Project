-- Create the database
CREATE DATABASE "eatEazy_users";

-- Switch to the database (in psql you do: \c eatEazy_users)

-- Create enum type for Users_Role
CREATE TYPE users_role AS ENUM ('Admin', 'Restaurant', 'Customer', 'DeliveryPerson');

-- Create the Users table
CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    passwordhash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15),
    role users_role NOT NULL
);

-- Create the RefreshTokens table
CREATE TABLE refreshtokens (
    tokenid SERIAL PRIMARY KEY,
    token VARCHAR(255) UNIQUE NOT NULL,
    userid INT NOT NULL,
    expiresat TIMESTAMP NOT NULL,
    createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (userid) 
        REFERENCES users(userid) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

