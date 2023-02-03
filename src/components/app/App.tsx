import { Route, Routes } from "react-router-dom";
import LogIn from "@/pages/login/LogIn";
import Header from "../header/Header";
import Home from "../../pages/home/Home";
import Footer from "../footer/Footer";
import Background from "../background/Background";

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
      <Footer />
      <Background />
    </div>
  );
};

export default App;
