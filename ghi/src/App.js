import React, { useEffect, useState } from "react";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./authentication/SignUp.js";
import LoginForm from "./authentication/login.js";
import MainPage from "./MainPage.js";

function App() {
  const baseUrl = `${process.env.REACT_APP_API_HOST}`

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
      <AuthProvider baseUrl={baseUrl} >
        <Routes>
          <Route index path="/" element={<MainPage games={games} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
