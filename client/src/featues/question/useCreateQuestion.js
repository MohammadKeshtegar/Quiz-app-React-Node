import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestion as createQuestionApi } from "../../services/apiQuestion";
import { toast } from "react-toastify";

export function useCreateQuestion() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createQuestion } = useMutation({
    mutationFn: createQuestionApi,
    onSuccess: () => {
      toast.success("Question created successfully!", { autoClose: 1500 });
      queryClient.invalidateQueries({ queryKey: ["question"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while creating the question!");
    },
  });

  return { isCreating, createQuestion };
}
