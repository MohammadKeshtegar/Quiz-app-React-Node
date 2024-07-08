import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { updateChatGroup as updateChatGroupApi } from "../../services/apiChat";

export function useUpdateChatGroup(chatId) {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateChat } = useMutation({
    mutationFn: updateChatGroupApi,
    onSuccess: () => {
      toast.success("Group updated successfully!", { autoClose: 1000 });
      queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { isUpdating, updateChat };
}
