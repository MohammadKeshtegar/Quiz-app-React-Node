import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { userQuizResult as userQuizResultApi } from "../../services/apiUser";
import { useUserStorage } from "../../states/store";

export function useQuizResult() {
  const queryClient = useQueryClient();
  const { setUserConfirmedQuiz } = useUserStorage();

  const { isPending: isLoading, mutate: userQuizResult } = useMutation({
    mutationFn: userQuizResultApi,
    onSuccess: (data) => {
      setUserConfirmedQuiz(data.data);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while adding your quiz result!");
    },
  });

  return { isLoading, userQuizResult };
}
