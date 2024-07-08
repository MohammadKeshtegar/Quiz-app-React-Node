import { useQuery } from "@tanstack/react-query";
import { getNotTeammateUsers } from "../../services/apiUser";

export function useGetNotTeammateUsers(chatId) {
  const { isLoading, data } = useQuery({
    queryFn: () => getNotTeammateUsers(chatId),
    queryKey: ["users"],
  });

  return { isLoading, data };
}
