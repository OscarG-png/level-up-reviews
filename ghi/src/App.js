import React, { useEffect, useState } from "react";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./authentication/SignUp.js";
import LoginForm from "./authentication/login.js";
import MainPage from "./MainPage.js";
import Nav from "./nav.js";
import GenreList from "./genres/genrelist.js";
import GenreGames from "./genres/genregames.js";




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

  const [genre, setGenres] = useState([])
  async function getGenres() {
    const response = await fetch("http://localhost:8000/genre")
    if (response.ok){
      const data = await response.json()
      setGenres(data)
    }
  }
  useEffect(() => {
    getGenres()
  }, [])

  const [genregames, setGenresGames] = useState([])

  async function getGenresGames(genre_id) {
    const response = await fetch(`http://localhost:8000/genres/${genre_id}/games`)
    if (response.ok){
      const data = await response.json()
      setGenresGames(data)
    }
  }
  useEffect(() => {
    const defaultGenreId = 1;
    getGenresGames(defaultGenreId)
  }, [])

  return (
    <BrowserRouter>
      <AuthProvider baseUrl={baseUrl} >
        <Nav genre={genre} genregames={getGenresGames} />
        <Routes>
          <Route index path="/" element={<MainPage games={games} genre={genre} genregames={getGenresGames}  />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/genres/list" element={<GenreList genre={genre} genregames={getGenresGames} />}/>
          <Route path="/genres/:genre_id/games" element={<GenreGames  genre={genre} genregames={genregames} />}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
