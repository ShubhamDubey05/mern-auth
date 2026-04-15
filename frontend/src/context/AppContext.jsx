import axios from "axios";
import AppContent from "./AppContent";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { check , users} from "../services/authApi";

export const AppContext = (props) => {

    
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);   

   const getAuthState = async ()=>{
        try {
          const {data} = await check();
          if(data.success){
            setIsLoggedIn(true);
            getUserData();
          }
          
        } catch (error) {
            toast.error(error.message);
        }
   }

  const getUserData = async () => {
    try {

      const { data } = await users() ;

      data.success ? setUserData(data.userdata) : toast.error(data.message);

    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
       getAuthState();
  },[])

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