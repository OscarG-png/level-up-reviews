import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./authentication/SignUp.js";
import MainPage from "./MainPage.js";

function App() {
  const [games, setGames] = useState([]);

  async function getGames() {
    const gamesUrl = "http://localhost:8000/games";
    const response = await fetch(gamesUrl);
    if (response.ok) {
      const data = await response.json();
      setGames(data);
    }
  }
  useEffect(() => {
    getGames();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<MainPage games={games} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
