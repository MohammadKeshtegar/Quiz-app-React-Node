import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { userQuizResult as userQuizResultApi } from "../../services/apiUser";
import { setUserConfirmedQuiz } from "../../redux/slices/userSlice";

export function useQuizResult() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { isPending: isLoading, mutate: userQuizResult } = useMutation({
    mutationFn: userQuizResultApi,
    onSuccess: (data) => {
      dispatch(setUserConfirmedQuiz(data.data));
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong while adding your quiz result!");
    },
  });

  return { isLoading, userQuizResult };
}
