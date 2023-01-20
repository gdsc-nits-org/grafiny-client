import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./Components";

import { Home, Topic, SemesterPage } from "./Pages";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topic />} />
        <Route path="/semester" element={<SemesterPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
