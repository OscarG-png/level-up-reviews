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
    <div className="main flex flex-wrap gap-5  h-full w-full bg-white dark:bg-gray-800 text-black dark:text-white">
      {games.map((game) => {
        return (
        <Link to={`/games/${game.id}`}>
          <Card
            key={game.id}
            className="max-w-sm basis-1/2"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc={game.game_picture}
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {game.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Released on {formatedDate(game.release_date)}
            </p>
          </Card>
        </Link>
        );
      })}
    </div>
  );
}
export default AllGames;
