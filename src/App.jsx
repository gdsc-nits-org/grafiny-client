import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./Components";

import {
  Home,
  SignupForm,
  Otp,
  Courses,
  Error,
  Login,
  RecoveryCode,
  RecoveryMail,
  ResetPassword,
  SearchResults,
} from "./Pages";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<RecoveryMail />} />
        <Route path="sendotp" element={<RecoveryCode />} />
        <Route path="verified" element={<ResetPassword />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
