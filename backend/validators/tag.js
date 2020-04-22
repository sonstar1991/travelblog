// import { check } from "express-validator";


const {check}= require('express-validator')

exports.tagCreateValidator = [
  check("name")
    .not()
    .isEmpty()
    .withMessage('Tag is needed')
];
