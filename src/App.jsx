import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./Components";
import { Home, Courses, Error, SearchResults, Departments } from "./Pages";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/departments/:department/courses" element={<Courses />} />
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="/:insti/departments" element={<Departments />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
