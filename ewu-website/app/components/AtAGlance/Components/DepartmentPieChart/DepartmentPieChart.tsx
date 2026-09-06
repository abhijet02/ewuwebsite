"use client";

import dynamic from "next/dynamic";
import "./DepartmentPieChart.scss";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DepartmentPieChart: React.FC = () => {
  const series = [2, 5, 6];

  const labels = [
    "Faculty of business and economics",
    "Faculty of liberal arts and social sciences",
    "Faculty of science and engineering",
  ];

  const shortLabels = ["FB&E", "FLASS", "FSET"]; // short labels for center on hover

  const colors = ["#aa4a44", "#1c4370", "#169247"];

  const options = {
    chart: {
      type: "donut",
    },
    labels: labels,
    colors: colors,
    tooltip: {
      enabled: true,
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        // Create HTML tooltip
        const label = w.globals.labels[seriesIndex];
        const value = series[seriesIndex];
        return `
        <div class="custom-donut-tooltip">
          <span>${label}: ${value}</span>
        </div>
      `;
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    plotOptions: {
      pie: {
        stroke: { show: false, width: 0, colors: ["transparent"] },
        donut: {
          size: "72%",
          labels: {
            show: true,
            name: {
              show: true,
              formatter: (val: string, opts: any) => {
                const hoverIndex = opts.seriesIndex;
                return shortLabels[hoverIndex] || "Departments";
              },
            },
            total: {
              show: true,
              label: "Departments",
              formatter: () => series.reduce((a, b) => a + b, 0),
            },
          },
        },
      },
    },
  };

  return (
    <div className="faculty-ratio-card">
      <div className="faculty-ratio-card-header">
        <h4>Faculty Wise Departments</h4>
      </div>
      <div className="faculty-ratio-dount-chart">
        <Chart
          options={options as any}
          series={series}
          type="donut"
          height={240}
          width={"100%"}
        />
      </div>

      {/* Custom Legend */}
      <div className="custom-legend">
        {labels.map((label, idx) => (
          <div className="legend-item" key={idx}>
            <span
              className="legend-color"
              style={{ backgroundColor: colors[idx] }}
            ></span>
            <span className="legend-label">
              {label} ({series[idx]})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentPieChart;
