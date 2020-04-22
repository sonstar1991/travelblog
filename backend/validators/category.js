// import { check } from "express-validator";
const {check} = require('express-validator')



exports.categoryCreateValidator = [
  check("name")
    .not()
    .isEmpty()
    .withMessage('Category is needed')
];
