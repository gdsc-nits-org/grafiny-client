import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./Components";

import { Home, Courses, Error } from "./Pages";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
