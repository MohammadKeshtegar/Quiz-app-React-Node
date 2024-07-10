import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { sendInbox as sendInboxApi } from "../../services/apiInbox";
import { setUserUpdate } from "../../redux/slices/userSlice";

export function useCreateInbox() {
  const dispatch = useDispatch();

  const { isPending: isCreating, mutate: sendInbox } = useMutation({
    mutationFn: sendInboxApi,
    onSuccess: (data) => {
      dispatch(setUserUpdate(data.data));
      toast.success("Message successfully sent!", { autoClose: 1000 });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while sending message!");
    },
  });

  return { isCreating, sendInbox };
}
