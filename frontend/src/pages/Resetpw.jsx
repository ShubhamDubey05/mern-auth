import React, { useState, useRef, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import AppContent from "../context/AppContent.js";
import axios from "axios";
import { toast } from "react-toastify";
import { newPassword, reset } from "../services/authApi.js";

const Resetpw = () => {

  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const inputRefs = useRef([]);

  // OTP input auto focus
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").split("");

    paste.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  // ================= SEND OTP =================

  const sendOtp = async (e) => {
    e.preventDefault();

    try {
      const  data  = await reset(email);

      if (data.success) {
        toast.success(data.message);
        setOtpSent(true);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= VERIFY OTP =================

  const onSubmitOtp = (e) => {
    e.preventDefault();

    const enteredOtp = inputRefs.current
      .map((input) => input.value)
      .join("");

    setOtp(enteredOtp);
    setOtpVerified(true);
  };

  // ================= NEW PASSWORD =================

  const newPasswordHandler = async (e) => {

    e.preventDefault();

    try {

      const data = await newPassword(otp, password, email);

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-200">

      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="absolute left-6 sm:left-16 top-6 w-28 sm:w-32 cursor-pointer"
      />

      {/* ================= EMAIL FORM ================= */}

      {!otpSent && (

        <form
          onSubmit={sendOtp}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >

          <h1 className="text-3xl text-white font-bold text-center mb-3">
            Reset Password
          </h1>

          <p className="text-center text-indigo-100 mb-8">
            Enter your registered email to receive OTP
          </p>

          <div className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30">

            <img
              src={assets.mail_icon}
              className="w-5 opacity-80"
              alt="email"
            />

            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent outline-none text-white placeholder-indigo-200 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <button
            type="submit"
            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold cursor-pointer hover:scale-[1.02] transition"
          >
            Send Reset OTP
          </button>

        </form>
      )}

      {/* ================= OTP FORM ================= */}

      {otpSent && !otpVerified && (

        <form
          onSubmit={onSubmitOtp}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >

          <h1 className="text-2xl text-white font-semibold text-center mb-4">
            Enter Reset OTP
          </h1>

          <p className="text-center mb-6 text-indigo-300">
            Enter the 6-digit OTP sent to your email
          </p>

          <div
            className="flex justify-between mb-8"
            onPaste={handlePaste}
          >

            {Array(6).fill(0).map((_, index) => (

              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md outline-none"
              />

            ))}

          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer"
          >
            Verify OTP
          </button>

        </form>
      )}

      {/* ================= NEW PASSWORD FORM ================= */}

      {otpVerified && (

        <form
          onSubmit={newPasswordHandler}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >

          <h1 className="text-3xl text-white font-bold text-center mb-3">
            Create New Password
          </h1>

          <p className="text-center text-indigo-100 mb-8">
            Enter your new password
          </p>

          <div className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30">

            <img
              src={assets.lock_icon}
              className="w-5 opacity-80"
              alt="password"
            />

            <input
              type="password"
              placeholder="New Password"
              className="bg-transparent outline-none text-white placeholder-indigo-200 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button
            type="submit"
            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold cursor-pointer hover:scale-[1.02] transition"
          >
            Reset Password
          </button>

        </form>
      )}

    </div>
  );
};

export default Resetpw;