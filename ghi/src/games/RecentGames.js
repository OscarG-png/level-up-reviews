"use client";
import React from "react";
import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";

function RecentGames({ games }) {
  let currentDate = new Date();
  let filteredGames = games.filter((game) => {
    let releaseDate = new Date(game.release_date);
    let timeDifference = currentDate - releaseDate;
    let daysDifference = Math.abs(
      Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    );
    return daysDifference <= 60;
  });
  return (
    <>
      <h2 className="p-5 text-center text-outline text-customPurple" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>New Releases</h2>
      <div className="h-56 sm:h-80 xl:h-80 2xl:h-96">
        <Carousel slideInterval={4000}>
          {filteredGames.map((game) => (
            <Link to={`/games/${game.id}`} key={game.id}>
              <div className="relative">
                <img src={game.game_picture} alt={game.title} className="w-full h-full object-cover" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                  <h3 style={{ fontSize: '4rem', fontWeight: 'bold' }} className="text-outline">{game.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default RecentGames;
