import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { login as loginApi } from "../../services/apiAuth";
import { useUserStorage } from "../../states/store";

export function useLogin() {
  const { setUserData } = useUserStorage();
  const navigate = useNavigate();

  const { isPending: isLoggingIn, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (data.status === "fail") {
        toast.error(data.message);
        console.error(data.message);
      } else {
        toast.success("You logged in successfully!", { autoClose: 1000 });
        setUserData(data.data);
        navigate("/");
      }
    },
    onError: (err) => {
      toast.error("Somwthing went wrong while logging in!");
      console.error(err);
    },
  });

  return { isLoggingIn, login };
}
