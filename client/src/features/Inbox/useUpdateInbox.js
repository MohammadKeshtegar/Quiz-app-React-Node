import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInbox as updateInboxApi } from "../../services/apiInbox";
import { toast } from "react-toastify";

export function useUpdateInbox() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateInbox } = useMutation({
    mutationFn: updateInboxApi,
    onSuccess: (data) => {
      toast.success("Mail update successfully");
      queryClient.invalidateQueries({ queryKey: ["inboxes", data.sender] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while updating the mail");
    },
  });

  return { isUpdating, updateInbox };
}
