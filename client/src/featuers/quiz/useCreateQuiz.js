import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuiz as createQuizApi } from "../../services/apiQuiz";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useCreateQuiz() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createQuiz } = useMutation({
    mutationFn: createQuizApi,
    onSuccess: () => {
      toast.success("Quiz created successfully!", { autoClose: 1500 });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/user/quiz");
    },

    onError: (err) => {
      console.error(err);
      toast.error("An error occurred while creating quiz!");
    },
  });

  return { isCreating, createQuiz };
}
