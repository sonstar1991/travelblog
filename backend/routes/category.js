// import express from "express";
// const router = express.Router();
// import { create, list, read, remove } from "../controllers/category";
// import { requireSignin, adminMiddleware } from "../controllers/auth";
// //validators
// import { runValidation } from "../validators";
// import { categoryCreateValidator } from "../validators/category";



const express = require('express');
const router = express.Router();
const { create, list, read, remove } =require('../controllers/category')
const { requireSignin, adminMiddleware } =require('../controllers/auth')
const { runValidation } =require('../validators')
const { categoryCreateValidator } =require('../validators/category')



router.post("/category", categoryCreateValidator, runValidation, requireSignin, adminMiddleware, create );

router.get("/categories", list)
router.get("/category/:slug", read)
router.delete("/category/:slug", requireSignin, adminMiddleware,remove)



module.exports = router;