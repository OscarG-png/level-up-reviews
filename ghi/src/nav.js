"use client";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiArrowSmLeft,
  HiChevronDoubleUp,
  HiTable,
} from "react-icons/hi";
import { GiAbstract050 } from "react-icons/gi";
import { MdOutlineGridView } from "react-icons/md";
import { BiSolidJoystick } from "react-icons/bi";
import { FaFire } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import React, { useEffect, useState } from "react";
import DarkModeToggle from "./darkmode/DarkModeToggle.js";
import logocolortwo from "./logocolortwo.png"


function Nav({ genre,platforms, games }) {

  const { token, logout, isLoading } = useToken();

  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };


  const navigate = useNavigate();

  const handleLogout = async (e) => {
    await logout();
    navigate("/");
  };

  const handleGenreClick = (genre_id) => {
    navigate(`/genres/${genre_id}/games`);
  };

  const LogoIcon = () => (
    <img src={logocolortwo} alt="Level Up Reviews Logo"/>
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    const filtered = games.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGames(filtered);
  }, [searchTerm, games]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  if (isLoading) {
    return null;
  }

  return (
    <div className="sidebar">
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/" icon={LogoIcon}>
            </Sidebar.Item>
            <Sidebar.Item >
              <input
                type="text"
                placeholder="Search games"
                value={searchTerm}
                onChange={handleSearchChange}
                className="text-black"
              />
              {searchTerm && filteredGames.length > 0 && (
                <div>
                  <p>Search Results:</p>
                  <ul>
                    {filteredGames.slice(0, 5).map((game) => (
                      <li key={game.id}>
                        <Link to={`/games/${game.id}`}>{game.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Sidebar.Item>
            <Sidebar.Item href="/games/all" icon={GiAbstract050}>
              All Games
            </Sidebar.Item>
            <Sidebar.Item href="/games/recent" icon={FaFire}>New Releases</Sidebar.Item>
            <Sidebar.Item href="/games/toprated" icon={HiChevronDoubleUp}>
              Top Rated
            </Sidebar.Item>
            <Sidebar.Collapse icon={BiSolidJoystick} label="Platforms">
              {platforms.map((p) => (
                <Link key={p.id} to={`/platforms/${platforms.platform_id}/games`}>
                  <Sidebar.Item>
                    {p.name}
                  </Sidebar.Item>
                </Link>
              ))}
              <Sidebar.Item href="/platforms/list">All Platforms</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse icon={MdOutlineGridView} label="Genres">
              {genre.map((g) => {
                return (
                  <Sidebar.Item
                    key={g.genre_id}
                    onClick={() => handleGenreClick(g.id)}
                  >
                    {g.title}
                  </Sidebar.Item>
                );
              })}
              <Sidebar.Item href="/genres/list">All Genres</Sidebar.Item>
            </Sidebar.Collapse>
            {token ? (
              <>
                <Sidebar.Item href="/profile" icon={ImProfile}>
                  My Profile
                </Sidebar.Item>
                <Sidebar.Item
                  onClick={() => handleLogout()}
                  icon={HiArrowSmLeft}
                >
                  Log out
                </Sidebar.Item>
              </>
            ) : (
              <>
                <Sidebar.Item href="/login" icon={HiArrowSmRight}>
                  Log In
                </Sidebar.Item>
                <Sidebar.Item href="/signup" icon={HiTable}>
                  Sign Up
                </Sidebar.Item>
              </>
            )}
            <Sidebar.Item>
            <div className="dark-mode-toggle-container">
              <DarkModeToggle onChange={toggleDarkMode} checked={isDarkMode} />
            </div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
export default Nav;
