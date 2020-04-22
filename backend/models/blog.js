// import mongoose from "mongoose";
const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      min: 3,
      max: 160
    },
    slug: {
      type: String,
      index: true,
      unique: true
    },
    body: {
      type: {},
      required: true,
      min: 200,
      max: 2000000
    },
    excerpt: {
      type: String,
      // max: 1000
      trim: true,
      max: 200
    },
    //meta title
    mtitle: {
      type: String
    },
    //meta description
    mdesc: {
      type: String
    },

    photo: {
      data: Buffer,
      contentType: String
    },
    views:{
      type: Number
    },

    status:{
      type: String,
      default: "draft"
    },
    categories: [{ type: ObjectId, ref: "Category", required: true }],
    tags: [{ type: ObjectId, ref: "Tag", required: true }],
    likes: [{type: ObjectId, ref:'User'}],
    views:{type:Number, default:0},
    postedBy: {
      type: ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
