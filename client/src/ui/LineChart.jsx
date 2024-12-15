import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useMode } from "../context/Mode";

import { subDays } from "date-fns";

function LineChart() {
  const { mode } = useMode();

  const colors =
    mode === "dark"
      ? {
          totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
          extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
          text: "#737373",
          background: "#18212f",
        }
      : {
          totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
          extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
          text: "#000",
          background: "#fff",
        };

  const lineChartData = [];
  for (let num = 30; num >= 0; num--) {
    lineChartData.push({
      date: subDays(new Date(), num).toISOString().slice(0, 10),
      value: Math.random() * 2,
    });
  }

  return (
    <ResponsiveContainer height={300} width="100%">
      <AreaChart data={lineChartData}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
            <stop offset="75%" stopColor="#3b82f6" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <XAxis dataKey="date" tick={{ fill: colors.text }} axisLine={false} />
        <YAxis dataKey="value" tick={{ fill: colors.text }} axisLine={false} />
        <CartesianGrid opacity={mode === "dark" ? 0.1 : 0.5} />
        <Tooltip contentStyle={{ color: "#fff", backgroundColor: "#18212f" }} />
        <Area dataKey="value" type="monotone" stroke="#3b82f6" fill="url(#color)" strokeWidth={2} name="users" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default LineChart;
