import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.css";

// 장르 매핑 객체 정의
const genreMapping = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const MovieCard = ({ movie }) => {
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie_card"
    >
      <div className="overlay">
        <h1>{movie.title}</h1>
        {movie.genre_ids.map((id) => (
          <Badge key={id} bg="danger" className="badge">
            {genreMapping[id] || "Unknown"}
          </Badge>
        ))}{" "}
        <div className="movie_box">
          <div className="vote_average">⭐️ {movie.vote_average}</div>
          <div className="popularity">👥 {movie.popularity}</div>
          <div className="adult">{movie.adult ? "over18" : "under18"}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
