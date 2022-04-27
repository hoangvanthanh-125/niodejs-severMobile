const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const User = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: { type: String, required: true },
    phoneNumber: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", User);
