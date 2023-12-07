"use client";
import { NavLink } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiArrowSmLeft,
  HiChevronDoubleUp,
  HiChartBar,
  HiTable,
} from "react-icons/hi";
import { GiAbstract050 } from "react-icons/gi";
import { MdOutlineGridView } from "react-icons/md";
import { BiSolidJoystick } from "react-icons/bi";
import { FaFire } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import React, { useEffect, useState } from "react";

function Nav({genre, genregames, platforms, platformgames}) {
    const [darkMode, setDarkMode] = useState(false);
    const { token , logout , isLoading } = useToken();


    useEffect(() => {
      if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        setDarkMode('dark');
      }
      else {
        setDarkMode('light')
      }
    },[])


    useEffect(() =>{
      if (darkMode){
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }, [darkMode])

    const switchDarkMode = () => {
      setDarkMode((prevMode) => !prevMode);
    };

    const navigate = useNavigate();

    const handleLogout = async (e) =>{
        await logout();
        navigate("/")
    }

    const handleGenreClick = (genre_id) => {
      genregames(genre_id)
      console.log("Clicked Genre ID:", genre_id);
      navigate(`/genres/${genre_id}/games`);
      };


    const handlePlatformClick = (platform_id) => {
      platformgames(platform_id);
      console.log("Clicked Platform ID:", platform_id);
      navigate(`/platforms/${platform_id}/games`);
      };

    if (isLoading) {
      return null;
    }

    return (
    <div className="sidebar"  >
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item  href="/" icon={HiChartBar }>
           Level Up Reviews
          </Sidebar.Item>
          <Sidebar.Item href="/games/all" icon={GiAbstract050}>
              All Games
            </Sidebar.Item>
          <Sidebar.Item  icon={FaFire }>
            New Releases
          </Sidebar.Item>
          <Sidebar.Item href="/games/toprated"  icon={HiChevronDoubleUp }>
            Top Rated
          </Sidebar.Item>
          <Sidebar.Collapse icon={BiSolidJoystick} label="Platforms">
            {platforms.slice(0,4).map(p =>{
              return(
            <Sidebar.Item
                key={p.platform_id}
                onClick={() => handlePlatformClick(p.id)}>
                  {p.name}
              </Sidebar.Item>
            )
            })}
            <Sidebar.Item href="/platforms/list">All Platforms</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={MdOutlineGridView} label="Genres">
            {genre.slice(0,5).map(g =>{
              return(
            <Sidebar.Item
                key={g.genre_id}
                onClick={() => handleGenreClick(g.id)}>
                  {g.title}
              </Sidebar.Item>
            )
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
            <Sidebar.Item
              onClick={switchDarkMode}
              className={`toggle-button ${
                darkMode ? "on" : "off"
              } darkbutton fixed-button-container`}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
export default Nav;
