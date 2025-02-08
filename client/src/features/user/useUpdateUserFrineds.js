import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { updateUserFriends as updateUserFriendsApi } from "../../services/apiUser";
import { useUserStorage } from "../../states/store";

export function useUpdateUserFrineds(showMessage = false) {
  const queryClient = useQueryClient();
  const { setUpdateUserFriends } = useUserStorage();

  const { isPending: isUpdating, mutate: updateUserFriends } = useMutation({
    mutationFn: updateUserFriendsApi,
    onSuccess: (data) => {
      setUpdateUserFriends(data.data);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (showMessage) {
        toast.success("User data updated successfully!", { autoClose: 1000 });
      }
    },
    onError: (err) => {
      console.error(err);
      if (showMessage) {
        toast.error("Something went wrong while updating user data!");
      }
    },
  });

  return { isUpdating, updateUserFriends };
}
