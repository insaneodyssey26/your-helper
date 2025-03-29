import { Router } from "express";
import { registerCustomer } from "../controllers/Customer.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";

const Customer = Router();

Customer.route("/Sign-up/Customer").post(registerCustomer)

export default Customer;