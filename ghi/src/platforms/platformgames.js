'use client';
import React from 'react';
import { Card, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

function PlatformGames({ platformgames }) {
  if (!platformgames) {
    return <div>Loading games...</div>;
  }
  if (platformgames.length === 0) {
    return <div>No games available for this platform.</div>;
  }

  return (
    <div className=" main h-screen  w-full bg-white dark:bg-gray-800 text-black dark:text-white">
          <div>
            <h2>List of {platformgames.name} games</h2>
              <div className="flex flex-wrap gap-5 ">
                {platformgames.map((game,index) => (
                    <Card
                        className="max-w-sm"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc="https://seeklogo.com/images/A/apex-logo-F74B0C9FCD-seeklogo.com.png"
                      >
                        <h5 key={(game.game_id +index)} className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {game.title}
                        </h5>
                        <Link to={`/games/${game.game_id}`}>
                          <Button>
                            See Details
                          </Button>
                        </Link>
                  </Card>
                ))}
          </div>
        </div>
    </div>
  );
}

export default PlatformGames;
