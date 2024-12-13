import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory as createCategoryApi } from "../../services/apiCategory";
import { toast } from "react-toastify";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createCategory } = useMutation({
    mutationFn: createCategoryApi,
    onSuccess: () => {
      toast.success("Category created successfully!");
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("An error occurred while creating the category!");
    },
  });

  return { isCreating, createCategory };
}
