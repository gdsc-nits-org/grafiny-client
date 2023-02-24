import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./Components";
import { Home, SearchResults, Departments } from "./Pages";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="/departments" element={<Departments />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
