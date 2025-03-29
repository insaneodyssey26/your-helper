import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import {CustomerSchema} from '../models/customer.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js';

const registerHelper =  asyncHandler(async (req, res) => {      // to handle the async function using try catch block
    // Get user's details from frontnend
    // Validation
    // check if the user already exists
    // Check for images and check for avatar
    // Upload them to cloudinary
    // Create a user obejct - create entry in the database
    // Remove password and refresh token field from the response
    // Check for user creation
    // Return the response


    const { email,fullName, password,age,gender,location,experience,skill} = req.body // to get the user's details from frontend
    // console.log(fullName, email, username, password); // to print the user's details

    // if (fullName === "") {
    //     throw new ApiError(400, "Full name is required"); // to check if the full name is required
    // }

    if ([ email,fullName, password,age,gender,location,experience,skill].some((field)=> field.trim() === "")) {
        throw new ApiError(400, "All fields are required"); // to check if all fields are required
        
    }

    const existedUser = await CustomerSchema.findOne({
        $or: [{email}] // to check if the user already exists
    }).then((helper) => {
        if (helper) {
            throw new ApiError(400, "User already exists"); // to check if the user already exists
        }
    })

    // const avatarLocalPath = req.files?.avatar[0]?.path; // to check for images and check for avatar

    // const coverImageLocalpath = req.files?.coverImage[0]?.path; // to check for images and check for 
    // let coverImageLocalPath ;
    // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    //    const coverImageLocalpath = req.files.coverImage[0].path; // to check for images and check for cover image
    // }


    // if (!avatarLocalPath) {
    //         throw new ApiError(400, "Avatar is required"); // to check for avatar
    // }

    // const avatar = await uploadOnCloudinary(avatarLocalPath); // to upload them to cloudinary
    // const coverImage = await uploadOnCloudinary(coverImageLocalpath); // to upload them to cloudinary

    // if (!avatar) {
    //     throw new ApiError(500, "Error uploading avatar"); // to check for avatar
    // }

    const user  = await HelperSchema.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase(),
        password
    })

    const createdHelper = await HelperSchema.findById(user._id).select("-password -refreshToken"); // to remove password and refresh token field from the response
    if (!createdHelper) {
        throw new ApiError(500, "Error creating Customer"); // to check for user creation
    }

    return res.status(201).json(new ApiResponse(200 , createdHelper, "Customer registered succesfully")); // to return the response
})

export {registerHelper}; // to export the registerUser function