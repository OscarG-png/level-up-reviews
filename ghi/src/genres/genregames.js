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
  return (
    <div className=" main h-screen  w-full bg-white dark:bg-gray-800 text-black dark:text-white">
      <div>
        <h2>List of {genregames.name} games</h2>
        <div className="flex flex-wrap gap-5 ">
          {genregames.map((game, index) => (
            <Card
              className="max-w-sm  "
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc={game.game_picture}
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
              <Button>
                See Details
                <svg
                  className="-mr-1 ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
              <Link to={`/games/${game.game_id}`}>
                <Button>See Details</Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GenreGames;
