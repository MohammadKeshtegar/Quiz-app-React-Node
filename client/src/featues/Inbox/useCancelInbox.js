import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { cancelInbox as cancelInboxApi } from "../../services/apiInbox";

export function useCancelInbox() {
  const queryClient = useQueryClient();

  const { isPending: isCancelling, mutate: cancelInbox } = useMutation({
    mutationFn: cancelInboxApi,
    onSuccess: () => {
      toast.success("Inbox successfully cancelled", { autoClose: 1000 });
      queryClient.invalidateQueries({ queryKey: ["inbox"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while cancelling inbox!");
    },
  });

  return { isCancelling, cancelInbox };
}
