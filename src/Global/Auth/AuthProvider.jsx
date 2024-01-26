import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "./authContext";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ""
  );
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
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
      console.log(userData);
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("user", JSON.stringify(userData));
      setToken(token);
      setUser(userData);
      navigate("/");
      return toast.success("Successfully Logged In", { autoClose: 1200 });
    }
    localStorage.clear();
    setUser("");
    setToken("");
    return toast.error("Something Went Wrong...", { autoClose: 1200 });
  };

  const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    handleGoogleAdmin(result.user.accessToken);
  };

  const getAllInstitutes = async () => {
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
  };
  const userHandler = useMemo(() => {
    return { user, setUser, handleGoogleLogin, token, getAllInstitutes };
  }, [user, token]);

  return <UserContext.Provider value={userHandler}>{children}</UserContext.Provider>;
};

export default AuthProvider;
