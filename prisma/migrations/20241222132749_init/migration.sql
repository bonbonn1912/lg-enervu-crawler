-- CreateTable
CREATE TABLE `LgPowerData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pvPower` DOUBLE NOT NULL,
    `gridPower` DOUBLE NOT NULL,
    `loadPower` DOUBLE NOT NULL,
    `batterySoc` DOUBLE NOT NULL,
    `batteryStatus` INTEGER NOT NULL,
    `batteryPower` DOUBLE NOT NULL,
    `batteryStrStatus` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
