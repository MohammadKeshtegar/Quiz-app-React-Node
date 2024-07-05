import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const pieChartData = {
    labels: ["Programming", "Technology", "Mathematics", "History", "Botanical", "Phytozoolagy"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(59, 130, 246, 0.2)",
          "rgba(14, 165, 233, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(5, 150, 105, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(14, 165, 233, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(5, 150, 105, 1)",
        ],
        borderWidth: 1,
        // width: 50,
        hoverOffset: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
    layout: {
      padding: 30,
    },
  };

  return <Doughnut options={options} data={pieChartData} />;
}

export default PieChart;
