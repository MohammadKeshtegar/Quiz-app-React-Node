import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../services/apiAuth";
import { toast } from "react-toastify";

export function useForgotPassword() {
  const { isPending: isSending, mutate: sendEmail } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Email successfully sent to your email address");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while sending email!");
    },
  });

  return { isSending, sendEmail };
}
