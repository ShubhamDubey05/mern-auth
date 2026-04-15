import API from "./api";

// REGISTER
export const register = async (email, name, password) => {
  const res = await API.post("/api/auth/register", { email, name, password });
  return res.data;
};

// LOGIN
export const login = async (email, password) => {
  const res = await API.post("/api/auth/login", { email, password });
  return res.data;
};

// LOGOUT
export const logout = async () => {
  const res = await API.post("/api/auth/logout");
  return res.data;
};

// SEND OTP
export const sendOtp = async () => {
  const res = await API.post("/api/auth/send-otp");
  return res.data;
};

// VERIFY EMAIL
export const verifyEmail = async (otp) => {
  const res = await API.post("/api/auth/verify-account", { otp });
  return res.data;
};

// CHECK AUTH
export const check = async () => {
  const res = await API.get("/api/auth/authenticate");
  return res.data;
};

// RESET PASSWORD OTP
export const reset = async (email) => {
  const res = await API.post("/api/auth/reset", { email });
  return res.data;
};

// NEW PASSWORD
export const newPassword = async (otp, newPassword, email) => {
  const res = await API.post("/api/auth/newpassword", {
    email,
    otp,
    newPassword,
  });
  return res.data;
};

// USER DATA
export const users = async () => {
  const res = await API.get("/api/user/data");
  return res.data;
};