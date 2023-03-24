import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./Components";

import {
  Topic,
  SemesterPage,
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
  Departments,
  Profile,
  AboutUs
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
        <Route path="/home" element={<Home />} />
        <Route path="/topics" element={<Topic />} />
        <Route path="/semester" element={<SemesterPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/departments/:department/courses" element={<Courses />} />
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="*" element={<Error />} />
        <Route path="/:insti/departments" element={<Departments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
