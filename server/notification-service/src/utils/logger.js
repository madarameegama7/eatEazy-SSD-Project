// src/utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console()
    ],
});

// Helper to mask sensitive data
const mask = (value) => {
    if (!value) return value;
    const str = value.toString();
    if (str.includes('@')) { // email
        const [user, domain] = str.split('@');
        return `${user[0]}***@${domain}`;
    } else if (/^\d+$/.test(str)) { // phone
        return str.slice(0, 2) + '******' + str.slice(-2);
    }
    return str;
};

module.exports = { logger, mask };
