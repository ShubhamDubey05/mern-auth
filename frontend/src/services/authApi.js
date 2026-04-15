import axios from "axios";

export const register = async (email, name, password) => {
  const response = await axios.post(
    "http://localhost:4000/api/auth/register",
    { email, name, password },
    { withCredentials: true }
  );
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(
    "http://localhost:4000/api/auth/login",
    { email, password },
    { withCredentials: true }
  );
  return response.data;
};

export  const logout = async ()=>{
  const response  = await axios.post("http://localhost:4000/api/auth/logout", {}, {withCredentials:true});

  return response.data;
}


export const sendOtp = async ()=>{
  const response  = await axios.post("http://localhost:4000/api/auth/send-otp", {}, {withCredentials:true})
   return response.data;
}

export const verifyEmail = async(otp)=>{
  const response = await axios.post("http://localhost:4000/api/auth/verify-account", {otp}, {withCredentials:true});
  return response.data;
}

export const check  = async ()=>{
  const response = await axios.post("http://localhost:4000/api/auth/authenticate", {}, {withCredentials:true})
return response.data;
}

export const reset  = async (email)=>{
  const response  = await axios.post ("http://localhost:4000/api/auth/reset", {email},{withCredentials:true} )
    return response.data;
}


export const newPassword  = async (otp, newPassword, email)=>{
  const response  = await axios.post ("http://localhost:4000/api/auth/newpassword", {email, otp, newPassword},{withCredentials:true} )
    return response.data;
}

