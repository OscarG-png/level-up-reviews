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
  return (
    <div className=" main  h-screen flex flex-wrap gap-5 bg-white dark:bg-gray-800 text-black dark:text-white">
      <div>
        <h2>List of {genregames.name} games</h2>
        <div className="flex flex-wrap gap-5 ">
          {genregames.map((game, index) => (
          <Link to={`/games/${game.game_id}`}>
            <Card
              className="max-w-sm flex flex-wrap gap-5 "
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc={game.game_picture}
              imgClass="object-cover w-full h-full"
            >
              <h5
                key={game.game_id + index}
                className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                {game.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                place holder for description
              </p>
            </Card>
           </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GenreGames;
