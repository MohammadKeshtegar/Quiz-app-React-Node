import { useQuery } from "@tanstack/react-query";
import { getUserQuiz } from "../../services/apiUser";
import { useSelector } from "react-redux";

export function useGetUserQuiz() {
  const { id: userId } = useSelector((state) => state.user);

  const { isLoading, data: userQuizzes } = useQuery({
    queryKey: ["quiz", userId],
    queryFn: () => getUserQuiz(userId),
  });

  return { isLoading, userQuizzes };
}
