import ConfirmQuizOption from "./ConfirmQuizOption";
import QuizTime from "./QuizTime";

function ConfirmQuizQuestionComponent({
  setIsFinished,
  questionIndex,
  correctAnswer,
  handleAnswer,
  isFinished,
  questions,
  question,
  quizTime,
  options,
  answer,
}) {
  return (
    <div className="w-[900px]">
      <div className="flex justify-between mb-3">
        <p className="text-lg text-neutral-400">
          {questionIndex + 1} / {questions.length}
        </p>
        <QuizTime setIsFinished={setIsFinished} time={quizTime} />
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

export default ConfirmQuizQuestionComponent;
