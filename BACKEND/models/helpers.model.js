import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const HelperSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    }, 
    age:{
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    location:{
      type: String,
      required: true
    },
    experience: {
      type: number,
      required: true,
    },
    certification:{
        type: File,
    },
    cv:{
        type: File,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    skill:{
        type: String,
        required: true,
    },
    refreshToken: {
      type: String,
    },
    // avatar: {
    //   type: String, // cloudinary url
    //   required: true,
    // },
    
    // coverImage: {
    //   type: String,
    //   required: true,
    // },
    
    
  },
  {
    timestamps: true,
  }
);

HelperSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);// to hash the password before saving
  next();
});

HelperSchema.methods.isPasswordModified = async function (password) {
  return await bcrypt.compare(password, this.password); // returns true or false 
};

HelperSchema.methods.generateAccessToken = function () { // to generate the access token 
  return jwt.sign( // to sign the token
    {
      _id: this._id, // to get the id
      email: this.email, // to get the email
    fullName: this.fullName, // to get the full name
    },
    process.env.ACCESS_TOKEN_SECRET, // to get the access token secret
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } // to get the expiry time
  );
};
HelperSchema.methods.generateRefreshToken = function () { // to generate the refresh token
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const Helper = mongoose.model("Helper", HelperSchema);
