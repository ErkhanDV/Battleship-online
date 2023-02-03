import { Route, Routes } from "react-router-dom";

import Header from "../header/Header";
import Main from "../main/Main";
import Footer from "../footer/Footer";
import Background from "../background/Background";

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <Footer />
      <Background />
    </div>
  );
};

export default App;
