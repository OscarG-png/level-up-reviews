"use client";
import React from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

function GenreMain({ genre}) {
    return (
        <div className="container mx-auto">
        <h2 className="p-5 text-center text-outline text-customPurple" style={{ fontSize: '2.5rem', fontWeight: 'bold'  }}>
            Genres
        </h2>
        <div className="flex flex-wrap gap-2">
            <Button.Group>
            {genre.map((genre) => (
              <Button
                className="px-6 py-4 sm:px-3 sm:py-2 gradient-gray-to-black"
                gradientMonochrome="grayToBlack"
              >
                <Link to={`/genres/${genre.id}/games`} key={genre.id}>
                {genre.title}
                </Link>
              </Button>
            ))}
            </Button.Group>
        </div>
        </div>
    );
    }

    export default GenreMain;
