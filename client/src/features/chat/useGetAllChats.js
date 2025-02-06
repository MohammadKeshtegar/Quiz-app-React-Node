import { useQuery } from "@tanstack/react-query";
import { getAllChats } from "../../services/apiChat";

export function useGetAllChats(queries) {
  const { isLoading, data } = useQuery({
    queryFn: () => getAllChats(queries),
    queryKey: ["chats", queries],
  });

  return { isLoading, data };
}
