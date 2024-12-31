import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoReload } from "react-icons/io5";
import { useSelector } from "react-redux";
import { IoMdEye } from "react-icons/io";

import Table from "../../ui/Table";
import ListIconButton from "../../ui/ListIconButton";

function QuizListRow({ quiz, index, check = false, result }) {
  const user = useSelector((state) => state.user);
  const { points } = user;
  const navigation = useNavigate();
  const {
    category,
    questionNum,
    quizTime,
    owner: { name },
  } = quiz;

  let quizResult, totalPoint;
  if (check) {
    quizResult = result.quizResult;
    totalPoint = quizResult.reduce((acc, el) => (acc += el.score), 0);
  }

  function handleConfirmQuiz() {
    navigation(`/quiz/confirm-quiz/${quiz._id}`);
  }

  function handleSeeQuiz() {
    if (check) {
      navigation(`/quiz/result/${quiz._id}`, { state: { quiz, quizResult } });
    }
  }

  return (
    <Table.Row rowStyle={`p-2 ${check ? "grid-cols-8" : "grid-cols-6"}`}>
      {!check && <div>{index + 1}</div>}
      <div>{category}</div>
      <div>{questionNum}</div>
      <div>{quizTime}</div>
      <div>{name}</div>

      {check && <div>{totalPoint}</div>}
      {check && <div>{points}</div>}

      {check && (
        <ListIconButton onClick={handleSeeQuiz}>
          <IoMdEye />
        </ListIconButton>
      )}

      {check && (
        <ListIconButton onClick={handleConfirmQuiz}>
          <IoReload />
        </ListIconButton>
      )}

      {!check && (
        <ListIconButton onClick={handleConfirmQuiz}>
          <MdOutlinePlaylistAddCheck />
        </ListIconButton>
      )}
    </Table.Row>
  );
}

export default QuizListRow;
