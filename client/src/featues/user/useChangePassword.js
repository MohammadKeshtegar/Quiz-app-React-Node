import { useMutation } from "@tanstack/react-query";
import { changeUserPassword as changeUserPasswordApi } from "../../services/apiAuth";
import { toast } from "react-toastify";

export function useChangePassword() {
  const { isPending: isChanging, mutate: changePassword } = useMutation({
    mutationFn: changeUserPasswordApi,
    onSuccess: () => {
      toast.success("Your password changed successfully!", { autoClose: 1000 });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while changing your password!");
    },
  });

  return { isChanging, changePassword };
}
