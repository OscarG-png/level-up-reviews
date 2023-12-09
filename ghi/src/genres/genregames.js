"use client";
import React, { useEffect, useState } from "react";
import { Card, Button } from "flowbite-react";
import { Link, useParams } from "react-router-dom";
function GenreGames() {
  let { genre_id } = useParams();
  const [genregames, setGenresGames] = useState([]);

  async function getGenresGames(genre_id) {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/genres/${genre_id}/games`
    );
    if (response.ok) {
      const data = await response.json();
      setGenresGames(data.genre_games);
    }
  }
  useEffect(() => {
    getGenresGames(genre_id);
  }, [genre_id]);

  if (!genregames) {
    return <div>Loading games...</div>;
  }
  if (genregames.length === 0) {
    return <div>No games available for this genre.</div>;
  }
  return (
    <div className=" main h-screen  w-full bg-white dark:bg-gray-800 text-black dark:text-white">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          List of {genregames.name} games
        </h2>
        <div className="flex flex-wrap gap-5 ">
          {genregames.map((game, index) => (
            <Card
              key={game.game_id}
              className="card-custom max-w-sm basis-1/2"
            >
              <img
                src={game.game_picture}
                alt={game.title}
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

export default GenreGames;
