// validation/notificationValidation.js
const { body } = require("express-validator");

exports.validateCreateNotification = [
  body("userId")
    .isInt().withMessage("userId must be an integer"),

  body("type")
    .isIn(["EMAIL", "SMS", "IN_APP"])
    .withMessage("Type must be one of: EMAIL, SMS, IN_APP"),

  body("message")
    .isString()
    .trim()
    .isLength({ min: 1, max: 500 })
    .escape()
    .withMessage("Message must be between 1 and 500 characters"),

  body("email")
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email format"),

  body("phone")
    .optional()
    .matches(/^\+\d{10,15}$/)
    .withMessage("Phone must be in E.164 format (+xxxxxxxxxxx)"),
];
