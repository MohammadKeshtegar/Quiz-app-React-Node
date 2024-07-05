import { Chart as Chartjs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

Chartjs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const barCharData = {
  labels: ["Monday", "Thuresday", "Wednesday", "Thirsday", "Friday", "Saturday", "Sunday"],
  datasets: [
    {
      label: "Houres",
      data: [2, 1.5, 3, 1, 2, 1, 3],
      backgroundColor: ["rgba(54, 162, 235, .3)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
      borderWidth: 1,
      barThickness: 70,
      chartThickness: 100,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "How much time you spend in Quiz-app",
      position: "right",
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
    },
    y: {
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
    },
  },
  maintainAspectRatio: false,
};

function DailyUsageChar() {
  return (
    <div className="bg-neutral-800 p-3 rounded">
      <Bar options={options} data={barCharData} style={{ height: "300px" }} />
    </div>
  );
}

export default DailyUsageChar;
