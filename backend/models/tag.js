// import mongoose from "mongoose";

const mongoose = require('mongoose')



const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 60
    },
    slug: {
      type: String,
      index: true,
      unique: true
    }
  },
  { timestamps: true }
);




module.exports = mongoose.model("Tag", tagSchema);
