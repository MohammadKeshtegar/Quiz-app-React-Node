import { useGetAllCategories } from "../category/useGetAllCategories";
import { QUIZ_HEADER_LIST } from "../../constant/constant";
import { useGetAllQuizzes } from "./useGetAllQuizzes";
import QuizFilterSort from "./QuizFilterSort";
import QuizListRow from "./QuizListRow";
import Spinner from "../../ui/Spinner";
import QuizTable from "./QuizTable";

function QuizList() {
  const { isLoading, data } = useGetAllQuizzes();
  const { data: categoryData, isLoading: isFetchingCategories } = useGetAllCategories();

  if (isLoading || isFetchingCategories) return <Spinner />;
  const { data: quizzes } = data;
  const { data: fetchedCategories } = categoryData;

  const categories = fetchedCategories.map((category) => category.category);
  categories.unshift("No-filter");

  return (
    <>
      {quizzes.length > 0 ? (
        <div className="w-full h-full p-5 flex flex-col gap-5">
          <QuizFilterSort filtersData={categories} />
          <QuizTable tableHeader={QUIZ_HEADER_LIST} headerStyle={"grid-cols-6"} render={(quiz, i) => <QuizListRow key={i} quiz={quiz} index={i} />} />
        </div>
      ) : (
        <div className="text-neutral-600 text-3xl font-semibold">No quiz found!😢</div>
      )}
    </>
  );
}

export default QuizList;
