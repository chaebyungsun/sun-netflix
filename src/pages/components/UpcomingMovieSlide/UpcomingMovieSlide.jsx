import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../../../common/MovieCard/MovieCard";
import { Alert } from "react-bootstrap";
import { useUpcomingQuery } from "../../../hooks/useUpcomingMovies";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="dark">{error.message}</Alert>;
  }
  return (
    <div>
      {" "}
      <h3>Upcoming</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {data.results.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </Carousel>
    </div>
  );
};

export default UpcomingMovieSlide;
