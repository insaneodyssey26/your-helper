import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);// to hash the password before saving
  next();
});

userSchema.methods.isPasswordModified = async function (password) {
  return await bcrypt.compare(password, this.password); // returns true or false 
};

userSchema.methods.generateAccessToken = function () { // to generate the access token 
  return jwt.sign( // to sign the token
    {
      _id: this._id, // to get the id
      email: this.email, // to get the email
      username: this.username, // to get the username
    fullName: this.fullName, // to get the full name
    },
    process.env.ACCESS_TOKEN_SECRET, // to get the access token secret
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } // to get the expiry time
  );
};
userSchema.methods.generateRefreshToken = function () { // to generate the refresh token
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);
