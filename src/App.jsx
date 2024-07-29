import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { Footer, Navbar } from "./Components";
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
  OurTeamPage,
  UploadingPage,
  Material,
  CreateProfile,
} from "./Pages";

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer className="toaststyle" />
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
        <Route path="/team" element={<OurTeamPage />} />
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
