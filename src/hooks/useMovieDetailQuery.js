import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useMovieDetailQuery = (id) => {
  return useQuery({
    queryKey: ["movieDetail", id],
    queryFn: async () => {
      const response = await api.get(
        `https://api.themoviedb.org/3/movie/${id}?language=ko`
      );
      return response.data;
    },
    catch(error) {
      throw new Error("API 요청에 실패했습니다.");
    },
  });
};
