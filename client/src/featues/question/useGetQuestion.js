import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getQuestion } from "../../services/apiQuestion";

export function useGetQuestion(id) {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ["question"] });

  const { isLoading, data } = useQuery({
    queryFn: () => getQuestion(id),
    queryKey: ["question"],
  });

  return { isLoading, data };
}
