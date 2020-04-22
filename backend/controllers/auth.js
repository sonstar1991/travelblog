// import User from "../models/user";
// import shortId from "shortid";
// import jwt from "jsonwebtoken";
// import expressJwt from "express-jwt";
// import Blog from "../models/blog";
// import _ from "lodash";
// //email
// import sgMail from "@sendgrid/mail";


const User = require('../models/user')
const shortId =require('shortid')
const jwt =require('jsonwebtoken')
const expressJwt=require('express-jwt')
const Blog =require('../models/blog')
const _ =require('lodash')
const sgMail=require('@sendgrid/mail')





sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require("dotenv").config();
//googlle
// import { OAuth2Client } from "google-auth-library";

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// exports.googleLogin = (req, res) => {

//     const idToken = req.body.tokenId;
//     client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID }).then(response => {
//         // console.log(response)
//         const { email_verified, name, email, jti } = response.payload;
//         if (email_verified) {
//             User.findOne({ email }).exec((err, user) => {
//                 if (user) {
//                     // console.log(user)
//                     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//                     res.cookie('token', token, { expiresIn: '1d' });
//                     const { _id, email, name, role, username } = user;
//                     return res.json({ token, user: { _id, email, name, role, username } });
//                 } else {
//                     let username = shortId.generate();
//                     let profile = `${process.env.CLIENT_URL}/profile/${username}`;
//                     let password = jti;
//                     user = new User({ name, email, profile, username, password });
//                     user.save((err, data) => {
//                         if (err) {
//                             return res.status(400).json({
//                                 error: errorHandler(err)
//                             });
//                         }
//                         const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//                         res.cookie('token', token, { expiresIn: '1d' });
//                         const { _id, email, name, role, username } = data;
//                         return res.json({ token, user: { _id, email, name, role, username } });
//                     });
//                 }
//             });
//         } else {
//             return res.status(400).json({
//                 error: 'Google login failed. Try again.'
//             });
//         }
//     });
// };

exports.preSignup = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken"
      });
    }
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "10m" }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Account Activation Link`,
      html: `
              <h4>Please use the following link to activate your account:</h4>
              <p>${process.env.CLIENT_URL}/auth/account/activate/${token}</p>
              <p>travel blog</p>
          `
    };

    sgMail.send(emailData).then(sent => {
      return res.json({
        message: `Email has been sent to ${email}. Please follow the instructions to activate your account`
      });
    });
  });
};

exports.signup = (req, res) => {
  const token = req.body.token;
  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(
      err,
      decoded
    ) {
      if (err) {
        return res.status(401).json({
          error: "Expired link. Signup again"
        });
      }
      const { name, email, password } = jwt.decode(token);
      let username = shortId.generate();
      let profile = `${process.env.CLIENT_URL}/profile/${username}`;

      const user = new User({ name, email, password, profile, username });
      user.save((err, user) => {
        if (err) {
          return res.status(401).json({
            error: errorHandler(err)
          });
        }
        return res.json({
          message: "Signup Success, Please SignIn"
        });
      });
    });
  } else {
    return res.status(401).json({
      error: "Something went wrong please try again"
    });
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  //check the user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email not exist, signup please!"
      });
    }

    //auth email and password compare hash with database from models the userSchema.methods the authenticate function
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match"
      });
    }

    //generate a jwt and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, name, email, role } = user;
    return res.json({
      token,
      user: { _id, username, name, email, role }
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout Successful"
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET
});

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user not found"
      });
    }
    req.profile = user;
    next();
  });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user not found"
      });
    }

    if (user.role !== 1) {
      return res.status(400).json({
        error: "admin not resource. ACCESS DENIED!"
      });
    }

    req.profile = user;
    next();
  });
};

exports.canUpdateDeleteBlog = (req, res, next) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    let authorizedUser =
      data.postedBy._id.toString() === req.profile._id.toString();
    if (!authorizedUser) {
      return res.status(400).json({
        error: "Not authorized"
      });
    }
    next();
  });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User with that email does not exist"
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: "10m"
    });

    //email
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Password Reset Link`,
      html: `
          <h4>Please use the following link to reset your password:</h4>
          <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
          <p>travel blog</p>
      `
    };

    //populating the db > user> resetPasswordLink
    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        return res.json({ error: errorHandler(err) });
      } else {
        sgMail.send(emailData).then(sent => {
          return res.json({
            message: `Email has been sent to ${email}. Follow the instructions to reset your email. It will expire in 10mins`
          });
        });
      }
    });
  });
};

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(
      err,
      decoded
    ) {
      if (err) {
        return res.status(401).json({
          error: "Expired link. Try again"
        });
      }
      User.findOne({ resetPasswordLink }, (err, user) => {
        if (err || !user) {
          return res.status(401).json({
            error: "Something went wrong. Try later"
          });
        }
        const updatedFields = {
          //return a new password and empty the reset password link
          password: newPassword,
          resetPasswordLink: ""
        };

        user = _.extend(user, updatedFields);

        user.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err)
            });
          }
          res.json({
            message: `Great! Now you can login with your new password`
          });
        });
      });
    });
  }
};
