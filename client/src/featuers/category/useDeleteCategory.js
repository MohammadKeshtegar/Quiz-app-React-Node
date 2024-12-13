import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory as deleteCategoryApi } from "../../services/apiCategory";
import { toast } from "react-toastify";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCategory } = useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      toast.success("Category deleted successfully!", { autoClose: 1000 });
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while deleting category!");
    },
  });

  return { isDeleting, deleteCategory };
}
