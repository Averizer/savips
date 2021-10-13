import React from "react";
import { Line } from "react-chartjs-2";

export default function MainChart(props) {
  const { mindWaves } = props;

  return (
    <div className="mainChart">
      <Line
        data={{
          labels: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
          datasets: [
            {
              label: "Estrés/Calma",
              data: mindWaves,
              fill: true,
              borderColor: "rgba(189, 142, 191, 1)",
              borderWidth: 3,
              tension: 0.6,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  min: -3,
                  max: 3,
                },
              },
            ],
          },
          animation: {
            duration: 0,
          },
        }}
      />
    </div>
  );
}
