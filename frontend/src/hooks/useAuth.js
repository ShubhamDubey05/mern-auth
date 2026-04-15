import { login, register } from "../services/authApi";

export const useAuth = () => {
  const handleRegiter = async (email, name, password) => {
    const res = await register(email, name, password);
    return res;
  };

  const handleLogin = async (email, password) => {
    const res = await login(email, password);
    return res;
  };

  return { handleRegiter, handleLogin };
};