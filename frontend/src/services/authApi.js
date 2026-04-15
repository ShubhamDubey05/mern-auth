import API from "./api";

// ================= AUTH =================

// REGISTER
export const register = async (email, name, password) => {
  const { data } = await API.post("/api/auth/register", {
    email,
    name,
    password,
  });
  return data;
};

// LOGIN
export const login = async (email, password) => {
  const { data } = await API.post("/api/auth/login", {
    email,
    password,
  });
  return data;
};

// LOGOUT
export const logout = async () => {
  const { data } = await API.post("/api/auth/logout");
  return data;
};

// CHECK AUTH
export const check = async () => {
  const { data } = await API.get("/api/auth/is-authenticated");
  return data;
};

// ================= EMAIL OTP =================

// SEND OTP
export const sendOtp = async () => {
  const { data } = await API.post("/api/auth/verify-otp");
  return data;
};

// VERIFY EMAIL OTP
export const verifyEmail = async (otp) => {
  const { data } = await API.post("/api/auth/verify-email", { otp });
  return data;
};

// ================= RESET PASSWORD =================

// SEND RESET OTP
export const resetOtp = async (email) => {
  const { data } = await API.post("/api/auth/reset-otp", { email });
  return data;
};

// RESET PASSWORD FINAL
export const resetPassword = async (email, otp, newPassword) => {
  const { data } = await API.post("/api/auth/reset-password", {
    email,
    otp,
    newPassword,
  });
  return data;
};

// ================= USER =================

export const getUser = async () => {
  const { data } = await API.get("/api/user/data");
  return data;
};