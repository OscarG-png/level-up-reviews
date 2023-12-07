"use client";
import React from "react";
import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";

function GenreMain({ genre, genregames }) {
  return (
    <>
      <h2 className="p-5 text-center">Genres</h2>
      <div className="h-56 sm:h-80 xl:h-80 2xl:h-96">
        <Carousel slideInterval={4000}>
          {genre.map((genre, index) => (
            <Link key={genre.id + index} to={`/genres/${genre.id}/games`}>
              <img
                key={genre.id}
                src="https://1000logos.net/wp-content/uploads/2020/09/Final-Fantasy-XIV-Logo.jpg"
                alt={genre.title}
              />
            </Link>
          ))}
        </Carousel>
      </div>
    </>
  );
}
export default GenreMain;
