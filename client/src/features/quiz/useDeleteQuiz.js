import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuiz as deleteQuizApi } from "../../services/apiQuiz";
import { toast } from "react-toastify";

export function useDeleteQuiz() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteQuiz } = useMutation({
    mutationFn: deleteQuizApi,
    onSuccess: () => {
      toast.success("Quiz deleted successfully", { autoClose: 1000 });
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while deleting quiz");
    },
  });

  return { isDeleting, deleteQuiz };
}
