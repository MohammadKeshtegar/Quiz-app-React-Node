import QuizQuestions from "../question/QuizQuestions";
import { useGetQuiz } from "./useGetQuiz";
import QuizOptions from "./QuizOptions";
import Spinner from "../../ui/Spinner";

function ObserveQuiz() {
  const { isLoading, data } = useGetQuiz();

  if (isLoading) return <Spinner />;

  const { questions, category, quizTime, questionNum } = data.data;

  if (!data)
    return (
      <div className="text-white text-xl text-center">
        <p>💥 Sorry! There was an error while fetching the quiz! 💥</p> <p>Please try again later</p>
      </div>
    );

  return (
    <div className="text-white w-full h-full py-20 px-24">
      <QuizOptions category={category} quizTime={quizTime} questionNum={questionNum} />
      <QuizQuestions questions={questions} />
    </div>
  );
}

export default ObserveQuiz;
