"use client";
import React from "react";
import { Card } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
function GenreList({ genre, genregames }) {
  const navigate = useNavigate();
  const handleGenreClick = (genre_id) => {
    genregames(genre_id);
    navigate(`/genres/${genre_id}/games`);
  };
  return (
    <div className="main">
      <div>
        <h2>Choose a Genre</h2>
        {genre.map((g, index) => {
          return (
            // <tr key={g.id}>
            //   <td >{g.title}</td>
            // </tr>
            <Card
              key={g.id}
              className="max-w-sm"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAczF9JgfmT2mL7DOldJCsb5_NRcgiQA7vvdBc_h1B2g&s"
            >
              <a key={g.id + index} onClick={() => handleGenreClick(g.id)}>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {g.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  place holder for description
                </p>
              </a>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default GenreList;
