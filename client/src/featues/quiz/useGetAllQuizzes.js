import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllQuizzes } from "../../services/apiQuiz";

export function useGetAllQuizzes() {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ["quiz"] });

  const { isLoading, data } = useQuery({
    queryFn: () => getAllQuizzes(false),
    queryKey: ["quiz"],
  });

  return { isLoading, data };
}
