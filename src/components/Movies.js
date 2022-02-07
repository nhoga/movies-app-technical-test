import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import YouTube from "react-youtube";

export default function WatchList() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchKey, setSearchKey] = useState("");
  const [playTrailer, setPlayTrailer] = useState(false);

  const IMAGE_PATH = "https://image.tmdb.org/t/p/original/";

  //////////////////////////////////////////
  const API_URL = "https://api.themoviedb.org/3/";

  ///////////////////////////////////////////

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(API_URL + type + "/movie", {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        query: searchKey,
      },
    });
    setMovies(results);
    await selectMovie(results[0]);
  };

  const sortMovies = () => {
    const date = document.getElementById("date");
    const rating = document.getElementById("rating");

    if (date?.value === "newest") {
      movies.sort(function (a, b) {
        if (a.release_date.toLowerCase() < b.release_date.toLowerCase())
          return -1;
        if (a.release_date.toLowerCase() > b.release_date.toLowerCase())
          return 1;
        return 0;
      });
    } else if (date?.value === "oldest") {
      movies.sort(function (a, b) {
        if (a.release_date.toLowerCase() > b.release_date.toLowerCase())
          return -1;
        if (a.release_date.toLowerCase() < b.release_date.toLowerCase())
          return 1;
        return 0;
      });
    } else if (rating?.value === "higher") {
      movies.sort(function (a, b) {
        if (a.vote_average > b.vote_average) return -1;
        if (a.vote_average < b.vote_average) return 1;
        return 0;
      });
    } else if (rating?.value === "lower") {
      movies.sort(function (a, b) {
        if (a.vote_average < b.vote_average) return -1;
        if (a.vote_average > b.vote_average) return 1;
        return 0;
      });
    }
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(API_URL + "movie/" + id, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        append_to_response: "videos",
      },
    });
    return data;
  };

  const selectMovie = async (movie) => {
    setPlayTrailer(false);
    const data = await fetchMovie(movie.id);
    setSelectedMovie(data);
  };

  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    const key = trailer ? trailer.key : selectedMovie.videos?.results[0]?.key;
    return (
      <YouTube
        videoId={key}
        containerClassName={"youtube-container"}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            controls: 0,
          },
        }}
      />
    );
  };

  ////////////////////////////////

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /////////////////////////////////

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  const renderMovies = () => {
    return movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} selectedMovie={selectMovie} />
    ));
  };

  return (
    <div>
      <div className="search">
        <form onSubmit={searchMovies}>
          <input
            placeholder="Search the movie you want"
            className="input-search"
            type="text"
            onChange={(e) => setSearchKey(e.target.value)}
          ></input>
          <select className="select" onSubmit={sortMovies()} id="date">
            <option>Sort by Date</option>
            <option
              value="oldest"
              onChange={(e) => setSearchKey(e.target.value)}
            >
              Newest
            </option>
            <option
              value="newest"
              onChange={(e) => setSearchKey(e.target.value)}
            >
              Oldest
            </option>
          </select>
          <select onSubmit={sortMovies()} id="rating">
            <option>Sort by Rating</option>
            <option
              value="higher"
              onChange={(e) => setSearchKey(e.target.value)}
            >
              Higher
            </option>
            <option
              value="lower"
              onChange={(e) => setSearchKey(e.target.value)}
            >
              Lower
            </option>
          </select>
          <button className="btn-search2" type="submit">
            Search
          </button>
        </form>
      </div>

      {selectedMovie.overview ? (
        <div
          className="hero"
          style={{
            backgroundImage:
              "url(" + IMAGE_PATH + selectedMovie.backdrop_path + ")",
          }}
        >
          <div className="hero-content max-center">
            {selectedMovie.videos && playTrailer ? renderTrailer() : null}
            {playTrailer ? (
              <button
                className="button button--close"
                onClick={() => setPlayTrailer(false)}
              >
                Close
              </button>
            ) : (
              <button className="button" onClick={() => setPlayTrailer(true)}>
                Play Trailer
              </button>
            )}

            <h1 className="hero-title">{selectedMovie.title}</h1>
            <p className="hero-genres">
              {selectedMovie.genres[0]?.name}, {selectedMovie.genres[1]?.name}
            </p>
            <p className="hero-genres">
              Release date: {selectedMovie.release_date}
            </p>
            <p className="hero-genres">Rating: {selectedMovie.vote_average}</p>

            {selectedMovie.overview ? (
              <p className="hero-overview">{selectedMovie.overview}</p>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className="container max-center">{renderMovies()}</div>
    </div>
  );
}
