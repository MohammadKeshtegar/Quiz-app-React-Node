import { useEffect, useState } from "react";

import ConfirmQuizOption from "./ConfirmQuizOption";
import QuizTime from "./QuizTime";
import { useNavigate } from "react-router-dom";
import { useQuizResult } from "./useQuizResult";
import Spinner from "../../ui/Spinner";

function ConfirmQuizQestion({ quiz, questionIndex, questionObject, setQuizResult, setQuestionIndex, quizResult }) {
  const [isFinished, setIsFinished] = useState(false);
  const [answer, setAnswer] = useState(null);
  const navigate = useNavigate();

  const { question, options, correctAnswer, score } = questionObject;
  const { isLoading, userQuizResult } = useQuizResult();

  useEffect(
    function () {
      setTimeout(() => {
        const numQuestions = quiz.questions.length;
        if (answer) {
          // Go to next question if the quiz time hasn't finished yet and hasn't reach tha last question
          if (!isFinished && questionIndex < numQuestions - 1) {
            setQuestionIndex((index) => index + 1);
            setAnswer(null);
            // Reaching the last question
          } else if (questionIndex === numQuestions - 1) {
            // Calculate the total points that user gets from thie quiz
            const totalPoint = quiz.questions.reduce((acc, question, i) => {
              if (question.correctAnswer === quizResult[i].optionIndex) acc += quizResult[i].score;
              return acc;
            }, 0);
            userQuizResult({ quizId: quiz._id, quizResult, totalPoint });
            navigate(`/quiz/result/${quiz._id}`, { state: { quiz, quizResult }, replace: true });
          }
          // If the quiz time finished
        } else if (isFinished) {
          // Just in case that user didn't answer all the questions
          if (questionIndex < numQuestions - 1) {
            for (let i = 0; i < numQuestions - questionIndex; i++) {
              quizResult.push({});
            }
          }

          // Calculate the total points that user gets from thie quiz
          const totalPoint = quiz.questions.reduce((acc, question, i) => {
            if (question.correctAnswer === quizResult[i].optionIndex) acc += quizResult[i].score;
            return acc;
          }, 0);
          userQuizResult({ quizId: quiz._id, quizResult, totalPoint });
          navigate(`/quiz/result/${quiz._id}`, { state: { quiz, quizResult }, replace: true });
        }
      }, 1500);
    },
    [
      quiz.questions.length,
      setQuestionIndex,
      userQuizResult,
      questionIndex,
      setQuizResult,
      quizResult,
      isFinished,
      quiz._id,
      navigate,
      answer,
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
    <div className="w-[900px]">
      <div className="flex justify-between mb-3">
        <p className="text-lg text-neutral-400">
          {questionIndex + 1} / {quiz.questions.length}
        </p>
        <QuizTime setIsFinished={setIsFinished} time={quiz.quizTime} />
      </div>
      <div className="bg-neutral-800 rounded-md border overflow-hidden border-neutral-600 relative">
        {isFinished && (
          <div className="w-full h-full bg-neutral-800/70 absolute transition-all">
            <p className="text-red-600 font-bold text-4xl text-center pt-40">Time's up!</p>
          </div>
        )}

        <p className="bg-neutral-800 p-7 text-white text-xl font-semibold capitalize">
          {questionIndex + 1}. {question}
        </p>

        <div className="bg-neutral-900 px-7 py-10 flex flex-col gap-3">
          {Object.values(options).map((option, i) => (
            <ConfirmQuizOption
              key={i}
              answer={answer}
              correctAnswer={correctAnswer}
              onClick={() => handleAnswer(i + 1)}
              option={option}
              index={i + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ConfirmQuizQestion;
