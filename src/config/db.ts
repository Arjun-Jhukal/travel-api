import mongoose from "mongoose";

// Define a type for the return value of the function (optional for this case)
export const connectDB = async (): Promise<void> => {
	try {
		await mongoose.connect(process.env.MONGO_URI || "");
		console.log("MongoDB Connected");
	} catch (error) {
		// Ensure error is typed
		if (error instanceof Error) {
			console.error("Database connection failed:", error.message);
		} else {
			console.error("An unknown error occurred during database connection.");
		}
		process.exit(1);
	}
};
