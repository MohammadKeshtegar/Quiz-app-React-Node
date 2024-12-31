import { useEffect, useState } from "react";

import ConfirmQuizQestion from "./ConfirmQuizQestion";
import { useGetQuiz } from "./useGetQuiz";
import Spinner from "../../ui/Spinner";
import Ready from "../../pages/Ready";

function ConfirmQuiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [quizResult, setQuizResult] = useState([]);
  const [start, setStart] = useState(false);
  const { isLoading, data } = useGetQuiz();

  useEffect(
    function () {
      if (data && !isLoading) {
        setQuestion(data.data.questions[questionIndex]);
      }
    },
    [data, questionIndex, isLoading]
  );

  if (isLoading || !question) return <Spinner />;
  const { data: quiz } = data;

  return (
    <div className="h-full w-full p-3 flex flex-col gap-3 justify-center items-center">
      {!start ? (
        <Ready onClick={setStart} />
      ) : (
        <div className={`flex items-center gap-10 ${start ? "come-from-up-animation" : ""}`}>
          <ConfirmQuizQestion
            questionObject={question}
            quiz={quiz}
            questionIndex={questionIndex}
            setQuizResult={setQuizResult}
            setQuestionIndex={setQuestionIndex}
            quizResult={quizResult}
          />
        </div>
      )}
    </div>
  );
}

export default ConfirmQuiz;
