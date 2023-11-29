"use client";
import React from "react";
import { Carousel } from "flowbite-react";

function RecentGames({ games }) {
  let currentDate = new Date();
  let filteredGames = games.filter((game) => {
    let releaseDate = new Date(game.release_date);
    let timeDifference = currentDate - releaseDate;
    let daysDifference = Math.abs(
      Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    );
    return daysDifference <= 30;
  });
  return (
    <>
      <h2 className="p-5 text-center">Recent games</h2>
      <div className="h-56 sm:h-80 xl:h-80 2xl:h-96">
        <Carousel slideInterval={4000}>
          {filteredGames.map((game) => {
            return (
              <img
                key={game.id}
                src="https://i.redd.it/lyyzakx0o59b1.png"
                alt={game.title}
              />
            );
          })}
        </Carousel>
      </div>
    </>
  );
}
export default RecentGames;
