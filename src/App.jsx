import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./Components";

import { Home, Topic, SemesterPage, SearchResults } from "./Pages";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/topics" element={<Topic />} />
        <Route path="/semester" element={<SemesterPage />} />
        <Route path="/searchresults" element={<SearchResults />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
