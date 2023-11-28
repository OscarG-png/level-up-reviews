"use client";
import React from "react";
import { Carousel } from "flowbite-react";

function TopRatedGames({ games }) {
  return (
    <>
      <h2 className="p-5 text-center">Top rated games</h2>
      <div className="h-56 sm:h-80 xl:h-80 2xl:h-96">
        <Carousel slideInterval={4000}>
          {games.map((game) => {
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
export default TopRatedGames;
