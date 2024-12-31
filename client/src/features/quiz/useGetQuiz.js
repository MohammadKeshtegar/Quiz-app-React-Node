import { useQuery } from "@tanstack/react-query";
import { getQuiz as getQuizApi } from "../../services/apiQuiz";
import { useLocation, useParams } from "react-router-dom";

export function useGetQuiz() {
  const { state } = useLocation();
  const { id } = useParams();
  const stateOrId = Boolean(id);
  let quizId;

  if (stateOrId) {
    quizId = id;
  } else {
    quizId = state;
  }

  const { data, isLoading } = useQuery({
    queryFn: () => getQuizApi(quizId),
    queryKey: ["quiz", quizId],
  });

  return { isLoading, data };
}
