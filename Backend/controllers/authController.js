import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const  regsiter = async(req,res)=>{
 const { name, email, password } = req.body;
 const hashedPassword = await bcrypt.hash(password,10);

 if(!name || !email || !password){
    return res.status(400).json({message:"All fields are required"});
 }

 try{
      const existingUser = await User.findOne({email});
      if(existingUser){
        return res.status(400).json({message:"User already exists"});
      }
      const newUser =  await new User({
        name:name,
        email:email,
        password:hashedPassword,
      }).save();  
      
      const token = jwt.sign(
        {userId:newUser._id},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
      ); 

      res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge:7*24*60*60*1000, // 7 days
      });
    //  return res.status(201).json({message:"User created successfully"});
 
 }
    catch(error){
        return res.status(500).json({message:"Server Error"});
    }

}

