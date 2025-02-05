import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoReload } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";

import ListIconButton from "../../ui/ListIconButton";
import Table from "../../ui/Table";
import { useUserStorage } from "../../states/store";

function QuizListRow({ quiz, index, isConfirmed = false, result }) {
  const { user } = useUserStorage();
  const { points } = user;
  const navigation = useNavigate();
  const {
    category,
    questionNum,
    quizTime,
    owner: { name },
  } = quiz;

  let quizResult, totalPoint;
  if (isConfirmed) {
    quizResult = result.quizResult;
    totalPoint = quizResult.reduce((acc, el) => (acc += el.score), 0);
  }

  function handleConfirmQuiz() {
    navigation(`/quiz/confirm-quiz/${quiz._id}`);
  }

  function handleSeeQuiz() {
    if (isConfirmed) {
      navigation(`/quiz/result/${quiz._id}`, { state: { quiz, quizResult } });
    }
  }

  return (
    <Table.Row rowStyle={`p-2 ${isConfirmed ? "grid-cols-8" : "grid-cols-6"}`}>
      {!isConfirmed && <div>{index + 1}</div>}
      <div>{category}</div>
      <div>{questionNum}</div>
      <div>{quizTime}</div>
      <div>{name}</div>

      {isConfirmed && <div>{totalPoint}</div>}
      {isConfirmed && <div>{points}</div>}

      {isConfirmed && (
        <ListIconButton onClick={handleSeeQuiz}>
          <IoMdEye />
        </ListIconButton>
      )}

      {isConfirmed && (
        <ListIconButton onClick={handleConfirmQuiz}>
          <IoReload />
        </ListIconButton>
      )}

      {!isConfirmed && (
        <ListIconButton onClick={handleConfirmQuiz}>
          <MdOutlinePlaylistAddCheck />
        </ListIconButton>
      )}
    </Table.Row>
  );
}

export default QuizListRow;
