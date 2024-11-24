import { Request, Response } from "express";
import UserModel from "../models/authModel";

export const getAllUsers = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		res.status(500).json({ message: "Server didn't respond" });
	}
};
export const getUser = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		res.status(500).json({ message: "Server didn't respond" });
	}
};
export const updateUser = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		res.status(500).json({ message: "Server didn't respond" });
	}
};
export const deleteUser = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		res.status(500).json({ message: "Server didn't respond" });
	}
};
export const changeUserRole = async (
	req: Request,
	res: Response,
): Promise<Response | any> => {
	try {
		const { userId } = req.params;
		const { newRole } = req.body;

		if (!userId) {
			// Add 'return' explicitly
			return res.status(400).json({ message: "User ID is required" });
		}

		if (!newRole) {
			// Add 'return' explicitly
			return res.status(400).json({ message: "New role is required" });
		}

		// Find the user
		const user = await UserModel.findOne({ userId });
		if (!user) {
			// Add 'return' explicitly
			return res.status(404).json({ message: "User not found" });
		}

		// Update and save user role
		user.userRole = newRole;
		await user.save();

		// Respond with success
		return res.status(200).json({
			message: "User role updated successfully",
			user: { userId: user.userId, name: user.name, role: user.userRole },
		});
	} catch (error: any) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};
