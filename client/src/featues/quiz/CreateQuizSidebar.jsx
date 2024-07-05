import ButtonLink from "../../ui/ButtonLink";
import { toast } from "react-toastify";
import CreateQuizSidebarQuestions from "./CreateQuizSidebarQuestions";

function CreateQuizSidebar({ setEditQuestion, setQuestionIndex, questions, quizTime, category, questionIndex }) {
  const linkDisable = questions.length < 3 || questions.length > 10;

  function handleClick(currentQuestion) {
    setEditQuestion(currentQuestion);
    setQuestionIndex(questions.indexOf(currentQuestion));
  }

  function disableClick() {
    if (linkDisable) {
      toast.error("You first need to create at least 3 question to create the quiz!", { autoClose: 2000 });
      return;
    }
  }

  return (
    <div className="w-[266px] min-h-full p-2 border-l border-blue-400 text-white flex flex-col gap-2">
      <p>
        Total time: <span className="text-blue-500">{`${quizTime === 0 ? 0 : `${quizTime % 60}s`}`}</span>
      </p>
      <p>
        Created questions: <span className="text-blue-500">{questions.length === 0 && "0"}</span>
      </p>

      <CreateQuizSidebarQuestions questionIndex={questionIndex} questions={questions} handleClick={handleClick} />

      <div className="mt-auto mb-1">
        <ButtonLink
          styleType="fill"
          customeStyle="w-full justify-center"
          disable={linkDisable}
          url={linkDisable ? "" : "/user/confirm-quiz"}
          state={{ questions, category, quizTime, questionNum: questions.length }}
          onClick={disableClick}
        >
          Create Quiz
        </ButtonLink>
      </div>
    </div>
  );
}

export default CreateQuizSidebar;
