import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { Footer, Navbar, ScrollToTop } from "./Components";
import "react-toastify/dist/ReactToastify.css";
import {
  Topic,
  SemesterPage,
  Home,
  Courses,
  Error,
  SearchResults,
  Departments,
  Profile,
  AboutUs,
  UploadingPage,
  Material,
  CreateProfile,
} from "./Pages";

const App = () => {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/topics" element={<Topic />} />
        <Route path="/semesters" element={<SemesterPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/upload" element={<UploadingPage />} />
        <Route path="/material" element={<Material />} />
        <Route path="/profilecreate" element={<CreateProfile />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
