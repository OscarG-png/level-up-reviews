import React, { useEffect, useState } from "react";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./authentication/SignUp.js";
import LoginForm from "./authentication/login.js";
import MainPage from "./MainPage.js";
import UserProfile from "./users/UserProfile.js";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Nav from "./nav.js";
import GenreList from "./genres/genrelist.js";
import CreateReview from "./reviews/CreateReviews.js";
import GenreGames from "./genres/genregames.js";
import GameDetails from "./games/GameDetails.js";
import RecentPage from "./games/RecentPage.js";
import AllGames from "./games/Allgames.js";

function App() {
  const baseUrl = `${process.env.REACT_APP_API_HOST}`;
  const { fetchWithCookie } = useToken();
  const [games, setGames] = useState([]);
  const [userData, setUserData] = useState({
    user: {
      email: "",
      id: 0,
      profile_picture: "",
      username: "",
    },
  });

  async function getGames() {
    const gamesUrl = "http://localhost:8000/games";
    const response = await fetch(gamesUrl);
    if (response.ok) {
      const data = await response.json();
      setGames(data.games);
    }
  }
  async function fetchData() {
    try {
      const data = await fetchWithCookie("http://localhost:8000/token");
      setUserData(data);
    } catch (error) {
      console.error("Error fetching the user data:", error);
    }
  }
  useEffect(() => {
    getGames();
    fetchData();
  }, []);

  const [genre, setGenres] = useState([]);
  async function getGenres() {
    const response = await fetch("http://localhost:8000/genre");
    if (response.ok) {
      const data = await response.json();
      setGenres(data.genres);
    }
  }
  useEffect(() => {
    getGenres();
  }, []);

  const [reviews, setReviews] = useState([]);

  async function getReviews() {
      const reviewUrl = "http://localhost:8000/reviews/";

      const response = await fetch(reviewUrl);

      if (response.ok) {
          const data = await response.json();
          setReviews(data);
    }
  }

  useEffect(() => {
    getReviews();
  }, []);


  const [genregames, setGenresGames] = useState([]);

  async function getGenresGames(genre_id) {
    const response = await fetch(
      `http://localhost:8000/genres/${genre_id}/games`
    );
    if (response.ok) {
      const data = await response.json();
      setGenresGames(data);
    }
  }
  useEffect(() => {
    const defaultGenreId = 1;
    getGenresGames(defaultGenreId);
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider baseUrl={baseUrl}>
        <Nav genre={genre} genregames={getGenresGames} />
        <Routes>
          <Route
            index
            path="/"
            element={
              <MainPage
                games={games}
                genre={genre}
                genregames={getGenresGames}
              />
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/games/:game_id" element={<GameDetails userData={userData}/>} />
          <Route path="/games/:game_id/reviews" element={<CreateReview reviews={reviews} userData={userData}/>}/>
          <Route
            path="/profile"
            element={<UserProfile userData={userData} />}
          />
          <Route path="/games/all" element={<AllGames games={games} />} />
          <Route path="/games/recent" element={<RecentPage games={games} />} />
          <Route
            path="/genres/list"
            element={<GenreList genre={genre} genregames={getGenresGames} />}
          />
          <Route
            path="/genres/:genre_id/games"
            element={<GenreGames genre={genre} genregames={genregames} />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
