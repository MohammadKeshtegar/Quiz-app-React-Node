import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllQuizzes } from "../../services/apiQuiz";

export function useGetAllQuizzes(filters) {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["quiz"] });

  const { isLoading, data } = useQuery({
    queryFn: () => getAllQuizzes(false, filters),
    queryKey: ["quiz", filters],
  });

  return { isLoading, data };
}
