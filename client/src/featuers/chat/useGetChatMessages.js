import { useQuery } from "@tanstack/react-query";
import { getChatMessages } from "../../services/apiChat";

export function useGetChatMessagse(chatId) {
  const { isLoading, data } = useQuery({
    queryFn: () => getChatMessages(chatId),
    queryKey: ["chat"],
  });

  return { isLoading, data };
}
