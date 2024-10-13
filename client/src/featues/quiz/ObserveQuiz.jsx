import QuizQuestions from "../question/QuizQuestions";
import { useGetQuiz } from "./useGetQuiz";
import QuizFeature from "./QuizFeature";
import Spinner from "../../ui/Spinner";

function ObserveQuiz() {
  const { isLoading, data } = useGetQuiz();

  if (isLoading) return <Spinner />;

  const { questions, category, quizTime, questionNum } = data.data;

  const quizFeatures = [
    { name: "Category", value: category },
    { name: "QUiz time", value: quizTime },
    { name: "Number of Questions", value: questionNum },
  ];

  if (!data)
    return (
      <div className="text-white text-xl text-center">
        <p>💥 Sorry! There was an error while fetching the quiz! 💥</p> <p>Please try again later</p>
      </div>
    );

  return (
    <div className="text-white w-full h-full py-20 px-24">
      <div className="flex items-center gap-4 justify-end">
        {quizFeatures.map((feature) => (
          <QuizFeature feature={feature.name} featureValue={feature.value} />
        ))}
      </div>
      <QuizQuestions questions={questions} />
    </div>
  );
}

export default ObserveQuiz;
