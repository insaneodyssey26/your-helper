import { Router } from "express";
import { registerCustomer } from "../controllers/Customer.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/Sign-up").post(registerCustomer)




export default router;