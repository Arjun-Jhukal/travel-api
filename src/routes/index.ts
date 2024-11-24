import express, { Response, Request } from "express";
import authRoutes from "./Auth/authRoutes";

const app = express();

export const RouteHandler = () => {
	app.use("/api/v1/auth", authRoutes);
};
