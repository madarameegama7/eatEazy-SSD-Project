const winston = require('winston');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/app.log');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.File({ filename: logFilePath }),
        new winston.transports.Console()
    ],
});

module.exports = logger;
