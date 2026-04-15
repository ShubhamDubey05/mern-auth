import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import {
  EMAIL_VERIFY_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
  WELCOME_TEMPLATE,
  PASSWORD_CHANGED_TEMPLATE,
} from "../config/emailTemplates.js";

// ✅ SINGLE COOKIE CONFIG (MOST IMPORTANT FIX)
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// REGISTER
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, cookieOptions);

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: "Welcome 🎉",
        html: WELCOME_TEMPLATE.replace("{{name}}", name).replace("{{email}}", email),
      });
    } catch (err) {
      console.log(err.message);
    }

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, cookieOptions);

    return res.json({
      success: true,
      message: "Login successful",
      user: { id: user._id, name: user.name },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("token", cookieOptions);

  return res.json({
    success: true,
    message: "Logout successful",
  });
};

// AUTH CHECK
export const isAuthenticated = (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    jwt.verify(token, process.env.JWT_SECRET);

    return res.json({ success: true, message: "Authenticated" });
  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};