import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { getUserQuiz } from "../../services/apiUser";

export function useGetUserQuiz() {
  const { id: userId } = useSelector((state) => state.user);

  const { isLoading, data: userQuizzes } = useQuery({
    queryKey: ["quiz", userId],
    queryFn: () => getUserQuiz(userId),
  });

  return { isLoading, userQuizzes };
}
