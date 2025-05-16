/*
  Warnings:

  - The primary key for the `RefreshTokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `RefreshTokens` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `RefreshTokens` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `RefreshTokens` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `RefreshTokens` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `RefreshTokens` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `RefreshTokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Token]` on the table `RefreshTokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ExpiresAt` to the `RefreshTokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Token` to the `RefreshTokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TokenID` to the `RefreshTokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `RefreshTokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserID` to the `RefreshTokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `RefreshTokens` DROP FOREIGN KEY `RefreshTokens_userId_fkey`;

-- DropIndex
DROP INDEX `RefreshTokens_token_key` ON `RefreshTokens`;

-- DropIndex
DROP INDEX `RefreshTokens_userId_fkey` ON `RefreshTokens`;

-- AlterTable
ALTER TABLE `RefreshTokens` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `expiresAt`,
    DROP COLUMN `id`,
    DROP COLUMN `token`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `ExpiresAt` DATETIME(3) NOT NULL,
    ADD COLUMN `Token` VARCHAR(191) NOT NULL,
    ADD COLUMN `TokenID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `UpdatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `UserID` INTEGER NOT NULL,
    ADD PRIMARY KEY (`TokenID`);

-- CreateIndex
CREATE UNIQUE INDEX `RefreshTokens_Token_key` ON `RefreshTokens`(`Token`);

-- AddForeignKey
ALTER TABLE `RefreshTokens` ADD CONSTRAINT `RefreshTokens_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;
