import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserLogout } from "../../redux/slices/userSlice";

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isPending: isLoggingOut, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      dispatch(setUserLogout());
      toast.success("You successfully logged out!", { autoClose: 1000 });
      navigate("/");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while logging out!");
    },
  });

  return { isLoggingOut, logout };
}
