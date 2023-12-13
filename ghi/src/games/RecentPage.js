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
         <h2 className="text-right">List of games</h2>
        <div className="flex flex-wrap gap-5 ">
      {filteredGames.map((game,index) => {
        return (
          <Card key={game.id + index} className="card-custom max-w-sm basis-1/2">
            <Link to={`/games/${game.id}`} >
            <img
                src={game.game_picture}
                alt={`${game.title}`}
                className="game-image"
              />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              {game.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
              Released on {formatedDate(game.release_date)}
            </p>
            </Link>
          </Card>
        );
      })}
    </div>
    </div>
    </div>
  );
}
export default RecentPage;
