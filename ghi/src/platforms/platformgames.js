"use client";
import React, { useEffect, useState } from "react";
import { Card, Button } from "flowbite-react";
import { Link, useParams } from "react-router-dom";

function PlatformGames() {
  let { platform_id } = useParams();
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
    getPlatformGames(platform_id);
  }, [platform_id]);

  if (!platformgames) {
    return <div>Loading games...</div>;
  }
  if (platformgames.length === 0) {
    return <div>No games available for this platform.</div>;
  }

  return (
    <div className=" main h-screen  w-full bg-white dark:bg-gray-800 text-black dark:text-white">
      <div>
        <h2>List of games</h2>
        <div className="flex flex-wrap gap-5">
          {platformgames.map((game, index) => (
            <Card key={game.game_id} className="card-custom max-w-sm basis-1/2">
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
