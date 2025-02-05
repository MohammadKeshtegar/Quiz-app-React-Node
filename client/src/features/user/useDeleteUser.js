import { useMutation } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "../../services/apiUser";
import { toast } from "react-toastify";

export function useDeleteUser() {
  const { isPending: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: (data) => {
      toast.success("User deleted successfully!", { autoClose: 1000 });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while deleting user!");
    },
  });

  return { isDeleting, deleteUser };
}
