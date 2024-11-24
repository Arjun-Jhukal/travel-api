import { Document } from "mongoose";
import { ROLES } from "./user";

export interface IUser extends Document {
	userId?: string;
	name?: string;
	userRole: ROLES;
	email: string;
	password: string;
	resetPasswordToken?: string;
	resetPasswordExpires?: Date;
	otp?: string;
	otpExpires?: Date;
	isVerified?: boolean;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface LoginProps {
	email: string;
	password: string;
	rememberMe?: string;
}

export interface RegisterProps extends LoginProps {
	name: string;
}
