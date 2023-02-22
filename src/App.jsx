import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./Components";

import { Home, SignupForm } from "./Pages";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<SignupForm />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
