import { useGetAllQuizzes } from "../features/quiz/useGetAllQuizzes";
import { useMode } from "../context/Mode";
import Spinner from "./Spinner";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ categories }) {
  const { data, isLoading } = useGetAllQuizzes();
  const { mode } = useMode();

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  const { data: quizData } = data;

  const categoryLabels = categories.map((category) => category.category);
  const quizzesBasedOnCategory = {};

  quizData.forEach((quiz) => {
    const quizCategory = quiz.category;
    if (quizzesBasedOnCategory[quizCategory]) {
      quizzesBasedOnCategory[quizCategory]++;
    } else {
      quizzesBasedOnCategory[quizCategory] = 1;
    }
  });

  categories.forEach((category) => {
    if (!Object.keys(quizzesBasedOnCategory).includes(category.category)) {
      quizzesBasedOnCategory[category.category] = 0;
    }
  });

  const chartData = categories.map((category) => quizzesBasedOnCategory[category.category]);
  const borderColors = categories.map((category) => category.color);
  const backgroundColors = borderColors.map((color) => color.replace(" 1)", " 0.2)"));

  const pieChartData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "# of Quizzes",
        data: chartData,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        hoverOffset: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: mode === "dark" ? "#737373" : "#000",
          font: {
            size: 16,
          },
        },
      },
    },
    layout: {
      padding: 20,
    },
  };

  return <Doughnut options={options} data={pieChartData} />;
}
