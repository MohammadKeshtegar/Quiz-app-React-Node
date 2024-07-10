import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { deleteChatGroup as deleteChatGroupApi } from "../../services/apiChat";

export function useDeleteChatGroup() {
  const { isPending: isDeleting, mutate: deleteChatGroup } = useMutation({
    mutationFn: deleteChatGroupApi,
    onSuccess: () => {
      toast.success("Chat successfully deleted", { autoClose: 1000 });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while deleting chat!");
    },
  });

  return { isDeleting, deleteChatGroup };
}
