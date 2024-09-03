import React from "react";
import { usePopularMoviesQuery } from "../../../hooks/usePopularMovies";
import { Alert } from "react-bootstrap";

import "react-multi-carousel/lib/styles.css";

import "./PopularMovieSlide.css";
import MovieSlider from "../../../common/MovieSlider/MovieSlider";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="dark">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider title="Popular Movie" movies={data.results} />
    </div>
  );
};

export default PopularMovieSlide;
