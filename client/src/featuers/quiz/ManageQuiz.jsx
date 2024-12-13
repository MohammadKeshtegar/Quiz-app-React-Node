import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { QUIZ_TABLE_HEADER } from "../../constant/constant";
import PaginationButton from "../../ui/PaginationButton";
import { useGetAllQuizzes } from "./useGetAllQuizzes";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import QuizRow from "./QuizRow";

function ManageQuiz() {
  const { isLoading, data } = useGetAllQuizzes();

  if (isLoading) return <Spinner />;
  const { data: quizzes } = data;

  return (
    <div className="relative rounded overflow-hidden w-full p-3 text-white">
      {quizzes.length > 0 ? (
        <Table>
          <Table.Header headerTitles={QUIZ_TABLE_HEADER} headerStyle={"grid-cols-6"} />

          <Table.Body
            data={quizzes}
            render={(quiz, i) => <QuizRow key={quiz._id} quiz={quiz} index={i} />}
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
      ) : (
        <div className="flex items-center justify-center text-xl text-neutral-500">No quiz found! 😢</div>
      )}
    </div>
  );
}

export default ManageQuiz;
