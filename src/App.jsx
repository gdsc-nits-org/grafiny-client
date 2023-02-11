import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./Components";

import { Home, MaterialSection } from "./Pages";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/material" element={<MaterialSection />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
