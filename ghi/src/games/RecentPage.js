"use-client";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
function RecentPage({ games }) {
  let currentDate = new Date();
  let filteredGames = games.filter((game) => {
    let releaseDate = new Date(game.release_date);
    let timeDifference = currentDate - releaseDate;
    let daysDifference = Math.abs(
      Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    );
    return daysDifference <= 60;
  });
    function formatedDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    }
  return (
    <div className="main h-screen w-screen flex gap-5 bg-white dark:bg-gray-800 text-black dark:text-white">
      <div>
         <h2>List of games</h2>
        <div className="flex flex-wrap gap-5 ">
      {filteredGames.map((game,index) => {
        return (
          <Link  to={`/games/${game.id}`} key={game.id + index}>
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
    </div>
    </div>
  );
}
export default RecentPage;
