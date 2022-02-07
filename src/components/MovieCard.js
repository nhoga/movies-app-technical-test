import React from "react";
import { useLocation } from "react-router";
import Fav from "./Fav";
import MovieControls from "./MovieControls";

const MovieCard = ({ movie, selectedMovie, type }) => {
  const location = useLocation();
  const show = !location.pathname.includes("watched", "watchlist");

  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  const toTop = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  return (
    <div className="movie-card" onClick={() => selectedMovie(movie)}>
      <div className="movie-buttons">
        <>{show && <Fav movie={movie} />}</>
      </div>

      {movie.poster_path ? (
        <img
          onClick={() => toTop()}
          className="movie-cover"
          src={IMAGE_PATH + movie.poster_path}
          alt={movie.id}
        ></img>
      ) : (
        <div className="movie-placeholder">No Image found</div>
      )}
      <h5 className="movie-title">{movie.title}</h5>
      <p></p>

      <MovieControls type={type} movie={movie} />
    </div>
  );
};

export default MovieCard;
