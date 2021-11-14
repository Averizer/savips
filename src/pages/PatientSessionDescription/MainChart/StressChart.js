import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

// let auxLevel = {};

export default function ChartBind(props) {
  const { level } = props;
  const [loadChart, setLoadChart] = useState();
  // auxLevel = level;

  useEffect(() => {
    if (level) {
      // console.log(level);
      setLoadChart(
        <Line
          data={datos(level)}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      );
    }
  }, [level]);

  return <div className="stressChart">{level && loadChart}</div>;
}

const datos = (auxLevel) => {
  // const ctx = canvas.getContext("2d");

  // let stressColor = ctx.createLinearGradient(0, 0, 0, 150);
  // stressColor.addColorStop(0, "rgba(0, 70, 255, 0.1)");
  // stressColor.addColorStop(1, "rgba(0, 70, 255, 1)");

  // let calmColor = ctx.createLinearGradient(0, 0, 0, 150);
  // calmColor.addColorStop(0, "rgba(231, 94, 142, 0.1)");
  // calmColor.addColorStop(1, "rgba(231, 94, 142, 1)");

  const labels = auxLevel.map((e) => {
    return (e.timestap / 60).toFixed(1);
  });

  const stress = auxLevel.map((e) => {
    if (e.stress > 0) {
      return e.stress;
    } else {
      return 0;
    }
  });

  const calm = auxLevel.map((e) => {
    if (e.stress < 0) {
      return e.stress;
    } else {
      return 0;
    }
  });

  return {
    labels: labels,
    datasets: [
      {
        label: "Calma",
        data: stress,
        fill: true,
        backgroundColor: "rgba(43, 185, 252, 0.7)",
        borderColor: "gray",
        borderWidth: 2,
        tension: 0.5,
      },
      {
        label: "Estrés",
        data: calm,
        fill: true,
        backgroundColor: "rgba(231, 94, 142, 0.7)",
        borderColor: "gray",
        borderWidth: 2,
        tension: 0.5,
      },
    ],
  };
};
