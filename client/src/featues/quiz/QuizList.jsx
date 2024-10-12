import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { useGetAllCategories } from "../category/useGetAllCategories";
import { QUIZ_HEADER_LIST } from "../../constant/constant";
import PaginationButton from "../../ui/PaginationButton";
import { useGetAllQuizzes } from "./useGetAllQuizzes";
import SelectOption from "../../ui/SelectOption";
import SelectInput from "../../ui/SelectInput";
import QuizListRow from "./QuizListRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useState } from "react";

function QuizList() {
  const [owner, setOwner] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [filterBy, setFilterBy] = useState("All");

  const QuizFilterOptions = ["All"];
  const QuizSortOptions = [
    { value: "time", text: "Quiz Time" },
    { value: "questionNum", text: "Question numbers" },
  ];

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
        <div className="w-full h-full p-5 text-white flex flex-col gap-5">
          <div className="flex items-center gap-7 self-end">
            <div>
              <input type="text" placeholder="Enter owner name" className="input-auth-style" onChange={(e) => setOwner(e.target.value)} />
            </div>

            <div>
              Sort by:{" "}
              <SelectInput
                onChange={(e) => setSortBy(e.target.value)}
                data={QuizSortOptions}
                render={(option, i) => <SelectOption key={i} value={option.value} text={option.text} />}
              />
            </div>

            <div>
              Filter by:{" "}
              <SelectInput
                onChange={(e) => setFilterBy(e.target.value)}
                data={QuizFilterOptions}
                render={(option, i) => <SelectOption key={i} value={option} text={option} />}
              />
            </div>
          </div>

          <div>
            {quizzes.length > 0 ? (
              <Table>
                <Table.Header headerTitles={QUIZ_HEADER_LIST} headerStyle="grid-cols-6" />

                <Table.Body
                  data={quizzes}
                  render={(quiz, i) => <QuizListRow key={i} quiz={quiz} index={i} />}
                  bodyStyle="border border-neutral-700/50"
                />

                <Table.Footer>
                  <div>
                    <p className="text-lg">
                      Total quizzes: <span className="font-semibold">{quizzes.length}</span>
                    </p>
                  </div>

                  {quizzes.length > 10 && (
                    <div className="border-2 rounded flex items-center">
                      <PaginationButton>
                        <FaChevronLeft />
                      </PaginationButton>

                      <div className="border-x-2 px-4 py-1 dark:bg-neutral-600">0</div>

                      <PaginationButton>
                        <FaChevronRight />
                      </PaginationButton>
                    </div>
                  )}
                </Table.Footer>
              </Table>
            ) : (
              <div className="text-center mt-48 text-xl text-neutral-400 bg-neutral-800 rounded w-96 mx-auto py-10">No quiz found</div>
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
