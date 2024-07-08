import { useQuery } from "@tanstack/react-query";
import { getChat } from "../../services/apiChat";

export function useGetChat(chatId) {
  const { isLoading, data } = useQuery({
    queryFn: () => getChat(chatId),
    queryKey: ["chat", chatId],
  });

  return { isLoading, data };
}
