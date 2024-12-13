import { useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";

import { useDeleteQuiz } from "./useDeleteQuiz";
import DeleteIcon from "../../ui/DeleteIcon";
import Table from "../../ui/Table";

function QuizRow({ quiz, index }) {
  const { isDeleting, deleteQuiz } = useDeleteQuiz();
  const navigate = useNavigate();

  function handleDelete() {
    deleteQuiz(quiz._id);
  }

  function handleCheck() {
    navigate(`/admin/observe-quiz/${quiz._id}`, { state: quiz._id });
  }

  return (
    <Table.Row rowStyle={"p-3 grid-cols-6"}>
      <div># {index + 1}</div>
      <div>{quiz.category}</div>
      <div>{quiz.quizTime} s</div>
      <div>{quiz.questionNum}</div>

      {quiz.owner.role === "user" && <DeleteIcon index={index + 1} handleDelete={handleDelete} isDeleting={isDeleting} />}

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
