// import express from "express";
// const router = express.Router();
// import { signup, signin, signout, requireSignin, forgotPassword,resetPassword, preSignup, googleLogin} from "../controllers/auth";

// // //validators
// import { runValidation } from "../validators";
// import { userSignupValidator, userSigninValidator, forgotPasswordValidator,resetPasswordValidator } from "../validators/auth";


const express = require('express');
const router = express.Router();
const {signup, signin, signout, requireSignin, forgotPassword,resetPassword, preSignup, googleLogin}= require('../controllers/auth')

const {runValidation} = require('../validators')
const{userSignupValidator, userSigninValidator, forgotPasswordValidator,resetPasswordValidator} = require('../validators/auth')


router.post("/pre-signup", userSignupValidator, runValidation, preSignup);

router.post("/signup", signup);

router.post("/signin", userSigninValidator, runValidation, signin);

router.get("/signout", signout);

router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword)
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword)

//google
// router.post('/google-login', googleLogin);

module.exports = router;
