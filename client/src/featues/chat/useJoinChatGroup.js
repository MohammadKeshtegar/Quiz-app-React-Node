import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinChatGroup } from "../../services/apiChat";
import { toast } from "react-toastify";

export function useJoinChatGroup(chatId) {
  const queryClient = useQueryClient();

  const { isPending: isJoining, mutate: joinChat } = useMutation({
    mutationFn: joinChatGroup,
    onSuccess: (data) => {
      if (data.status === "success") {
        toast.success("You joined this chat!", { autoClose: 1000 });
        queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
      } else {
        toast.error(`${data.message}`);
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while joining to this chat!");
    },
  });

  return { isJoining, joinChat };
}
