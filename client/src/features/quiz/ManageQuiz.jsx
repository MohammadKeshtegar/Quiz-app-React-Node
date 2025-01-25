import { useGetAllCategories } from "../category/useGetAllCategories";
import { QUIZ_TABLE_HEADER } from "../../constant/constant";
import QuizFilterSort from "./QuizFilterSort";
import QuizTable from "./QuizTable";
import QuizRow from "./QuizRow";

function ManageQuiz() {
  const { isLoading, data: categoryData } = useGetAllCategories();

  if (isLoading) return;
  const { data: fetchedCategories } = categoryData;

  const categories = fetchedCategories.map((category) => category.category);
  categories.unshift("No-filter");

  return (
    <div className="flex flex-col relative rounded overflow-hidden w-full p-3 text-white h-full">
      <QuizFilterSort filtersData={categories} />
      <QuizTable tableHeader={QUIZ_TABLE_HEADER} headerStyle={"grid-cols-7"} render={(quiz, i) => <QuizRow key={quiz._id} quiz={quiz} index={i} />} />
    </div>
  );
}

export default ManageQuiz;
