import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuestion as deleteQuestionApi } from "../../services/apiQuestion";
import { toast } from "react-toastify";

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteQuestion } = useMutation({
    mutationFn: deleteQuestionApi,
    onSuccess: () => {
      toast.success("Question successfully deleted!", { autoClose: 1000 });
      queryClient.invalidateQueries({ queryKey: ["question"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while deleting question!");
    },
  });

  return { isDeleting, deleteQuestion };
}
