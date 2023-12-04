"use-client";
import { Button, Card } from "flowbite-react";
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
    <div className="main flex gap-5">
      {filteredGames.map((game) => {
        return (
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
            <Button>Check it out</Button>
          </Card>
        );
      })}
    </div>
  );
}
export default RecentPage;
