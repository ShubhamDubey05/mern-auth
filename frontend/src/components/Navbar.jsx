import { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import AppContent from "../context/AppContent";
import { toast } from "react-toastify";

import {
  logout as logoutApi,
  sendVerificationOtp as sendOtpApi,
} from "../services/authApi";

const Navbar = () => {
  const navigate = useNavigate();

  const { setIsLoggedIn, userData, setUserData } =
    useContext(AppContent);

  // ================= SEND OTP =================
  const sendVerificationOtp = async () => {
    try {
      const data = await sendOtpApi();

      if (data.success) {
        toast.success(data.message || "OTP sent successfully");
        navigate("/emailverify");
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );
    }
  };

  // ================= LOGOUT =================
  const logout = async () => {
    try {
      const data = await logoutApi();

      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        toast.success("Logged out successfully");
        navigate("/login");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-6 sm:px-24 absolute top-0">

      <img src={assets.logo} alt="logo" className="w-28 sm:w-32" />

      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">

          {userData?.name?.[0]?.toUpperCase()}

          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">

            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">

              {!userData?.isVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                >
                  Verify Email
                </li>
              )}

              <li
                onClick={logout}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
              >
                Logout
              </li>

            </ul>

          </div>

        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 rounded-full border border-gray-500 px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
        >
          Login <img src={assets.arrow_icon} alt="arrow" />
        </button>
      )}

    </div>
  );
};

export default Navbar;