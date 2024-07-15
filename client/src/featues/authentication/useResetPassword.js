import { useMutation } from "@tanstack/react-query";
import { resetPassowrd as resetPasswordApi } from "../../services/apiAuth";
import { toast } from "react-toastify";

export function useResetPassword() {
  const { isPending: isResetting, mutate: resetPassowrd } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success("You password reset successfully", { autoClose: 1000 });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while resetting your password!");
    },
  });

  return { isResetting, resetPassowrd };
}
