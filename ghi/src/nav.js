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
            <Link to='/'>
            <Sidebar.Item icon={LogoIcon}/>
            </Link>
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
                  <ul key='search_results'>
                    {filteredGames.slice(0, 5).map((game) => (
                      <li key={game.id + game.title}>
                        <Link to={`/games/${game.id}`}>{game.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Sidebar.Item>
            <Sidebar.Item icon={GiAbstract050}>
             <Link to="/games/all">All Games</Link>
            </Sidebar.Item>
            <Sidebar.Item icon={FaFire}>
              <Link to="/games/recent">New Releases</Link>
              </Sidebar.Item>
            <Sidebar.Item icon={HiChevronDoubleUp}>
              <Link to="/games/toprated">Top Rated</Link>
            </Sidebar.Item>
            <Sidebar.Collapse icon={BiSolidJoystick} label="Platforms">
              {platforms.map((p) => (
                  <Sidebar.Item key={p.id + p.name}>
                    <Link to={`/platforms/${p.id}/games`}>{p.name}</Link>
                  </Sidebar.Item>
              ))}
              <Sidebar.Item>
                <Link to="/platforms/list">All Platforms</Link>
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse icon={MdOutlineGridView} label="Genres">
              {genre.map((g) => {
                return (
                  <Sidebar.Item
                    key={g.genre_id + g.title}
                    onClick={() => handleGenreClick(g.id)}
                  >
                    {g.title}
                  </Sidebar.Item>
                );
              })}
              <Sidebar.Item>
                <Link to="/genres/list">All Genres</Link>
              </Sidebar.Item>
            </Sidebar.Collapse>
            {token ? (
              <>
                <Sidebar.Item icon={ImProfile}>
                 <Link to="/profile">My Profile</Link>
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
                <Sidebar.Item icon={HiArrowSmRight}>
                  <Link to="/login">Log In</Link>
                </Sidebar.Item>
                <Sidebar.Item icon={HiTable}>
                  <Link to="/signup">Sign Up</Link>
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
