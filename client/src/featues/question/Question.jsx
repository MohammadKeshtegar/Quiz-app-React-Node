import { TbRectangleVerticalFilled } from "react-icons/tb";
import { TbRectangleVertical } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";

import ConfirmQuizOption from "../quiz/ConfirmQuizOption";
import NoramalOption from "./NoramalOption";
import { questionDifficulty } from "../../utils/questionDifficulty";

function Question({ question, index, review = false, onClick, answer, correctAnswer }) {
  const questionDiff = questionDifficulty(question);

  return (
    <div key={question.question} className="bg-neutral-800/30 rounded shadow-md border-t-4 border-blue-600">
      <div className="bg-neutral-700 flex items-center justify-between">
        <p className="text-lg font-semibold p-4">
          {index}. {question.question}
        </p>

        <div className="flex bg-neutral-800 h-full p-5">
          {Array.from({ length: 3 }).map((_, i) => {
            if (i + 1 <= questionDiff) return <TbRectangleVerticalFilled key={i} className="text-xl text-blue-600" />;
            else return <TbRectangleVertical key={i} className="text-xl text-blue-600" />;
          })}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3 mt-4">
        {Object.values(question.options).map((option, i) => {
          if (!review) return <NoramalOption key={i} option={option} correctAnswer={question.correctAnswer} index={i + 1} />;
          else
            return (
              <div className="flex w-full items-center gap-3">
                {!answer && i + 1 === correctAnswer && <FaCheck className="text-green-500 ml-2" />}
                <ConfirmQuizOption key={i} onClick={onClick} option={option} correctAnswer={correctAnswer} index={i + 1} answer={answer} />
              </div>
            );
        })}
      </div>
    </div>
  );
}

export default Question;
