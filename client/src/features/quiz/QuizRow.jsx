import { useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";

import DeleteIconButton from "../../ui/DeleteIconButton";
import { useUserStorage } from "../../states/store";
import { useDeleteQuiz } from "./useDeleteQuiz";
import Table from "../../ui/Table";

function QuizRow({ quiz, index }) {
  const { isDeleting, deleteQuiz } = useDeleteQuiz();
  const navigate = useNavigate();
  const { user } = useUserStorage();

  function handleDelete() {
    deleteQuiz(quiz._id);
  }

  function handleCheck() {
    if (user.role === "admin") {
      navigate(`/admin/observe-quiz/${quiz._id}`, { state: quiz._id });
    } else {
      navigate(`/user/observe-quiz/${quiz._id}`, { state: quiz._id });
    }
  }

  return (
    <Table.Row rowStyle={"p-3 grid-cols-7"}>
      <div>{index + 1}</div>
      <div>{quiz.category}</div>
      {/* The quiz of the deleted user must be deleted as well after all the users that was confirming the quizzes which their owner is this user */}
      <div>{quiz.owner?.name}</div>
      <div>{quiz.questionNum}</div>
      <div>{quiz.quizTime} s</div>

      {quiz.owner.role === "user" && <DeleteIconButton index={index + 1} handleDelete={handleDelete} isDeleting={isDeleting} />}

      <div className="flex justify-center">
        <IoMdEye
          className="text-blue-500 hover:text-blue-400 text-2xl border border-blue-500 hover:border-blue-400 rounded transition-all p-1 cursor-pointer"
          onClick={handleCheck}
        />
      </div>
    </Table.Row>
  );
}

export default QuizRow;
