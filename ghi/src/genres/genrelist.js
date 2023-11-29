import React from 'react';

function GenreList({genre}) {
  console.log("genre list",genre)
  return (
    <div className="main" >
      <div>
        <h2>Choose a Genre</h2>
        <table>
          <thead>
            <tr>
              <th>Genres</th>
            </tr>
          </thead>
          <tbody>
            {genre.map((g) => {
              return (
                <tr key={g.id}>
                  <td >{g.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GenreList;
