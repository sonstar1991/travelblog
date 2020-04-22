// import express from "express";
// const router = express.Router();
// import { create, list, read, remove } from "../controllers/tag";
// import { requireSignin, adminMiddleware } from "../controllers/auth";
// //validators
// import { runValidation } from "../validators";
// import { tagCreateValidator } from "../validators/tag";



const express = require('express');
const router = express.Router();
const { create, list, read, remove } = require("../controllers/tag")
const { requireSignin, adminMiddleware } =require('../controllers/auth')
const {runValidation} =require('../validators')
const {tagCreateValidator}= require('../validators/tag')


router.post("/tag", tagCreateValidator, runValidation, requireSignin, adminMiddleware, create );

router.get("/tags", list)
router.get("/tag/:slug", read)
router.delete("/tag/:slug", requireSignin, adminMiddleware,remove)



module.exports = router;