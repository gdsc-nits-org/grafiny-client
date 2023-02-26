import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./Components";

import { Home, Login } from "./Pages";

const App = () => {
  return (
    <>
      <Login />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
