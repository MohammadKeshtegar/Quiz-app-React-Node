import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ConfirmQuizQuestionComponent from "./ConfirmQuizQuestionComponent";
import { useQuizResult } from "./useQuizResult";
import Spinner from "../../ui/Spinner";

function ConfirmQuizQestion({ quiz, questionIndex, questionObject, setQuizResult, setQuestionIndex, quizResult, again = false }) {
  const [answer, setAnswer] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();
  const { question, options, correctAnswer, score } = questionObject;
  const { isLoading, userQuizResult } = useQuizResult();

  useEffect(
    function () {
      setTimeout(() => {
        const numQuestions = quiz.questions.length;
        if (answer) {
          if (!isFinished && questionIndex < numQuestions - 1) {
            setQuestionIndex((index) => index + 1);
            setAnswer(null);
          } else if (questionIndex === numQuestions - 1) {
            const totalPoint = quiz.questions.reduce((acc, question, i) => {
              if (question.correctAnswer === quizResult[i].optionIndex) acc += quizResult[i].score;
              return acc;
            }, 0);

            if (again) {
              navigate(`/quiz/result/${quiz._id}`, { state: { quiz, quizResult, totalPoint }, replace: true });
            } else {
              userQuizResult({ quizId: quiz._id, quizResult, totalPoint });
              navigate(`/quiz/result/${quiz._id}`, { state: { quiz, quizResult }, replace: true });
            }
          }
        } else if (isFinished) {
          if (questionIndex < numQuestions - 1) {
            for (let i = 0; i < numQuestions - questionIndex; i++) {
              quizResult.push({});
            }
          }

          const totalPoint = quiz.questions.reduce((acc, question, i) => {
            if (question.correctAnswer === quizResult[i].optionIndex) acc += quizResult[i].score;
            return acc;
          }, 0);

          if (again) {
            navigate(`/quiz/result/${quiz._id}`, { state: { quiz, quizResult, totalPoint }, replace: true });
          } else {
            userQuizResult({ quizId: quiz._id, quizResult, totalPoint });
            navigate(`/quiz/result/${quiz._id}`, { state: { quiz, quizResult }, replace: true });
          }
        }
      }, 1500);
    },
    [
      quiz.questions.length,
      setQuestionIndex,
      userQuizResult,
      setQuizResult,
      questionIndex,
      quizResult,
      isFinished,
      navigate,
      quiz._id,
      answer,
      again,
      quiz,
    ]
  );

  function handleAnswer(optionIndex) {
    if (!answer) {
      setAnswer(optionIndex);
      setQuizResult((prevResult) => [...prevResult, { questionIndex, optionIndex, correctAnswer, score }]);
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <ConfirmQuizQuestionComponent
      questionIndex={questionIndex}
      correctAnswer={correctAnswer}
      setIsFinished={setIsFinished}
      handleAnswer={handleAnswer}
      questions={quiz.questions}
      quizTime={quiz.quizTime}
      isFinished={isFinished}
      question={question}
      options={options}
      answer={answer}
    />
  );
}

export default ConfirmQuizQestion;
