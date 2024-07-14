import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { IoReload } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";

import Table from "../../ui/Table";
import ListIconButton from "../../ui/ListIconButton";
import { useSelector } from "react-redux";

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

  const isDoneQuiz = user.confirmedQuiz.some((el) => el.quizId === quiz._id);
  const isUserOwnQuiz = quiz.owner._id === user.id;

  function handleConfirmQuiz() {
    navigation(`/quiz/confirm-quiz/${quiz._id}`);
  }

  function handleSeeQuiz() {
    navigation(`/quiz/result/${quiz._id}`, { state: { quiz, quizResult } });
  }

  return (
    <Table.Row rowStyle={`p-2 ${check ? "grid-cols-8" : "grid-cols-6"}`}>
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
        <ListIconButton onClick={handleConfirmQuiz} disable={isUserOwnQuiz}>
          <MdOutlinePlaylistAddCheck />
        </ListIconButton>
      )}

      {!check && (
        <div className="flex justify-center">
          {isDoneQuiz ? <FaRegCircleCheck className="text-xl text-green-500" /> : <RxCrossCircled className="text-xl text-red-500" />}
        </div>
      )}
    </Table.Row>
  );
}

export default QuizListRow;
