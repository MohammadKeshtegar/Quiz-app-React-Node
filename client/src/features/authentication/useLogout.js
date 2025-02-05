import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useChatStorage, useUserStorage } from "../../states/store";
import { logout as logoutApi } from "../../services/apiAuth";

export function useLogout() {
  const { setUserLogout } = useUserStorage();
  const { removeSelectedChatData } = useChatStorage();
  const navigate = useNavigate();

  const { isPending: isLoggingOut, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      setUserLogout();
      removeSelectedChatData();
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
