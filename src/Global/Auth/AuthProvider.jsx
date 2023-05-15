import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./authContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ""
  );

  const navigate = useNavigate();

  const handleSignup = async (name, email, password) => {
    const data = { name, email, password };
    if (!email || !password || !name) {
      alert("Fill All The Values");
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(data),
    });

    const parsedResponse = await response.json();
    console.log(parsedResponse);
    if (parsedResponse.errorMessage) {
      alert("Something Went Wrong!!!");
    } else {
      navigate("/login");
    }
  };

  const handleLogin = async (email, password) => {
    const data = { email, password };
    if (!email || !password) {
      alert("Fill All The Values");
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(data),
    });

    const parsedResponse = await response.json();
    console.log(parsedResponse);
    if (parsedResponse.errorMessage) {
      alert("Something Went Wrong!!!");
    } else {
      setUser(parsedResponse.msg);
      localStorage.setItem("user", JSON.stringify(parsedResponse.msg));
      navigate("/");
    }
  };

  const userHandler = useMemo(() => {
    return { user, setUser, handleSignup, handleLogin };
  }, [user]);

  return <UserContext.Provider value={userHandler}>{children}</UserContext.Provider>;
};

export default AuthProvider;
