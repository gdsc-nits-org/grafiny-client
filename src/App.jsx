import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./Components";
import { Home } from "./Pages";
import Departments from "./Components/Departments/Departments";

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
