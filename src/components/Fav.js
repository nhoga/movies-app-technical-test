import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { GlobalContext } from "../context/GlobalState";

export default function Fav({ movie }) {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { addMovieToWatchList, watchlist, watched } = useContext(GlobalContext);
  let storedMovie = watchlist.find((o) => o.id === movie.id);
  let storedMovieWatched = watched.find((o) => o.id === movie.id);
  const watchlistDisabled =
    storedMovie && isAuthenticated
      ? true
      : storedMovieWatched && isAuthenticated
      ? true
      : false;

  const handleClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      addMovieToWatchList(movie);
    }
  };
  return (
    <button
      className="gf-Fav"
      disabled={watchlistDisabled}
      onClick={() => handleClick(movie)}
    >
      <span aria-label="Fav Gif" role="img">
        ❤️
      </span>
    </button>
  );
}
