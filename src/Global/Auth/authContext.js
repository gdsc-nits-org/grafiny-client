import { createContext } from "react";

const UserContext = createContext({
  id: "",
  name: "",
  email: "",
  authorisationLevel: "",
  profilePic: "",
  profile: {},
});

export default UserContext;
