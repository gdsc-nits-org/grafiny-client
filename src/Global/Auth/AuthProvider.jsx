import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "./authContext";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ""
  );

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleGoogleAdmin = async (accessToken) => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { data } = response;
    if (data.status === 200) {
      const userData = {
        name: data.msg.msg.name,
        email: data.msg.msg.email,
        profilePic: data.msg.msg.profilePic,
        authorisationLevel: data.msg.msg.authorisationLeveL,
        profile: data.msg.msg.profile,
      };
      window.localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      navigate("/");
      toast.success("Successfully Logged In", { autoClose: 1200 });
    } else {
      localStorage.clear();
      setUser("");
      toast.error("Something Went Wrong...", { autoClose: 1200 });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(() => true);
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      await handleGoogleAdmin(result.user.accessToken);
      setLoading(() => false);
    } catch (err) {
      setLoading(() => false);
      toast.error("Something Went Wrong...", { autoClose: 1200 });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      setUser("");
      navigate("/");
      return toast.success("Successfully Logged Out", { autoClose: 1200 });
    } catch (err) {
      return toast.error("Something Went Wrong...", { autoClose: 1200 });
    }
  };

  const getAllInstitutes = async () => {
    try {
      const token = auth.currentUser.getIdToken(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/institute/getAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.msg.institutes;
      return data;
    } catch (err) {
      return toast.error("Something Went Wrong...", { autoClose: 1200 });
    }
  };
  const userHandler = useMemo(() => {
    return {
      user,
      setUser,
      handleGoogleLogin,
      auth,
      getAllInstitutes,
      logout,
      loading,
      setLoading,
    };
  }, [user, auth, loading]);

  return <UserContext.Provider value={userHandler}>{children}</UserContext.Provider>;
};

export default AuthProvider;
