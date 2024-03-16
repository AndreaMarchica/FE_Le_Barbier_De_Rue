import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const FidelityChart = () => {
  const data = {
    labels: ["Blue"],
    datasets: [
      {
        label: "My First Dataset",
        data: [50, 500],
        backgroundColor: ["rgb(54, 162, 235)", "rgb(155, 155, 155"],
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default FidelityChart;
