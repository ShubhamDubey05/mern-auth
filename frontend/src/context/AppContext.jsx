import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { check, users } from "../services/authApi";

const AppContent = createContext();

export const AppContext = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= AUTH CHECK =================
  const getAuthState = async () => {
    try {
      const data = await check();

      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserData(null);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= USER DATA =================
  const getUserData = async () => {
    try {
      const data = await users();

      if (data.success) {
        setUserData(data.userdata);
      } else {
        toast.error(data.message || "Failed to fetch user");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= INIT =================
  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    loading,
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};

export default AppContent;