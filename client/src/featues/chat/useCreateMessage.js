import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage as createMessageApi } from "../../services/apiMessage";
import { toast } from "react-toastify";

export function useCreateMessage(chatId) {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createMessage } = useMutation({
    mutationFn: createMessageApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while sending message!");
    },
  });

  return { isCreating, createMessage };
}
