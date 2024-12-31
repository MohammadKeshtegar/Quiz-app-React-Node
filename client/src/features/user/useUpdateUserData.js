import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData as updateUserDataApi } from "../../services/apiUser";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserUpdate } from "../../redux/slices/userSlice";

export function useUpdateUserData() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { isPending: isUpdating, mutate: updateUserData } = useMutation({
    mutationFn: updateUserDataApi,
    onSuccess: (data) => {
      toast.success("User data updated successfully!", { autoClose: 1000 });
      dispatch(setUserUpdate(data.data));
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while updating user data!");
    },
  });

  return { isUpdating, updateUserData };
}
