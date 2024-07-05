import { NavLink } from "react-router-dom";

function CreateQuizSidebarQuestions({ questions, questionIndex, handleClick }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {questions.map((currentQuestion, i) => (
        <NavLink
          key={i}
          className={`text-white flex justify-between items-center rounded overflow-hidden group ${
            i === questionIndex ? "ring ring-blue-400 transition-all" : ""
          }`}
          onClick={() => handleClick(currentQuestion)}
        >
          <span className="py-1 px-2 bg-blue-500 w-full h-full flex items-center justify-center group-hover:bg-blue-400 transition-all">{i + 1}</span>
          <span className="py-1 px-2 bg-blue-600 w-full h-full flex items-center justify-center group-hover:bg-blue-500 transition-all">
            {currentQuestion?.correctAnswer ? +currentQuestion.correctAnswer : "_"}
          </span>
        </NavLink>
      ))}
    </div>
  );
}

export default CreateQuizSidebarQuestions;
