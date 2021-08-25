import React from "react";
import { Line } from "react-chartjs-2";

let auxLevel = {};

export default function ChartBind(props) {
  const { level } = props;
  auxLevel = level;
  return (
    <div className="historial">
      <Line
        data={datos}
        height={250}
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
    </div>
  );
}

const datos = (canvas) => {
  const ctx = canvas.getContext("2d");

  let gradiente = ctx.createLinearGradient(0, 0, 0, 150);
  gradiente.addColorStop(0, "rgba(189, 142, 191, 0.1)");
  gradiente.addColorStop(1, "rgba(189, 142, 191, 1)");

  const labels = auxLevel.jsonarray.map((e) => {
    return e.timestap;
  });

  const data = auxLevel.jsonarray.map((e) => {
    return e.stress;
  });

  return {
    labels: labels,
    datasets: [
      {
        label: "Cantidad de estrés/tranquilidad detectado durante la sesión",
        data: data,
        fill: true,
        backgroundColor: gradiente,
        borderColor: "gray",
        borderWidth: 2,
        tension: 0.5,
      },
    ],
  };
};
