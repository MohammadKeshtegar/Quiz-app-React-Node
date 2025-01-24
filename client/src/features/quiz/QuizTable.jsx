import { QUIZ_TABLE_HEADER } from "../../constant/constant";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import QuizRow from "./QuizRow";

import { useFilterSortQuizzes } from "./useFilterSortQuizzes";
import { useGetAllQuizzes } from "./useGetAllQuizzes";

export default function QuizTable() {
  const { owner, category, sort } = useFilterSortQuizzes();

  const { isLoading, data } = useGetAllQuizzes({ owner, category, sort });

  if (isLoading)
    return (
      <div className="w-full h-full text-white absolute flex items-center justify-center">
        <Spinner />
      </div>
    );

  const { data: quizzes } = data;
  console.log(quizzes);

  return quizzes.length > 0 ? (
    <Table>
      <Table.Header headerTitles={QUIZ_TABLE_HEADER} headerStyle={"grid-cols-7"} />

      <Table.Body data={quizzes} render={(quiz, i) => <QuizRow key={quiz._id} quiz={quiz} index={i} />} />

      <Table.Footer>
        <Table.Pagination itemsLength={quizzes.length} />
      </Table.Footer>
    </Table>
  ) : (
    <div className="flex items-center justify-center text-xl text-neutral-500">No quiz found! 😢</div>
  );
}
