"use client";
import React from "react";
import { Card, Button } from "flowbite-react";
import { Link } from "react-router-dom";

function PlatformGames({ platformgames }) {
  if (!platformgames) {
    return <div>Loading games...</div>;
  }
  if (platformgames.length === 0) {
    return <div>No games available for this platform.</div>;
  }

  return (
    <div className=" main h-screen  w-full bg-white dark:bg-gray-800 text-black dark:text-white">
      <div>
        <h2>List of {platformgames.name} games</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {platformgames.map((game, index) => (
            <Card key={game.game_id} className="card-custom ">
              <img
                src={game.game_picture}
                alt={`${game.title}`}
                className="game-image"
              />
              <h5
                key={game.game_id + index}
                className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
              >
                {game.title}
              </h5>
              <div className="flex justify-center">
                <Link to={`/games/${game.game_id}`}>
                  <Button>See Details</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlatformGames;
