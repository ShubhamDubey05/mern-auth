import axios from "axios";
import AppContent from "./AppContent";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = (props) => {

    axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);   

   const getAuthState = async ()=>{
        try {
          const {data} = await axios.get(backendUrl+'/api/auth/authenticate');
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

      const { data } = await axios.get(backendUrl + '/api/user/data');

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