import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { updateUserData as updateUserDataApi } from "../../services/apiUser";
import { useUserStorage } from "../../states/store";

export function useUpdateUserData() {
  const queryClient = useQueryClient();
  const { setUpdateUser } = useUserStorage();

  const { isPending: isUpdating, mutate: updateUserData } = useMutation({
    mutationFn: updateUserDataApi,
    onSuccess: (data) => {
      toast.success("User data updated successfully!", { autoClose: 1000 });
      setUpdateUser(data.data);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while updating user data!");
    },
  });

  return { isUpdating, updateUserData };
}
