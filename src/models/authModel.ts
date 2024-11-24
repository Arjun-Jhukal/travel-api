import mongoose, { Schema } from "mongoose";
import { IUser } from "../interface/auth";
import bcrypt from "bcrypt";

const userSchema: Schema<IUser> = new mongoose.Schema({
	userId: { type: String },
	name: { type: String, required: false },
	userRole: { type: String },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	resetPasswordToken: { type: String },
	resetPasswordExpires: { type: Date },
	otp: { type: String },
	otpExpires: { type: Date },
	isVerified: { type: Boolean, default: false },
});

userSchema.pre<IUser>("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
	candidatePassword: string,
): Promise<boolean> {
	return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
