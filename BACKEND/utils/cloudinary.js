import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'; // File system to do operation on files

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.API_SECRET2 // Click 'View API Keys' above to copy your API secret
    });
    
const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if (!localFilePath) return null; // If no file is uploaded
        // Upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{ //this function uploads the file to cloudinary
            resource_type: "auto",
        }); // the file has been uploaded to cloudinary
        fs.unlinkSync(localFilePath); // Delete the file from local storage
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // Delete the file from local storage
        return null;
    }
}

export {uploadOnCloudinary}; // to export the uploadOnCloudinary function