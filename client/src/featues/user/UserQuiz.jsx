import { FaPlus } from "react-icons/fa";

import { ITEMS_PER_PAGE, USER_QUIZ_HEADER } from "../../constant/constant";
import FooterPagination from "../../ui/FooterPagination";
import { useGetUserQuiz } from "../quiz/useGetUserQuiz";
import ButtonLink from "../../ui/ButtonLink";
import Spinner from "../../ui/Spinner";
import QuizRow from "../quiz/QuizRow";
import Table from "../../ui/Table";

function UserQuiz() {
  const { isLoading, userQuizzes } = useGetUserQuiz();

  if (isLoading) return <Spinner />;
  const { data: quizzes } = userQuizzes;

  return (
    <div className="w-full p-3 text-white">
      {quizzes.length > 0 ? (
        <>
          <div className="my-3 w-full flex justify-end">
            <ButtonLink styleType="fill" url="/quiz/create" customeStyle="bg-blue-500 gap-2">
              Create quiz <FaPlus />
            </ButtonLink>
          </div>

          <Table columns={USER_QUIZ_HEADER.length}>
            <Table.Header headerTitles={USER_QUIZ_HEADER} headerStyle={"grid-cols-6"} />

            <Table.Body
              data={quizzes}
              render={(quiz, i) => <QuizRow key={quiz._id} quiz={quiz} index={i} />}
              bodyStyle="dark:border dark:border-neutral-700/50 border-y border-neutral-400"
            />
            <Table.Footer>
              <div>
                <p className="text-lg">
                  Total quizzes: <span className="font-semibold">{quizzes.length}</span>
                </p>
              </div>

              {quizzes.length > ITEMS_PER_PAGE && <FooterPagination />}
            </Table.Footer>
          </Table>
        </>
      ) : (
        <div className="p-3 rounded text-xl flex flex-col items-center justify-center gap-2">
          <p>You haven't created any quiz yet!</p>
          <ButtonLink styleType="fill" url="/quiz/create" customeStyle="flex items-center bg-blue-500 gap-2">
            Create quiz <FaPlus />
          </ButtonLink>
        </div>
      )}
    </div>
  );
}

export default UserQuiz;
