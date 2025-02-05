import { useQuery } from "@tanstack/react-query";
import { getAllChats } from "../../services/apiChat";

export function useGetAllChats() {
  const { isLoading, data } = useQuery({
    queryFn: getAllChats,
    queryKey: ["chats"],
  });

  return { isLoading, data };
}
