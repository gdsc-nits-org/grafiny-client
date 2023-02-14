import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./Components";

import { Home, Courses } from "./Pages";

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
