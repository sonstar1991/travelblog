// import { check } from "express-validator";
const {check} = require('express-validator')



exports.userSignupValidator = [
  check("name")
    .not()
    .isEmpty()
    .withMessage('"Name is needed"'),
  check("email")
    .isEmail()
    .withMessage("must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password need to be 6 char long")
];

exports.userSigninValidator = [
  check("email")
    .isEmail()
    .withMessage("must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password need to be 6 char long")
];

exports.forgotPasswordValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("must be a valid email address")
];

exports.resetPasswordValidator = [
  check("newPassword")
    .not()
    .isEmpty()
    .isLength({min:6})
    .withMessage("Password must be at least 6 characters long")
];
