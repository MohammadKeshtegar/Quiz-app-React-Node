import { useFilterSortQuizzes } from "./useFilterSortQuizzes";
import { useGetAllQuizzes } from "./useGetAllQuizzes";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

export default function QuizTable({ tableHeader, headerStyle, render }) {
  const { owner, category, sort } = useFilterSortQuizzes();
  const { isLoading, data } = useGetAllQuizzes(false, { owner, category, sort });

  if (isLoading)
    return (
      <div className="w-full h-full text-white absolute flex items-center justify-center">
        <Spinner />
      </div>
    );

  const { data: quizzes } = data;

  return quizzes.length > 0 ? (
    <Table>
      <Table.Header headerTitles={tableHeader} headerStyle={headerStyle} />

      <Table.Body data={quizzes} render={render} />

      <Table.Footer>
        <Table.Pagination itemsLength={quizzes.length} />
      </Table.Footer>
    </Table>
  ) : (
    <div className="flex items-center justify-center text-xl text-neutral-500">No quiz found! 😢</div>
  );
}
