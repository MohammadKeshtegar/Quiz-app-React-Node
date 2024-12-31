import { useSelector } from "react-redux";

import { useGetConfirmedQuizzes } from "./useGetConfirmedQuizzes";
import { CONFIRMED_QUIZ_HEADER } from "../../constant/constant";
import ButtonLink from "../../ui/ButtonLink";
import QuizListRow from "./QuizListRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

function ConfirmedQuizzes() {
  const user = useSelector((state) => state.user);
  const { isLoading, data } = useGetConfirmedQuizzes(true);

  if (isLoading) return <Spinner />;
  const { data: quizzes } = data;

  return (
    <>
      {quizzes.length > 0 ? (
        <div className="w-full p-5 text-white">
          <Table>
            <Table.Header headerTitles={CONFIRMED_QUIZ_HEADER} headerStyle={"grid-cols-8"} />

            <Table.Body
              data={quizzes}
              render={(quiz, i) => <QuizListRow key={i} quiz={quiz} result={user.confirmedQuiz[i]} check={true} index={i} />}
              bodyStyle="border border-neutral-700/50"
            />

            <Table.Footer>
              <Table.Pagination itemsLength={quizzes.length} />
            </Table.Footer>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-xl text-neutral-400">You don't have any confirmed quiz</p>
          <p className="text-xl text-neutral-400">Start a quiz right now!</p>
          <ButtonLink url="/quiz/quiz-list" styleType="fill" customeStyle="mt-3 text-xl">
            Show quizzes
          </ButtonLink>
        </div>
      )}
    </>
  );
}

export default ConfirmedQuizzes;
