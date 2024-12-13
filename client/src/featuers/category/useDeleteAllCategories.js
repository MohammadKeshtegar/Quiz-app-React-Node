import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllCategories as deleteAllCategoriesApi } from "../../services/apiCategory";
import { toast } from "react-toastify";

export function useDeleteAllCategories() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteAllCategories } = useMutation({
    mutationFn: deleteAllCategoriesApi,
    onSuccess: () => {
      toast.success("Categories deleted successfully!", { autoClose: 1000 });
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while deleting categories!");
    },
  });

  return { isDeleting, deleteAllCategories };
}
