import React, { useEffect, useState } from "react";
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
import TopRatedList from "./games/TopRatedList.js";
import PlatformList from "./platforms/platformlist.js";
import PlatformGames from "./platforms/platformgames.js";

function App() {
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
  const fetchData = async () => {
    try {
      const data = await fetchWithCookie("http://localhost:8000/token");
      setUserData(data);
    } catch (error) {
      console.error("Error fetching the user data:", error);
    }
  };

  const [genre, setGenres] = useState([]);
  async function getGenres() {
    const response = await fetch("http://localhost:8000/genre");
    if (response.ok) {
      const data = await response.json();
      setGenres(data.genres);
    }
  }

  const [platforms, setPlatforms] = useState([]);
  async function getPlatforms() {
    const response = await fetch("http://localhost:8000/platforms");
    if (response.ok) {
      const data = await response.json();
      setPlatforms(data.platforms);
    }
  }

  const [reviews, setReviews] = useState([]);
  async function getReviews() {
    const reviewUrl = "http://localhost:8000/reviews/";

    const response = await fetch(reviewUrl);

    if (response.ok) {
      const data = await response.json();
      setReviews(data.reviews);
    }
  }

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
  const [platformgames, setPlatformsGames] = useState([]);
  async function getPlatformGames(platform_id) {
    const response = await fetch(
      `http://localhost:8000/platforms/${platform_id}/games`
    );
    if (response.ok) {
      const data = await response.json();
      setPlatformsGames(data.games_platforms);
    }
  }
  useEffect(() => {
    const defaultPlatformId = 1;
    getGenresGames();
    getPlatformGames(defaultPlatformId);
    getReviews();
    getGenres();
    getGames();
    getPlatforms();
    fetchData();
  }, []);


  return (
    <BrowserRouter>
      <Nav
        genre={genre}
        genregames={getGenresGames}
        platforms={platforms}
        platformgames={getPlatformGames}
      />
      <Routes>
        <Route
          index
          path="/"
          element={
            <MainPage games={games} genre={genre} genregames={getGenresGames} />
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/games/:game_id"
          element={<GameDetails userData={userData} />}
        />
        <Route
          path="/games/:game_id/reviews"
          element={<CreateReview reviews={reviews} userData={userData} />}
        />
        <Route
          path="/profile"
          element={
            <UserProfile userData={userData} setUserData={setUserData} />
          }
        />
        <Route path="/games/all" element={<AllGames games={games} />} />
        <Route path="/games/recent" element={<RecentPage games={games} />} />
        <Route
          path="/games/toprated"
          element={<TopRatedList games={games} reviews={reviews} />}
        />
        <Route
          path="/genres/list"
          element={<GenreList genre={genre} genregames={getGenresGames} />}
        />
        <Route
          path="/genres/:genre_id/games"
          element={<GenreGames genre={genre} genregames={genregames} />}
        />
        <Route
          path="/platforms/list"
          element={<PlatformList platforms={platforms} />}
        />
        <Route
          path="/platforms/:platform_id/games"
          element={
            <PlatformGames
              platforms={platforms}
              platformgames={platformgames}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
