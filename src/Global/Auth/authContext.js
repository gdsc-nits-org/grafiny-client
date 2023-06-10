import { createContext } from "react";

const UserContext = createContext({
  name: "",
  email: "",
  college: "",
  degree: "",
  year: "",
  branch: "",
  filesUploaded: [],
});

export default UserContext;
