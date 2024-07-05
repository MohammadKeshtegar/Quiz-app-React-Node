import { useQuery } from "@tanstack/react-query";
import { getQuizQuestions as getQuizQuestionsApi } from "../../services/apiQuestion";

export function useGetQuizQuestions() {
  const { isLoading, data } = useQuery({
    queryFn: getQuizQuestionsApi,
    queryKey: ["question"],
  });

  return { isLoading, data };
}
