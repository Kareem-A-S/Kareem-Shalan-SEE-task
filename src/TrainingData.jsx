import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const data = {
  labels: ["Defense", "Attack", "Speed", "Stamina", "Awareness"],
  datasets: [
    {
      label: "After ",
      data: [65, 59, 60, 81, 56],
      fill: true,
      backgroundColor: "rgba(88, 0, 123, 0.2)",
      borderColor: "rgb(88, 0, 123)",
      pointBackgroundColor: "white",
      pointBorderColor: "rgba(255, 99, 132, 0.5)",
      pointHoverBackgroundColor: "rgba(255, 99, 132, 0.5)",
      pointHoverBorderColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Before",
      data: [28, 48, 40, 19, 70],
      fill: true,
      backgroundColor: "rgba(170, 120, 230, 0.5)",
      borderColor: "rgb(170, 120, 230)",
      pointBackgroundColor: "white",
      pointBorderColor: "rgba(54, 162, 235, 0.5)",
      pointHoverBackgroundColor: "rgba(54, 162, 235, 0.5)",
      pointHoverBorderColor: "rgba(54, 162, 235, 0.5)",
    },
  ],
};
const options = {
  maintainAspectRatio: true,
  aspectRatio: 1,
};
function PlayerInfo() {
  return (
    <div className="radarCard">
      <h2 className="cardTitle">
        Training <br />
        Efficiency
      </h2>
      <div className="chart-container2">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}

export default PlayerInfo;
