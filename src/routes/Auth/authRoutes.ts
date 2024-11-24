import express from "express";
import {
	forgotPasswordHandler,
	loginHandler,
	registrationHandler,
} from "../../controllers/authController";

const authRoutes = express.Router();

authRoutes.post("/register", registrationHandler);
authRoutes.post("/login", loginHandler);
authRoutes.patch("/change-password", forgotPasswordHandler);

export default authRoutes;
