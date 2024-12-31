import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuiz as updateQuizApi } from "../../services/apiQuiz";
import { toast } from "react-toastify";

export function useUpdateQuiz() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateQuiz } = useMutation({
    mutationFn: updateQuizApi,
    onSuccess: () => {
      toast.success("Quiz updated successfully!", { autoClose: 1000 });
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while updating quiz!");
    },
  });

  return { isUpdating, updateQuiz };
}
