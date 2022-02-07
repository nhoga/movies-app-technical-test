/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import "../App.css";

export default function MovieControls({ movie, type }) {
  const {
    removeMovieFromWatchList,
    addMovieToWatched,
    moveToWatchList,
    removeFromWatched,
  } = useContext(GlobalContext);
  return (
    <div className="inner-card-controls">
      {type === "watchlist" && (
        <>
          <button className="ctrl-btn" onClick={() => addMovieToWatched(movie)}>
            <img src="https://img.icons8.com/glyph-neue/64/000000/visible.png" />{" "}
            <br></br>
            Add Watched
          </button>
          <button
            className="ctrl-btn"
            onClick={() => removeMovieFromWatchList(movie.id)}
          >
            <img src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-cancel-mintab-for-ios-becris-lineal-becris.png" />
            <br></br>
            Delete
          </button>{" "}
        </>
      )}
      {type === "watched" && (
        <>
          <button className="ctrl-btn" onClick={() => moveToWatchList(movie)}>
            <img src="https://img.icons8.com/pastel-glyph/64/000000/invisible--v1.png" />{" "}
            <br></br>
            Didn't see
          </button>{" "}
          <button
            className="ctrl-btn"
            onClick={() => removeFromWatched(movie.id)}
          >
            <img src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-cancel-mintab-for-ios-becris-lineal-becris.png" />
            <br></br>
            Delete
          </button>{" "}
        </>
      )}
    </div>
  );
}
