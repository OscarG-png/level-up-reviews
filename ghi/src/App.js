import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./authentication/SignUp.js";
import LoginForm from "./authentication/login.js";
import MainPage from "./MainPage.js";
import UserProfile from "./users/UserProfile.js";
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
import useToken from "@galvanize-inc/jwtdown-for-react";

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
    try {
      const gamesUrl = `${process.env.REACT_APP_API_HOST}/games`;
      const response = await fetch(gamesUrl);
      if (!response.ok) {
          throw new Error("Failed to get games");
      }
      const data = await response.json();
      setGames(data.games);
    } catch (error) {
    console.error("Error getting the games:", error);
    }
  }
  const fetchData = async (e) => {
    try {
      const data = await fetchWithCookie(
        `${process.env.REACT_APP_API_HOST}/token`
      );
      setUserData(data);
    } catch (error) {
      console.error("Error fetching the user data:", error);
    }
  };

  const [genre, setGenres] = useState([]);
  async function getGenres() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/genre`);
      if (!response.ok) {
        throw new Error("Failed to get genres");
      }
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
    console.error("Unable to get the platforms", error);
    }
  }

  const [platforms, setPlatforms] = useState([]);
  async function getPlatforms() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/platforms`);
      if (!response.ok) {
        throw new Error("Failed to fetch platforms");
      }
      const data = await response.json();
      setPlatforms(data.platforms);
    } catch (error) {
      console.error("Unable to fetch the platforms", error);
    }
  }

  const [reviews, setReviews] = useState([]);
  async function getReviews() {
    try {
    const reviewUrl = `${process.env.REACT_APP_API_HOST}/reviews`;
    const response = await fetch(reviewUrl);
    if (!response.ok) {
      throw new Error("Failed to get reviews");
      }
      const data = await response.json();
      setReviews(data.reviews);
    } catch (error) {
      console.error("Unable to get the reviews", error);
    }
  }

  const [platformgames, setPlatformsGames] = useState([]);
  async function getPlatformGames(platform_id) {
    try {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/platforms/${platform_id}/games`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch platform games");
      }
      const data = await response.json();
      setPlatformsGames(data.games_platforms);
    } catch (error) {
    console.error("Unable to fetch the platform games", error);
    }
  }
  useEffect(() => {
    const defaultPlatformId = 1;
    getPlatformGames(defaultPlatformId);
    getReviews();
    getGenres();
    getGames();
    getPlatforms();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  return (
    <BrowserRouter basename={basename}>
      <Nav
        genre={genre}
        platforms={platforms}
        platformgames={getPlatformGames}
      />
      <Routes>
        <Route
          index
          path="/"
          element={<MainPage games={games} genre={genre} />}
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
        <Route path="/genres/list" element={<GenreList genre={genre} />} />
        <Route path="/genres/:genre_id/games" element={<GenreGames />} />
        <Route path="/genres/list" element={<GenreList genre={genre} />} />
        <Route path="/genres/:genre_id/games" element={<GenreGames />} />
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
