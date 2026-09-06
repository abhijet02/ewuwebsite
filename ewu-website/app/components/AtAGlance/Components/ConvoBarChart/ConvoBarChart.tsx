"use client";

import dynamic from "next/dynamic";
import "./ConvoBarChart.scss";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ConvoBarChart: React.FC = () => {
  const chartSeries = [
    {
      name: "Graduates",
      data: [1445, 1310, 2072, 1840, 2073, 2111, 1551, 1693, 2351, 2861],
    },
  ];

  const chartOptions: ApexOptions = {
    chart: {
      id: "convocation-chart",
      toolbar: { show: false },
    },
    xaxis: {
      categories: [
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
      ],
      
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {},
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.4,
        gradientToColors: ["#651e19ff"],
        inverseColors: false,
        opacityFrom: 0.95,
        opacityTo: 0.85,
        stops: [0, 100],
      },
    },
    colors: ["#aa4a44"],
    dataLabels: { enabled: false },
    grid: {
      borderColor: "#e7e7e7",
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "45%",
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val.toLocaleString()} graduates`,
      },
    },
    legend: {
      position: "top", // ✅ literal string, matches ApexOptions
      horizontalAlign: "right",
    },
  };
  return (
    <div className="at-a-glance-chart mt-5">
      <h5 className="mb-3" style={{ fontWeight: 600 }}>
        Last 10-Year convocation count
      </h5>
      <div className="convo-bar-chart-card">
        <div className="convo-bar-chart-body">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ConvoBarChart;
