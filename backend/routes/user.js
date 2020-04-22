// import express from "express";
// const router = express.Router();
// import {
//   requireSignin,
//   authMiddleware,
//   adminMiddleware
// } from "../controllers/auth";
// import {
//   userById,
//   read,
//   publicProfile,
//   update,
//   photo,
//   addFollowing,
//   addFollower,
//   removeFollowing,
//   removeFollower,
//   getUser
// } from "../controllers/user";


const express = require('express');
const router = express.Router();
const  {
    requireSignin,
    authMiddleware,
    adminMiddleware
  } =require("../controllers/auth")

const {
  userById,
  read,
  publicProfile,
  update,
  photo,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  getUser
} =require('../controllers/user')

// router.get("/user/:userId", requireSignin, getUser);
router.get("/user/profile", requireSignin, authMiddleware, read);
router.get("/user/:username", publicProfile);
router.put("/user/update", requireSignin, authMiddleware, update);
router.get("/user/photo/:username", photo);

router.put("/user/follow", requireSignin, addFollowing, addFollower);
router.put("/user/unfollow", requireSignin, removeFollowing, removeFollower);


// router.param("userId", userById);

module.exports = router;
