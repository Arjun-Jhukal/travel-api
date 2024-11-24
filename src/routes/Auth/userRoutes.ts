import { Router } from "express";
import {
	changeUserRole,
	deleteUser,
	getAllUsers,
	getUser,
	updateUser,
} from "../../controllers/userController";
import { registrationHandler } from "../../controllers/authController";

const userRouter = Router();

userRouter.get("/getAllUsers", getAllUsers);
userRouter.post("/registerUser", registrationHandler);
userRouter.get("/getUser", getUser);
userRouter.get("/updateUser", updateUser);
userRouter.get("/deleteUser", deleteUser);
userRouter.get("/changeUserRole", changeUserRole);

export default userRouter;
