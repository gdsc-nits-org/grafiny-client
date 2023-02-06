import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./Components";

import Courses from "./Components/Courses/Courses";

import { Home } from "./Pages";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
