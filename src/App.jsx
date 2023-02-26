import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./Components";

import { Home, Login, SignupForm, Otp, Courses, Error, SearchResults } from "./Pages";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
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
