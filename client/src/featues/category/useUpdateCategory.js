import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory as updateCategoryApi } from "../../services/apiCategory";
import { toast } from "react-toastify";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateCategory } = useMutation({
    mutationFn: updateCategoryApi,
    onSuccess: () => {
      toast.success("Category updated successfully!", { autoClose: 1000 });
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while updating category!");
    },
  });

  return { isUpdating, updateCategory };
}
