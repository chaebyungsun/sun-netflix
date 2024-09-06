import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useMovieReviewsQuery = (id) => {
  return useQuery({
    queryKey: ["movieReviews", id],
    queryFn: async () => {
      const response = await api.get(
        `/movie/${id}/reviews?language=en-US&page=1`
      );
      return response.data.results; // 리뷰 목록 반환
    },
  });
};
