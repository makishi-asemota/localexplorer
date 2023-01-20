import React, { useState } from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import FirstPage from "./components/StartPage/FirstPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  interface Location {
    location: string;
    isLocation: boolean;
  }

  const [state, setState] = useState<Location>({
    location: "",
    isLocation: false,
  });

  return (
    <div>
      {state.isLocation ? (
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <FirstPage state={state} setState={setState} />
      )}
    </div>
  );
}

export default App;
