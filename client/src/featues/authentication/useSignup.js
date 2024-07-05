import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/slices/userSlice";

export function useSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isPending: isSignUpgIn, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      toast.success("You signed up successfully!", { autoClose: 1000 });
      dispatch(setUserData(data.data));
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });

  return { isSignUpgIn, signup };
}
