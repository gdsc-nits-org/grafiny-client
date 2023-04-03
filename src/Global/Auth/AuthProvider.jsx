import { useState, useMemo } from "react";
import UserContext from "./authContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ""
  );

  const userHandler = useMemo(() => {
    return { user, setUser };
  }, [user]);

  return <UserContext.Provider value={userHandler}>{children}</UserContext.Provider>;
};

export default AuthProvider;
