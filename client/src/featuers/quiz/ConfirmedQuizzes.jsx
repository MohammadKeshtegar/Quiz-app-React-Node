import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";

import { useGetConfirmedQuizzes } from "./useGetConfirmedQuizzes";
import { CONFIRMED_QUIZ_HEADER } from "../../constant/constant";
import ButtonLink from "../../ui/ButtonLink";
import QuizListRow from "./QuizListRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import PaginationButton from "../../ui/PaginationButton";

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
              <div>
                <p className="text-lg">
                  Total quizzes: <span className="font-semibold">{quizzes.length}</span>
                </p>
              </div>

              <div className="border-2 rounded flex items-center">
                <PaginationButton>
                  <FaChevronLeft />
                </PaginationButton>

                <div className="border-x-2 px-4 py-1 bg-neutral-600">0</div>

                <PaginationButton>
                  <FaChevronRight />
                </PaginationButton>
              </div>
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
