import { useQuery } from "@tanstack/react-query";
import { getUserChats } from "../../services/apiChat";

export function useGetUserChats(userChatsId) {
  const { isLoading, data } = useQuery({
    queryFn: () => getUserChats(userChatsId),
    queryKey: ["chats"],
  });

  return { isLoading, data };
}
