import { useGetAllCategories } from "../category/useGetAllCategories";
import QuizFilterSort from "./QuizFilterSort";
import QuizTable from "./QuizTable";

function ManageQuiz() {
  const { isLoading, data: categoryData } = useGetAllCategories();

  if (isLoading) return;
  const { data: fetchedCategories } = categoryData;

  const categories = fetchedCategories.map((category) => category.category);
  categories.unshift("No-filter");

  return (
    <div className="flex flex-col relative rounded overflow-hidden w-full p-3 text-white h-full">
      <QuizFilterSort categories={categories} />
      <QuizTable />
    </div>
  );
}

export default ManageQuiz;
