import express from "express";
import { adminLogin, login, register } from "../controllers/UserController.js";
// routes.login

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.post("/admin/login", adminLogin);

export default userRouter;

// routes.user
