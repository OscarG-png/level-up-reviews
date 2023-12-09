"use client";
import React from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
function GenreList({ genre }) {
  return (
    <div className="main h-full w-full bg-white dark:bg-gray-800 text-black dark:text-white">
      <div>
        <h2>Choose a Genre</h2>
        <div className="flex flex-wrap gap-5">
          {genre.map((g, index) => {
            return (
              <Card
                className="max-w-sm"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAczF9JgfmT2mL7DOldJCsb5_NRcgiQA7vvdBc_h1B2g&s"
              >
                <Link key={g.id + index} to={`/genres/${g.id}/games`}>
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {g.title}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    place holder for description
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

export default GenreList;
