import express from "express";
import { register, login, logout, verifyOtp, verifyEmail, isAuthenticated, resetOtp, resetPassword } from "../controllers/authController.js";
import userAuth from "../middlewares/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-otp", userAuth, verifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.get("/authenticate", userAuth, isAuthenticated);
authRouter.post("/reset", resetOtp);
authRouter.post("/newpassword", resetPassword);

export default authRouter;
