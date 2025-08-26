const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gid: {
      type: String,
    },
    password: {
      type: String,
      // required: true,
    },
    level: {
      type: Number,
      default: 1
    },
    points: {
      type: Number,
      default: 0
    },
    budget: {
      type: Number,
      default: 0
    },
    pushToken: {
      type: String
    },
    isPremium: {
      type: Boolean,
      default: false
    },
    fcmToken: {

    },
    apnToken: {

    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Pre-save hook for password hashing
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hashedPassword;
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


module.exports = mongoose.model("User", userSchema);
