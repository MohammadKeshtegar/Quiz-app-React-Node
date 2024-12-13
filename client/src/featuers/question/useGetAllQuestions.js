import { useQuery } from "@tanstack/react-query";
import { getAllQuestions as getAllQuestionsApi } from "../../services/apiQuestion";

export function useGetAllQuestions(isCreatingQuiz) {
  const { isLoading, data } = useQuery({
    queryKey: ["question"],
    queryFn: () => getAllQuestionsApi(isCreatingQuiz),
  });

  return { isLoading, data };
}
