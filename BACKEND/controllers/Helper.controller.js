import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { CustomerSchema } from '../models/customer.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerHelper = asyncHandler(async (req, res) => {
    // Get user's details from frontend
    const { email, fullName, password, age, gender, location, experience, skill } = req.body;

    // Validate required fields
    if ([email, fullName, password, age, gender, location, experience, skill].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if the user already exists
    const existedUser = await CustomerSchema.findOne({
        $or: [{ email }]
    }).then((helper) => {
        if (helper) {
            throw new ApiError(400, "User already exists");
        }
    });

    // Handle file uploads (CV and certification)
    let cvUrl = "";
    let certificationUrl = "";

    if (req.files?.cv && req.files.cv[0]?.path) {
        const cvUpload = await uploadOnCloudinary(req.files.cv[0].path); // Upload CV to Cloudinary
        cvUrl = cvUpload.url;
    }

    if (req.files?.certification && req.files.certification[0]?.path) {
        const certificationUpload = await uploadOnCloudinary(req.files.certification[0].path); // Upload certification to Cloudinary
        certificationUrl = certificationUpload.url;
    }

    // Create a user object in the database
    const user = await HelperSchema.create({
        fullName,
        email,
        password,
        age,
        gender,
        location,
        experience,
        skill,
        cv: cvUrl, // Save CV URL
        certification: certificationUrl // Save certification URL
    });

    // Fetch the created user and exclude sensitive fields
    const createdHelper = await HelperSchema.findById(user._id).select("-password -refreshToken");
    if (!createdHelper) {
        throw new ApiError(500, "Error creating Customer");
    }

    // Return the response
    return res.status(201).json(new ApiResponse(200, createdHelper, "Customer registered successfully"));
});

export { registerHelper };