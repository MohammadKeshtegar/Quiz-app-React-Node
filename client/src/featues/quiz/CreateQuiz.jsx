import { useLocation } from "react-router-dom";
import { useState } from "react";

import { useGetQuizQuestions } from "../question/useGetQuizQuestions";
import CreateQuestion from "../question/CreateQuestion";
import CreateQuizSidebar from "./CreateQuizSidebar";
import Spinner from "../../ui/Spinner";

function CreateQuiz() {
  const [editQuestion, setEditQuestion] = useState({});
  const [quizTime, setQuizTime] = useState(0);
  const [category, setCategory] = useState("Programming");
  const [questionIndex, setQuestionIndex] = useState(null);

  const { isLoading, data } = useGetQuizQuestions();
  const { state } = useLocation();

  const editQuiz = Boolean(state);

  if (isLoading) return <Spinner />;
  const { data: questions } = data;

  return (
    <>
      <CreateQuestion
        questions={questions}
        setQuizTime={setQuizTime}
        setCategory={setCategory}
        editQuestion={editQuestion}
        setEditQuestion={setEditQuestion}
        setQuestionIndex={setQuestionIndex}
        editQuiz={editQuiz}
      />

      <CreateQuizSidebar
        questions={questions}
        quizTime={quizTime}
        category={category}
        questionIndex={questionIndex}
        setEditQuestion={setEditQuestion}
        setQuestionIndex={setQuestionIndex}
      />
    </>
  );
}

export default CreateQuiz;
