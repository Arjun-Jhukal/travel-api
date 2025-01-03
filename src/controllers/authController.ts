import { Request, Response } from "express";
import UserModel from "../models/authModel";
import { validateEmail } from "../utils/validateEmail";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { ROLES } from "../interface/user";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const registrationHandler = async (
	req: Request,
	res: Response,
): Promise<Response | any> => {
	const { name, email, password } = req.body;

	try {
		if (!name) {
			return res.status(400).json({ message: "User name is required" });
		}

		if (!email) {
			return res.status(400).json({ message: "Email is required" });
		}

		if (!validateEmail(email)) {
			return res.status(400).json({ message: "Invalid Email format" });
		}

		if (!password) {
			return res.status(400).json({ message: "Password is required" });
		}

		const userExist = await UserModel.findOne({ email });
		if (userExist) {
			return res.status(409).json({ message: "Email already exists" });
		}

		const userId = uuidv4();
		const user = await UserModel.create({
			userId,
			name,
			email,
			password: password,
			userRole: ROLES.CUSTOMER,
		});

		const { password: _, ...userWithoutPassword } = user.toObject();

		res.status(201).json({
			message: "User registered successfully",
			user: userWithoutPassword,
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};
export const loginHandler = async (
	req: Request,
	res: Response,
): Promise<Response | any> => {
	try {
		const { email, password } = req.body;

		const user = await UserModel.findOne({ email });
		if (!user) {
			return res
				.status(401)
				.json({ message: "User with email is not registered" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		console.log({ user, isMatch });
		if (!isMatch) {
			res.status(401).json({ message: "Invalid credentials" });
		}

		// Create JWT token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
			expiresIn: "1h",
		});

		// Send response with token
		res.status(200).json({ message: "Login successful", token });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const forgotPasswordHandler = async (
	req: Request,
	res: Response,
): Promise<Response | any> => {
	const { email } = req.body;

	try {
		const user = await UserModel.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const resetToken = crypto.randomBytes(20).toString("hex");

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

		await user.save();

		res.json({ message: "Password reset token generated", resetToken });

		// Generate reset token
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
