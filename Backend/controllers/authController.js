import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name: name,
      email: email,
      password: hashedPassword,
    }).save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const info = {
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: "Welcome to Shubham's website",
      text: ` welcome to shubham's website , Congratulations ! Now your account has been created with email id : ${email}`,
    };

    await transporter.sendMail(info);

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      sucess: true,
      message: "Login successful",
      user: {
        id: existingUser._id,
        name: existingUser.name,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (user.isVerified) {
      return res.json({
        sucess: false,
        message: "Account already verified !",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyotp = otp;
    user.verifyotpExpiryAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const info = {
      from: process.env.EMAIL_SENDER,
      to: user.email,
      subject: "Account verification OTP",
      text: `Dear User,
Your One-Time Password (OTP) is ${otp} ,  Please do not share it with anyone for security reasons.`,
    };

    await transporter.sendMail(info);

    return res.json({
      success: true,
      message: " Verification OTP has been sent to your email sucessfully ",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  const userId = req.userId;
  const { otp } = req.body;

  if (!userId || !otp) {
    return res.json({
      sucess: false,
      message: "Missing Details !",
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        sucess: false,
        message: "user not found",
      });
    }

    const enteredOtp = String(otp).trim();

    if (user.verifyotp === "" || user.verifyotp !== enteredOtp) {
      return res.json({
        sucess: false,
        message: "Invalid Otp",
      });
    }

    if (user.verifyotpExpiryAt < Date.now()) {
      return res.json({
        sucess: false,
        message: "Otp Expired",
      });
    }

    user.isVerified = true;
    user.verifyotp = "";
    user.verifyotpExpiryAt = 0;
    await user.save();

    return res.json({
      sucess: true,
      message: "Email verified sucessfully",
    });
  } catch (error) {
    return res.json({
      sucess: false,
      message: error.message,
    });
  }
};

export const isAuthenticated = (req, res) => {
  try {
    return res.json({
      success: true,
      message: "user is authenticated ",
    });
  } catch (error) {
    return res.json({
      success: false,
      messgae: error.message,
    });
  }
};

export const resetOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({
        success: false,
        message: "Email is required !",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "user does not exits !",
      });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetotp = otp;
    user.resetotpExpiryAt = Date.now() + 5 * 60 * 1000;

    await user.save();

    const info = {
      from: process.env.EMAIL_SENDER,
      to: user.email,
      subject: "Reset verification OTP",
      text: `Dear User,
You requested to reset your password.
Your OTP is ${otp}. It will expire in 5 minutes.
If you did not request this, please ignore this message. `,
    };

    await transporter.sendMail(info);

    return res.json({
      success: true,
      message: " Verification OTP has been sent to your email sucessfully ",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};


export const resetPassword =  async(req, res)=>{
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
      return res.json({
        success:false,
        message:"email , otp and new password is required !"
      })
    }

    try {
      const user  = await User.findOne({email});

      if(!user){
        return res.json({
          success:false,
          message:"user not found !"
        })
      }
     const enteredOtp = String(otp).trim();
      if(user.resetotp === "" || user.resetotp !== enteredOtp){
        return res.json({
          success:false,
          message :"enter correct OTP"
        })
      }

      if(user.resetotpExpiryAt < Date.now()){
        return res.json({
          success:false,
          message:"OTP expired"
        })
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      user.resetotp = '';
      user.resetotpExpiryAt=0

      await user.save();

      return res.json({
        success:true,
        message:"Password has been changed successfully"
      })




      
    } catch (error) {
      return res.json({
        success:false,
        message:error.message
      })
    }

}


