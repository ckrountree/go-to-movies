import React from 'react';

export function Movies({ movies }) {
  return (
    <div>
      <div className="wrapper">
        {movies.map(film => (
          <div key={film.imdbID}>
            <h4>{`${film.Title} (${film.Year})`}</h4>
            <h6>IMDB Link: <a href={'http://www.imdb.com/title/' + film.imdbID}>{film.Title} </a></h6>
            <img src={film.Poster} alt="" /> 
          </div>
        ))} 
      </div>
      <div className="movies-found">
        <div>Movies Found: {movies.length}</div>
      </div>
    </div> 
  );
}