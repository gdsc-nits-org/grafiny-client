import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./Components";

import { Home, SearchResults } from "./Pages";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchresults" element={<SearchResults />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
