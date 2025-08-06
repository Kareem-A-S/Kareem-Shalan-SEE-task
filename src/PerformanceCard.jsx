import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
const data = {
  labels: ["First Shot", "Second Shot", "Third Shot", "Fourth Shot"],
  datasets: [
    {
      type: "bar",
      label: "Shot Power",
      data: [20, 60, 40, 80],
      borderColor: "rgb(153, 50, 204)",
      backgroundColor: "rgba(153, 50, 204, 0.3)",
    },
    {
      type: "line",
      label: "Joint Angle (Right Knee)",
      data: [110, 70, 40, 90],
      fill: false,
      borderColor: "rgb(40, 30, 40)",
      backgroundColor: "rgba(216, 191, 216, 0.3)",
    },
  ],
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function PerformanceStats() {
  return (
    <div className="barComponents">
      <h2 className="cardTitle">Metrics</h2>
      <div className="chart-container">
        <Chart type="bar" data={data} />
      </div>
    </div>
  );
}

export default PerformanceStats;
