import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuestion as updateQuestionApi } from "../../services/apiQuestion";
import { toast } from "react-toastify";

export function useUpdateQuestion() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateQuestion } = useMutation({
    mutationFn: updateQuestionApi,
    onSuccess: () => {
      toast.success("Question updated successfully!", { autoClose: 1000 });
      queryClient.invalidateQueries({ queryKey: ["question"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while updating the question!");
    },
  });

  return { isUpdating, updateQuestion };
}
