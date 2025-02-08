import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInbox } from "../../services/apiInbox";

export function useSetInboxRead() {
  const queryClient = useQueryClient();
  const { isPending: isSetting, mutate: setReadInbox } = useMutation({
    mutationFn: updateInbox,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["inboxes", data.sender] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { isSetting, setReadInbox };
}
