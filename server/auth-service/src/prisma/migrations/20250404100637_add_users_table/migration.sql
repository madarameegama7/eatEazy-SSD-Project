-- CreateTable
CREATE TABLE `Users` (
    `UserID` INTEGER NOT NULL AUTO_INCREMENT,
    `Firstname` VARCHAR(255) NOT NULL,
    `Lastname` VARCHAR(255) NOT NULL,
    `PasswordHash` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(255) NOT NULL,
    `Phone` VARCHAR(15) NULL,
    `Role` ENUM('Admin', 'Restaurant', 'Customer', 'DeliveryPerson') NOT NULL DEFAULT 'Customer',

    UNIQUE INDEX `Users_Email_key`(`Email`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
