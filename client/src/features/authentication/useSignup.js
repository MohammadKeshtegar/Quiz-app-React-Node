import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { signup as signupApi } from "../../services/apiAuth";
import { useUserStorage } from "../../states/store";

export function useSignup() {
  const navigate = useNavigate();
  const { setUserLogout } = useUserStorage();

  const { isPending: isSignUpgIn, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      toast.success("You signed up successfully!", { autoClose: 1000 });
      setUserLogout(data.data);
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });

  return { isSignUpgIn, signup };
}
