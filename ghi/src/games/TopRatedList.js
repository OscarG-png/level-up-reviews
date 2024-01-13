"use client";
import React from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
function TopRatedList({ games, reviews }) {
  const averageRatingAbove90 = (game) => {
    const relevantReviews = reviews.filter(
      (review) => review.game_id === game.id && review.rating > 90
    );
    if (relevantReviews.length > 0) {
      const totalRating = relevantReviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      return totalRating / relevantReviews.length;
    }

    return 0;
  };
  const filteredGames = games.filter(averageRatingAbove90);
  return (
    <div className="main h-screen w-full bg-white dark:bg-gray-800 text-customPurple ">
      <div>
        <h2>Top Rated Games</h2>
        <div className="flex flex-wrap gap-5">
          {filteredGames.map((g, index) => (
            <Link to={`/games/${g.id}`} key={g.id + index}>
              <Card
                className="max-w-sm"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={g.game_picture}
              >
                <div>
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {g.title}
                  </h5>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TopRatedList;
