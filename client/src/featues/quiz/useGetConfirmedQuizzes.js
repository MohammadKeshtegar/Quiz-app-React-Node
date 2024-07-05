import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllQuizzes } from "../../services/apiQuiz";

export function useGetConfirmedQuizzes(quizIdArray) {
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryFn: () => getAllQuizzes(quizIdArray),
    queryKey: ["quiz"],
  });

  queryClient.invalidateQueries({ queryKey: ["user"] });

  return { isLoading, data };
}
