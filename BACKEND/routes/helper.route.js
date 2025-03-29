import { Router } from "express";
import { registerHelper } from "../controllers/Customer.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; // Import multer middleware

const Customer = Router();

// Define multer middleware for handling CV and certification uploads
Customer.route("/Sign-up").post(
  upload.fields([
    { name: "cv", maxCount: 1 }, // Field for CV upload
    { name: "certification", maxCount: 1 }, // Field for certification upload
  ]),
  registerHelper
);

export default Customer;