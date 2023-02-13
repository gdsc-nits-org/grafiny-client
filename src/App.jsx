import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./Components";
import { Home, Departments } from "./Pages";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/departments" element={<Departments />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
