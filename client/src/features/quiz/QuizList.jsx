import { useGetAllCategories } from "../category/useGetAllCategories";
import { QUIZ_HEADER_LIST } from "../../constant/constant";
import { useGetAllQuizzes } from "./useGetAllQuizzes";
import SelectOption from "../../ui/SelectOption";
import SelectInput from "../../ui/SelectInput";
import QuizListRow from "./QuizListRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

function QuizList() {
  const QuizFilterOptions = [];
  const QuizSortOptions = [
    { value: "quizTime", text: "Time" },
    { value: "questionNum", text: "Question numbers" },
  ];

  const { isLoading, data } = useGetAllQuizzes();
  const { data: categoryData, isLoading: isFetchingCategories } = useGetAllCategories();

  if (isLoading || isFetchingCategories) return <Spinner />;
  const { data: quizzes } = data;
  const { data: categories } = categoryData;

  categories.forEach((category) => {
    QuizFilterOptions.push(category.category);
  });

  return (
    <>
      {quizzes.length > 0 ? (
        <div className="w-full h-full p-5 flex flex-col gap-5">
          <div className="flex items-center gap-7 self-end">
            <div>
              <input type="text" placeholder="Enter owner name" className="input-auth-style" />
            </div>

            <div>
              <span className="dark:text-white text-black">Sort by: </span>
              <SelectInput
                data={QuizSortOptions}
                render={(option, i) => <SelectOption key={i} value={option.value} text={option.text} />}
              />
            </div>

            <div>
              <span className="dark:text-white text-black">Filter by: </span>
              <SelectInput data={QuizFilterOptions} render={(option, i) => <SelectOption key={i} value={option} text={option} />} />
            </div>
          </div>

          <div>
            <Table>
              <Table.Header headerTitles={QUIZ_HEADER_LIST} headerStyle="grid-cols-6" />

              <Table.Body
                data={quizzes}
                render={(quiz, i) => <QuizListRow key={i} quiz={quiz} index={i} />}
                bodyStyle="border border-neutral-700/50"
              />

              <Table.Footer>
                <Table.Pagination itemsLength={quizzes.length} />
              </Table.Footer>
            </Table>
          </div>
        </div>
      ) : (
        <div className="text-neutral-600 text-3xl font-semibold">No quiz found!😢</div>
      )}
    </>
  );
}

export default QuizList;
