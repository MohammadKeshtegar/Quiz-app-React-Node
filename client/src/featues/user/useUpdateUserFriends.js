import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserFriends } from "../../services/apiUser";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserFriends } from "../../redux/slices/userSlice";

export function useUpdateUserFriends(userId) {
  const queyrClient = useQueryClient();
  const dispatch = useDispatch();

  const { isPending: isAccepting, mutate: updateFriends } = useMutation({
    mutationFn: updateUserFriends,
    onSuccess: (data) => {
      toast.success("Request successfully accepted!", { autoClose: 1000 });
      dispatch(setUserFriends(data.data));
      queyrClient.invalidateQueries({ queryKey: ["user", userId] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while accepting the request!");
    },
  });

  return { isAccepting, updateFriends };
}
