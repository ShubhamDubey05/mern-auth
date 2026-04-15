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