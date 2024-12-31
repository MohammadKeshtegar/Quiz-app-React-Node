import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";

import { useGetAllCategories } from "../category/useGetAllCategories";
import { QUIZ_TABLE_HEADER } from "../../constant/constant";
import { useGetAllQuizzes } from "./useGetAllQuizzes";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import QuizRow from "./QuizRow";

function ManageQuiz() {
  const { isLoading, data } = useGetAllQuizzes();
  const { isLoading: isGettingCategories, data: categoryData } = useGetAllCategories();
  const { register, handleSubmit } = useForm();

  const sortItemList = [
    { value: "careted-ascending", text: "Created date (Ascending)" },
    { value: "careted-descending", text: "Created date (Descending)" },
    { value: "questions-asscending", text: "Questions (Asscending)" },
    { value: "questions-descending", text: "Questions (Descending)" },
    { value: "time-asscending", text: "Quiz time (Asscending)" },
    { value: "time-descending", text: "Quiz time (Descending)" },
  ];

  if (isLoading || isGettingCategories) return <Spinner />;
  const { data: quizzes } = data;
  const { data: categories } = categoryData;

  console.log(quizzes);

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="flex flex-col relative rounded overflow-hidden w-full p-3 text-white h-full">
      <Form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-between w-full mb-5">
        <div className="w-72">
          <input type="text" className="input-auth-style" placeholder="Search owner" />
        </div>

        <div className="flex items-center justify gap-2">
          <select name="category" id="category" className="select-input-style w-64">
            {sortItemList.map((sortItem) => (
              <option key={sortItem.value} value={sortItem.value}>
                {sortItem.text}
              </option>
            ))}
          </select>

          <select name="category" id="category" className="select-input-style">
            {categories.map((category) => (
              <option key={category.category} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
      </Form>

      {quizzes.length > 0 ? (
        <Table>
          <Table.Header headerTitles={QUIZ_TABLE_HEADER} headerStyle={"grid-cols-7"} />

          <Table.Body data={quizzes} render={(quiz, i) => <QuizRow key={quiz._id} quiz={quiz} index={i} />} />

          <Table.Footer>
            <Table.Pagination itemsLength={quizzes.length} />
          </Table.Footer>
        </Table>
      ) : (
        <div className="flex items-center justify-center text-xl text-neutral-500">No quiz found! 😢</div>
      )}
    </div>
  );
}

export default ManageQuiz;
