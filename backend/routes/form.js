// import express from "express";
// const router = express.Router();

// import { contactForm } from "../controllers/form";
// //validators
// import { runValidation } from "../validators";
// import { contactFormValidator } from "../validators/form";


const express = require('express');
const router = express.Router();
const {contactForm} = require('../controllers/form')
const{ runValidation }= require('../validators')
const {contactFormValidator}=require('../validators/form')



router.post('/contact', contactFormValidator, runValidation, contactForm);





module.exports = router;