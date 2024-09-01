import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularMovies = () => {
  return api.get(`/movie/popular`);
};
export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-popular"], // 쿼리 키 설정
    queryFn: fetchPopularMovies, // 데이터를 가져오는 함수
    select: (result) => result.data, // 필요한 데이터만 선택
  });
};
