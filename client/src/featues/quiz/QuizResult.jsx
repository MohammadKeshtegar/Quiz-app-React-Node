import { useLocation } from "react-router-dom";
import Question from "../question/Question";
import ButtonLink from "../../ui/ButtonLink";

function QuizResult() {
  const { state } = useLocation();
  const { quiz, quizResult } = state;

  const totalPoint = quiz.questions.reduce((acc, question, i) => {
    if (question.correctAnswer === quizResult[i].optionIndex) acc += quizResult[i].score;
    return acc;
  }, 0);

  function nothing() {}

  return (
    <div className="w-full py-20 px-32">
      <p className="text-center text-neutral-200 text-2xl font-semibold mb-10">Your point: {totalPoint}!</p>

      <div className="flex flex-col gap-16 text-white">
        {quiz.questions.map((question, i) => (
          <Question
            key={i}
            review={true}
            onClick={nothing}
            answer={quizResult[i].optionIndex}
            correctAnswer={question.correctAnswer}
            question={question}
            quizResult={quizResult}
            index={i + 1}
          />
        ))}
      </div>

      <div>
        <ButtonLink url="/user/confirmed-quizzes" styleType="fill" customeStyle="flex justify-center mt-10">
          Next
        </ButtonLink>
      </div>
    </div>
  );
}

export default QuizResult;
