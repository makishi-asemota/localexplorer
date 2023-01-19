import React, { useState } from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import FirstPage from "./components/StartPage/FirstPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const [location, setLocation] = useState<boolean>(false);

  return (
    <div>
      {location ? (
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <FirstPage />
      )}
    </div>
  );
}

export default App;
