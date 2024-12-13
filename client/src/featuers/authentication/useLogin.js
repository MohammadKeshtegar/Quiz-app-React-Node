import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { login as loginApi } from "../../services/apiAuth";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/slices/userSlice";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isPending: isLoggingIn, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (data.status === "fail") {
        toast.error(data.message);
        console.error(data.message);
      } else {
        toast.success("You logged in successfully!", { autoClose: 1000 });
        dispatch(setUserData(data.data));
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
