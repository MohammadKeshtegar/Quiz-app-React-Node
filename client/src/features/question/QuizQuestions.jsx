import { IoMdArrowDropupCircle } from "react-icons/io";
import { useState } from "react";

import BackButton from "../../ui/BackButton";
import Question from "./Question";

function QuizQuestions({ questions, quizResult = null }) {
  const [windowHeightOffset, setWindowHeightOffset] = useState();

  function handleHeight() {
    setWindowHeightOffset(0);
    // document.documentElement.scrollTop = 0;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  window.onscroll = () => {
    setWindowHeightOffset(window.scrollY);
  };

  return (
    <>
      <BackButton />

      <div className="flex flex-col gap-20">
        {questions.map((question, i) => (
          <Question key={i} question={question} index={i + 1} />
        ))}
      </div>

      <div className={`fixed right-6 ${windowHeightOffset > 500 ? "bottom-6" : "-bottom-full"} transition-all`}>
        <IoMdArrowDropupCircle className={`text-5xl text-blue-500 hover:text-blue-400 transition-all cursor-pointer`} onClick={handleHeight} />
      </div>
    </>
  );
}

export default QuizQuestions;
