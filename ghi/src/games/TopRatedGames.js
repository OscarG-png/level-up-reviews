"use client";
import React from "react";
import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";

function TopRatedGames({ games, reviews }) {
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

    return 0; // or any default value if there are no reviews above 90
  };
  const filteredGames = games.filter(averageRatingAbove90);
  return (
    <>
      <h2
        className="p-5 text-center text-outline text-customPurple"
        style={{ fontSize: "2.5rem", fontWeight: "bold" }}
      >
        Top rated games
      </h2>
      <div className="h-56 sm:h-80 xl:h-80 2xl:h-96">
        <Carousel slideInterval={4000}>
          {filteredGames.map((game) => (
            <Link to={`/games/${game.id}`} key={game.id}>
              <div className="relative">
                <img
                  src={game.game_picture}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                  <h3
                    style={{ fontSize: "4rem", fontWeight: "bold" }}
                    className="text-outline"
                  >
                    {game.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default TopRatedGames;
