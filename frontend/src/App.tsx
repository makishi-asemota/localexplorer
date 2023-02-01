import React, { useState, createContext, useMemo } from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import FirstPage from "./components/StartPage/FirstPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Context from "./components/User/UserContext";
import "./App.css";

export interface Location {
  location: string;
  isLocation: boolean;
}

function App() {
  const [state, setState] = useState<Location>({
    location: "",
    isLocation: false,
  });

  return (
    <div>
      {state.isLocation ? (
        <BrowserRouter>
          <Context>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Context>
        </BrowserRouter>
      ) : (
        <FirstPage
          location={state.location}
          isLocation={state.isLocation}
          setState={setState}
        />
      )}
    </div>
  );
}

export default App;
