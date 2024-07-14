import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readInbox as readInboxApi } from "../../services/apiInbox";
import { toast } from "react-toastify";

export function useReadInbox(inboxId) {
  const queryClient = useQueryClient();

  const { isPending: isSetting, mutate: readInbox } = useMutation({
    mutationFn: () => readInboxApi(inboxId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inbox", inboxId] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while set reading to true!");
    },
  });

  return { isSetting, readInbox };
}
