"use client";
import React from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
function GenreList({ genre }) {
  return (
    <div className="main h-full w-full bg-white dark:bg-gray-800 text-black dark:text-white">
      <div>
        <h1
        className="p-5 text-center text-outline text-customPurple dark:bg-gray-800"
        style={{ fontSize: "4rem", fontWeight: "bold" }}
      >
        Choose a Genre
      </h1>
        <div className="flex flex-wrap gap-5">
          {genre.map((g, index) => {
            return (

              <Card key={g.id + index} className="card-custom max-w-sm basis-1/">
                  <Link to={`/genres/${g.id}/games`}>
                    <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAczF9JgfmT2mL7DOldJCsb5_NRcgiQA7vvdBc_h1B2g&s"
                    alt="Meaningful alt text for an image that is not purely decorative"
                    className="game-image"
                  />
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                    {g.title}
                  </h5>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GenreList;
