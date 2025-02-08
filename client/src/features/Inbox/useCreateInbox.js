import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInbox } from "../../services/apiInbox";
import { toast } from "react-toastify";

export function useCreateInbox() {
  const queryClient = useQueryClient();
  const { isPending: isSending, mutate: sendMail } = useMutation({
    mutationFn: createInbox,
    onSuccess: (data) => {
      toast.success("Mail sent successfully", { autoClose: 1500 });
      queryClient.invalidateQueries({ queryKey: ["inboxes", data.reciever] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while sending the mail");
    },
  });

  return { isSending, sendMail };
}
