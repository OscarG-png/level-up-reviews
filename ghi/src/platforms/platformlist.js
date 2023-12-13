'use client';
import React from 'react';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

function PlatformList({platforms}) {
  if (platforms === undefined || platforms === null) {
    return <div>Loading platforms... or handle error</div>;
  }
  if (platforms.length === 0) {
    return <div>No platforms available.</div>;
  }

  return (
    <div className="main h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
    <h2>Choose a Platform</h2>
      <div className="flex flex-wrap gap-5 h-full w-full bg-white dark:bg-gray-800 text-black dark:text-white" >
          {platforms.map( p => {
            return (
              <Link
                key={p.id}
                to={`/platforms/${p.id}/games`}
                >
                <Card
                    className="max-w-sm"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAczF9JgfmT2mL7DOldJCsb5_NRcgiQA7vvdBc_h1B2g&s"
                  >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {p.name}
                    </h5>
                </Card>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default PlatformList;
