import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeChatMember } from "../../services/apiChat";
import { toast } from "react-toastify";

export function useRemoveMember(chatId, onCloseModal) {
  const queryClient = useQueryClient();

  const { isPending: isRemoving, mutate: removeMember } = useMutation({
    mutationFn: removeChatMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat"] });
      toast.success("User removed from group successfully!", { autoClose: 1000 });
      onCloseModal();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while removing user from group!");
    },
  });

  return { isRemoving, removeMember };
}
