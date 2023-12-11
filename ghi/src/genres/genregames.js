"use client";
import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
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
    <div className=" main  h-screen flex flex-wrap gap-5 bg-white dark:bg-gray-800 text-black dark:text-white">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          List of {genregames.name} games
        </h2>
        <div className="flex flex-wrap gap-5 ">
          {genregames.map((game, index) => (
          <Link key= {game.game_id} to={`/games/${game.game_id}`}>
            <Card
              key= {game.game_id}
              className="max-w-sm flex flex-wrap gap-5 "
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc={game.game_picture}
            >
              <h5
                key={game.game_id + index}
                className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
              >
                {game.title}
              </h5>
            </Card>
           </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GenreGames;
