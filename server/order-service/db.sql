-- 1. Enums
CREATE TYPE cartstatus AS ENUM (
    'ACTIVE',
    'COMPLETED'
);

CREATE TYPE paymentstatus AS ENUM (
    'Pending',
    'Completed',
    'Failed'
);

-- 2. Carts table
CREATE TABLE carts (
    cartid SERIAL PRIMARY KEY,
    userid INT NOT NULL,
    restaurantid INT NOT NULL,
    status cartstatus NOT NULL DEFAULT 'ACTIVE',
    createdat TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedat TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 3. CartItems table
CREATE TABLE cartitems (
    cartitemsid SERIAL PRIMARY KEY,
    cartid INT NOT NULL,
    menuitemid INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DOUBLE PRECISION NOT NULL,
    CONSTRAINT fk_cart FOREIGN KEY (cartid)
        REFERENCES carts (cartid)
        ON DELETE CASCADE
);

-- 4. Orders table
CREATE TABLE orders (
    orderid SERIAL PRIMARY KEY,
    userid INT NOT NULL,
    restaurantid INT NOT NULL,
    cartid INT NOT NULL,
    totalamount DOUBLE PRECISION NOT NULL,
    status paymentstatus NOT NULL DEFAULT 'Pending',
    createdat TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedat TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_cart_order FOREIGN KEY (cartid)
        REFERENCES carts (cartid)
        ON DELETE CASCADE
);

-- 5. OrderItems table
CREATE TABLE orderitems (
    orderitemsid SERIAL PRIMARY KEY,
    orderid INT NOT NULL,
    menuitemid INT NOT NULL,
    quantity INT NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    CONSTRAINT fk_order FOREIGN KEY (orderid)
        REFERENCES orders (orderid)
        ON DELETE CASCADE
);
