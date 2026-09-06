"use client";

import dynamic from "next/dynamic";
import "./ProgramBarChart.scss";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ProgramBarChart: React.FC = () => {
  const values = [15, 11, 2];
  const labels = ["Undergraduate", "Graduate", "Diploma"];
  const colors = ["#aa4a44", "#1c4370", "#169247"];

  const series = values;

  const options: any = {
    chart: {
      type: "polarArea",
      toolbar: { show: false },
    },

    labels: labels,
    colors: colors,

    stroke: { width: 0 },
    fill: { opacity: 1 },
    dataLabels: { enabled: false },
    legend: { show: false },
    yaxis: { show: false },

    plotOptions: {
      polarArea: {
        rings: { strokeWidth: 1 },
        spokes: { strokeWidth: 1 },
      },
    },

    tooltip: {
      enabled: true,
      custom: ({ series, seriesIndex, w }) => {
        const label = w.globals.labels[seriesIndex];
        const value = series[seriesIndex];
        return `
        <div class="custom-polar-tooltip">
          <span>${label}: ${value}</span>
        </div>
      `;
      },
    },

    responsive: [
      {
        breakpoint: 768,
        options: { chart: { height: 260 } },
      },
    ],
  };

  return (
    <div className="programbar-chart-card">
      <div className="program-bar-header">
        <h4>Programs</h4>
      </div>

      <div className="bar-chart-wrapper">
        <Chart
          options={options}
          series={series}
          type="polarArea"
          height={240}
        />
      </div>

      {/* Custom Legend */}
      <div className="program-legend">
        {labels.map((label, idx) => (
          <div key={idx} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: colors[idx] }}
            ></span>
            <span className="legend-text">
              {label} ({values[idx]})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramBarChart;
