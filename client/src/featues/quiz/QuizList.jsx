import { useState } from "react";

import { useGetAllCategories } from "../category/useGetAllCategories";
import { ITEMS_PER_PAGE, QuizFilterOptions } from "../../constant/constant";
import { QUIZ_HEADER_LIST } from "../../constant/constant";
import FooterPagination from "../../ui/FooterPagination";
import { useGetAllQuizzes } from "./useGetAllQuizzes";
import QuizFiltersOptions from "./QuizFiltersOptions";
import QuizListRow from "./QuizListRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

function QuizList() {
  const [owner, setOwner] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [filterBy, setFilterBy] = useState("All");

  const { isLoading, data } = useGetAllQuizzes();
  const { data: categoryData, isLoading: isFetchingCategories } = useGetAllCategories();

  if (isLoading || isFetchingCategories) return <Spinner />;
  const { data: fetchedQuizzes } = data;
  const { data: categories } = categoryData;

  categories.forEach((category) => {
    QuizFilterOptions.push(category.category);
  });

  const quizzesBasedOnOwner = fetchedQuizzes.slice().filter((quiz) => {
    if (owner) return quiz.owner.name.toLowerCase().includes(owner.toLowerCase());
    else return fetchedQuizzes;
  });

  const filteredQuizzes = quizzesBasedOnOwner.slice().filter((quiz) => {
    if (filterBy === "All") return fetchedQuizzes;
    else if (filterBy) return quiz.category === filterBy;
    else return fetchedQuizzes;
  });

  const quizzes = filteredQuizzes.slice().sort((a, b) => {
    if (sortBy === "time") return a.quizTime - b.quizTime;
    else if (sortBy === "questionNum") return a.questionNum - b.questionNum;
    else return fetchedQuizzes;
  });

  return (
    <>
      {fetchedQuizzes.length > 0 ? (
        <div className="w-full h-full p-5 flex flex-col gap-5">
          <QuizFiltersOptions setOwner={setOwner} setSortBy={setSortBy} setFilterBy={setFilterBy} />

          <div>
            {quizzes.length > 0 ? (
              <Table>
                <Table.Header headerTitles={QUIZ_HEADER_LIST} headerStyle="grid-cols-6" />

                <Table.Body data={quizzes} render={(quiz, i) => <QuizListRow key={i} quiz={quiz} index={i} />} />

                <Table.Footer>
                  <div>
                    <p className="text-lg">
                      Total quizzes: <span className="font-semibold">{quizzes.length}</span>
                    </p>
                  </div>

                  {quizzes.length > ITEMS_PER_PAGE && <FooterPagination />}
                </Table.Footer>
              </Table>
            ) : (
              <div className="text-center mt-48 text-xl dark:text-neutral-400 dark:bg-neutral-800 bg-neutral-400 rounded w-96 mx-auto py-10">
                No quiz found
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-neutral-600 text-3xl font-semibold">No quiz found!😢</div>
      )}
    </>
  );
}

export default QuizList;
