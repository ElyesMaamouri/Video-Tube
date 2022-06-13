const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const userSchema = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 44,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  // password: {
  //   type: String,
  //   required: true,
  //   minlength: 8,
  //   maxlength: 255,
  // },
  image: {
    type: String,
  },
  updatedAt: {
    type: Date,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  keyActivation: {
    type: String,
  },
  isActive: { type: Boolean, default: false },
  roles: {
    type: [
      {
        type: String,
        enum: ["user", "admin"],
      },
    ],
    default: ["user"],
  },
  directoryPath: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
