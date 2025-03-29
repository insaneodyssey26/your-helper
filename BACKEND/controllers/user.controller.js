import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js';

const registerUser =  asyncHandler(async (req, res) => {      // to handle the async function using try catch block
    // Get user's details from frontnend
    // Validation
    // check if the user already exists
    // Check for images and check for avatar
    // Upload them to cloudinary
    // Create a user obejct - create entry in the database
    // Remove password and refresh token field from the response
    // Check for user creation
    // Return the response


    const {fullName, email,username, password} = req.body // to get the user's details from frontend
    // console.log(fullName, email, username, password); // to print the user's details

    // if (fullName === "") {
    //     throw new ApiError(400, "Full name is required"); // to check if the full name is required
    // }

    if ([fullName, email, username , password].some((field)=> field.trim() === "")) {
        throw new ApiError(400, "All fields are required"); // to check if all fields are required
        
    }

    const existedUser = await User.findOne({
        $or: [{email}, {username}] // to check if the user already exists
    }).then((user) => {
        if (user) {
            throw new ApiError(400, "User already exists"); // to check if the user already exists
        }
    })

    const avatarLocalPath = req.files?.avatar[0]?.path; // to check for images and check for avatar

    // const coverImageLocalpath = req.files?.coverImage[0]?.path; // to check for images and check for 
    let coverImageLocalPath ;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
       const coverImageLocalpath = req.files.coverImage[0].path; // to check for images and check for cover image
    }


    if (!avatarLocalPath) {
            throw new ApiError(400, "Avatar is required"); // to check for avatar
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath); // to upload them to cloudinary
    const coverImage = await uploadOnCloudinary(coverImageLocalpath); // to upload them to cloudinary

    if (!avatar) {
        throw new ApiError(500, "Error uploading avatar"); // to check for avatar
    }

    const user  = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase(),
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken"); // to remove password and refresh token field from the response
    if (!createdUser) {
        throw new ApiError(500, "Error creating user"); // to check for user creation
    }

    return res.status(201).json(new ApiResponse(200 , createdUser, "User registered succesfully")); // to return the response
})

export {registerUser}; // to export the registerUser function