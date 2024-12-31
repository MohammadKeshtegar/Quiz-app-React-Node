import { useLocation, useNavigate } from "react-router-dom";

import QuizQuestions from "../question/QuizQuestions";
import { useCreateQuiz } from "./useCreateQuiz";
import MiniSpinner from "../../ui/MiniSpinner";
import Button from "../../ui/Button";

function ConfirmCreateQuiz() {
  const { isCreating, createQuiz } = useCreateQuiz();

  const {
    state: { questions, questionIds, category, quizTime, questionNum },
  } = useLocation();
  const navigate = useNavigate();

  function handleCreateQuiz() {
    createQuiz({ questions: questionIds, category, quizTime, questionNum }, { onSuccess: () => navigate("/user/quiz") });
    localStorage.removeItem("questionIds");
    localStorage.removeItem("questions");
  }

  return (
    <div className="dark:text-white text-black w-full h-full py-20 px-24">
      <QuizQuestions questions={questions} />

      <div className="w-full mt-10">
        <Button styleType="fill" customeStyle="w-full uppercase justify-center" onClick={handleCreateQuiz} disable={isCreating}>
          {isCreating ? <MiniSpinner /> : "Create Quiz"}
        </Button>
      </div>
    </div>
  );
}

export default ConfirmCreateQuiz;
