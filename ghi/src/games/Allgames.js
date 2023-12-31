"use-client";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

function AllGames({ games }) {
  function formatedDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }
  return (
    <div>
      <h1
        className="p-5 text-center text-outline text-customPurple dark:bg-gray-800"
        style={{ fontSize: "4rem", fontWeight: "bold" }}
      >
        All Games!
      </h1>
    <div className="main flex flex-wrap gap-5  h-full w-full bg-white dark:bg-gray-800 text-black dark:text-white">
      {games.map((game) => {
        return (
          <Card
              key={game.id}
              className="card-custom max-w-sm basis-1/2 dark:bg-gray-800 text-black dark:text-white bold-card"
            >
              <Link key={game.id} to={`/games/${game.id}`}>
              <img
                src={game.game_picture}
                alt={game.title}
                className="game-image"
              />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center">
              {game.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 flex justify-center dark:bg-gray-800 text-black dark:text-white">
              Released on {formatedDate(game.release_date)}
            </p>
            </Link>
          </Card>
        );
      })}
      </div>
    </div>
  );
}
export default AllGames;
