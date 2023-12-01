"use client";
import React from "react";
import { Carousel } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';

function GenreMain({ genre, genregames }) {

    const navigate = useNavigate();
    const handleGenreClick = (genre_id) => {
      genregames(genre_id);
      console.log("Clicked Genre ID:", genre_id);
      navigate(`/genres/${genre_id}/games`);
      };
    return (
        <>
        <h2 className="p-5 text-center">Genres</h2>
        <div className="h-56 sm:h-80 xl:h-80 2xl:h-96">
            <Carousel slideInterval={4000}>
            {genre.map((genre,index)=> (
                <a key={genre.id + index} onClick={() => handleGenreClick(genre.id)}>
                <img
                    key={genre.id}
                    src="https://1000logos.net/wp-content/uploads/2020/09/Final-Fantasy-XIV-Logo.jpg"
                    alt={genre.title}
                />
                </a>
            ))}
            </Carousel>
        </div>
        </>
    );
    }

    export default GenreMain;
