import React from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Login = () => {
   
  const navigate = useNavigate();

  const [state, setState] = useState("Sign up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-purple-400">
      <img
         onClick={()=>navigate('/')}
        src={assets.logo}
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign up" ? "Create  Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign up"
            ? "Create your Account"
            : "Login to your account!"}
        </p>

        <form>
          {state === "Sign up" && (
            <div className="mb-4  flex items-center w-full gap-3 px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="user icon" />
              <input
                onChange={(e)=>{
                  setName(e.target.value);
                }}
                value={name}
                className="bg-transparent outline-none  "
                type="text"
                placeholder="Full name"
                required
              />
            </div>
          )}
          <div className="mb-4  flex items-center w-full gap-3 px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="email" />
            <input
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              value={email}
              className="bg-transparent outline-none  "
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4  flex items-center w-full gap-3 px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="lock" />
            <input
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              value={password}
              className="bg-transparent outline-none  "
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <p 
           onClick={()=>{
            navigate('/resetpw')
           }}
          className="text-indigo-500 mb-4 cursor-pointer">
            Forget password?
          </p>

          <button className="w-full rounded-full py-2.5 bg-linear-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer">
            {state}
          </button>
        </form>
        {state === "Sign up" ? (
          <p className="text-center mt-4 text-xs text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-center mt-4 text-xs text-gray-400">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign up")}
              className="text-blue-400 underline cursor-pointer"
            >
              Sign up{" "}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
