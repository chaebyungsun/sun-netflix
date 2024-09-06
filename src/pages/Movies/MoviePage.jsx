import React, { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import {
  Alert,
  Row,
  Col,
  Container,
  Spinner,
  Form,
  Button,
} from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import "./MoviePage.css";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState(query.get("q") || "");

  const keyword = query.get("q");
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });
  console.log("ddd", data);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setQuery({ q: searchInput });
    setPage(1); // 검색할 때 페이지를 1로 리셋
    setSearchInput(""); // 검색 후 검색창 비우기
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center", // 가로 중앙 정렬
          alignItems: "center", // 세로 중앙 정렬
          height: "100vh", // 화면 전체 높이
        }}
      >
        <Spinner
          animation="border"
          variant="light"
          style={{
            width: "5rem",
            height: "5rem",
          }}
        />
      </div>
    );
  }
  if (isError) {
    return <Alert variant="dark">{error.message}</Alert>;
  }
  if (data?.results.length === 0) {
    return <NotFoundPage />;
  }
  console.log("Total Pages:", data?.total_pages);
  return (
    <Container className="container">
      {" "}
      <Form onSubmit={handleSearchSubmit} className="search-form my-4">
        <div className="search-container">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="영화를 검색하세요..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            검색
          </button>
        </div>
      </Form>
      <Row>
        <Col className="movie">
          <Row>
            {" "}
            {data?.results.map((movie) => (
              <Col key={movie.id}>
                {" "}
                <MovieCard movie={movie} className="movie_card" />
              </Col>
            ))}
          </Row>
          <div className="paginate">
            {" "}
            <ReactPaginate
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              marginPagesDisplayed={0}
              pageCount={data?.total_pages}
              previousLabel="< "
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={page - 1}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
