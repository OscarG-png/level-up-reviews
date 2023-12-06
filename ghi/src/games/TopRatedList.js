"use client";
import React from "react";
import { Card } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
function TopRatedList({ games, reviews }) {
  const navigate = useNavigate();

  const hasRatingAbove90 = (game) => {
    return reviews.some((review) => review.game_id === game.id && review.rating > 90);
  };

  const filteredGames = games.filter(hasRatingAbove90);

  return (
    <div className="main h-screen w-full bg-white dark:bg-gray-800 text-black dark:text-white">
      <div>
        <h2>Top Rated Games</h2>
        <div className="flex flex-wrap gap-5">
          {filteredGames.map((g, index) => (
            <Link to={`/games/${g.id}`} key={g.id + index}>
              <Card
                className="max-w-sm"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAczF9JgfmT2mL7DOldJCsb5_NRcgiQA7vvdBc_h1B2g&s"
              >
                <div>
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {g.title}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Placeholder for description
                  </p>
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
