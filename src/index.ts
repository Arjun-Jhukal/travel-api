import dotenv from "dotenv";
import express, { Response, Request } from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/Auth/authRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3010;

// Successful connection message
app.get("/", (req: Request, res: Response) => {
	res.send("<h1>Successful connection to the server and database!</h1>");
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/api/v1/auth", authRoutes);
