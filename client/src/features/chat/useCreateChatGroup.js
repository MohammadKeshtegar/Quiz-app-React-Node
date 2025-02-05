import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { createChatGroup } from "../../services/apiChat";

export function useCreateChatGroup() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createChat } = useMutation({
    mutationFn: createChatGroup,
    onSuccess: () => {
      toast.success("Chat group created successfully!", { autoClose: 1500 });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while creating chat group!");
    },
  });

  return { isCreating, createChat };
}
