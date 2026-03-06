import axios from "axios";
import AppContent from "./AppContent";
import { useState } from "react";
import { toast } from "react-toastify";

export const AppContext = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/user/data');

      data.success ? setUserData(data.userdata) : toast.error(data.message);

    } catch (error) {
      toast.error(error.message);
    }
  }

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};