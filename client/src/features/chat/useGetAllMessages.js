import { useQuery } from "@tanstack/react-query";
import { getAllChatMessages } from "../../services/apiMessage";

export function useGetAllMessages(chatID) {
  const { isLoading, data } = useQuery({
    queryKey: ["messages", chatID],
    queryFn: () => getAllChatMessages(chatID),
  });

  return { isLoading, data };
}
