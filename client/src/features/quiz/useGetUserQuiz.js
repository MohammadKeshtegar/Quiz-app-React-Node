import { useQuery } from "@tanstack/react-query";
import { getUserQuiz } from "../../services/apiUser";

export function useGetUserQuiz(userId) {
  const { isLoading, data } = useQuery({
    queryKey: ["quiz", userId],
    queryFn: () => getUserQuiz(userId),
  });

  return { isLoading, data };
}
