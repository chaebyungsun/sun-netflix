import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetailQuery";
import { useMovieReviewsQuery } from "../../hooks/useMovieReviewsQuery";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Card,
  Button,
} from "react-bootstrap";
import "./MovieDetailPage.css"; // 필요한 CSS 파일

const MAX_LENGTH = 200; // 기본적으로 보여줄 리뷰 글자 수

const MovieDetailPage = () => {
  const { id } = useParams(); // URL에서 영화 ID를 가져옴
  const { data, isLoading, isError, error } = useMovieDetailQuery(id); // 영화 상세 정보 요청
  const {
    data: reviewsData,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
    error: reviewsError,
  } = useMovieReviewsQuery(id); // 리뷰 요청

  const [expandedReviewIds, setExpandedReviewIds] = useState([]); // 리뷰 접힘/펼침 상태 관리

  // 리뷰가 접혀있는지 확인하는 함수
  const isReviewExpanded = (id) => expandedReviewIds.includes(id);

  // 리뷰 펼침/접힘 상태를 토글하는 함수
  const toggleReview = (id) => {
    if (isReviewExpanded(id)) {
      setExpandedReviewIds(
        expandedReviewIds.filter((reviewId) => reviewId !== id)
      ); // 펼친 리뷰 ID 제거
    } else {
      setExpandedReviewIds([...expandedReviewIds, id]); // 펼친 리뷰 ID 추가
    }
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  if (!data) {
    return <Alert variant="danger">영화 정보를 불러올 수 없습니다.</Alert>;
  }

  const { poster_path, title, genres, popularity, overview, release_date } =
    data || {}; // 영화 정보 추출

  return (
    <Container className="movie-detail-page">
      <Row className="align-items-center">
        <Col md={4}>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            className="movie-poster"
          />
        </Col>
        <Col md={8}>
          <h1 className="movie-title">{title}</h1>
          <p>
            <strong>장르:</strong>{" "}
            {genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>인기:</strong> {popularity}
          </p>
          <p>
            <strong>개봉일:</strong> {release_date}
          </p>
          <h4>줄거리</h4>
          <p>{overview || "줄거리 정보 없음"}</p>
        </Col>
      </Row>

      {/* 리뷰 섹션 */}
      <Row className="mt-5">
        <Col>
          <h3>리뷰</h3>

          {/* 리뷰 로딩 상태 처리 */}
          {isReviewsLoading && <Spinner animation="border" variant="primary" />}

          {/* 리뷰 오류 상태 처리 */}
          {isReviewsError && (
            <Alert variant="danger">{reviewsError.message}</Alert>
          )}

          {/* 리뷰 데이터 표시 */}
          {reviewsData && reviewsData.length > 0 ? (
            reviewsData.map((review) => (
              <Card key={review.id} className="mb-3">
                <Card.Body>
                  <Card.Title className="title">{review.author}</Card.Title>

                  {/* 리뷰 내용 표시 */}
                  <Card.Text>
                    {isReviewExpanded(review.id)
                      ? review.content // 전체 내용 표시
                      : review.content.length > MAX_LENGTH
                      ? `${review.content.slice(0, MAX_LENGTH)}...` // 일부만 표시
                      : review.content}{" "}
                    {/* 리뷰가 짧으면 그대로 표시 */}
                    {/* 더보기/접기 버튼 */}
                    {review.content.length > MAX_LENGTH && (
                      <Button
                        variant="link"
                        className="p-0 mt-2"
                        onClick={() => toggleReview(review.id)}
                      >
                        {isReviewExpanded(review.id) ? "접기" : "더보기"}
                      </Button>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>리뷰가 없습니다.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailPage;
