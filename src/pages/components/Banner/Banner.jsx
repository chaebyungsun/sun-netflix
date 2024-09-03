import React from "react";
import { usePopularMoviesQuery } from "../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import "./Banner.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="dark">{error.message}</Alert>;
  }

  // 여러 영화를 슬라이드로 표시하기 위해 데이터를 슬라이싱합니다.
  const topMovies = data.results.slice(0, 7); // 상위 7개의 영화를 슬라이드에 사용

  return (
    <Carousel
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      centerMode={false}
      responsive={responsive}
      showDots={false}
      arrows={true}
      containerClass="banner-container"
      itemClass="banner-item"
    >
      {topMovies.map((movie, index) => (
        <div
          key={index}
          style={{
            backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${movie.backdrop_path})`,
          }}
          className="banner"
        >
          <div className="text-white banner_text_area">
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
