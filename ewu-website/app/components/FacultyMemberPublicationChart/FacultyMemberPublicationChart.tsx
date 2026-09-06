"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import "./FacultyMemberPublicationChart.scss";
import { useFacultyMemberData } from "@lib/hooks/useFacultyMemberData";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const FacultyMemberPublicationChart: React.FC = () => {
  const { publication } = useFacultyMemberData();

  const countListItems = (htmlString: string) => {
    if (!htmlString) return 0;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = htmlString;
    return wrapper.querySelectorAll("li").length;
  };

  // X-axis titles & Y-axis values
  const titles: string[] = [];
  const liCounts: number[] = [];

  publication.forEach((pub) => {
    const liCount = countListItems(pub.details);
    titles.push(pub.title);
    liCounts.push(liCount);
  });

  const series = [
    {
      name: "List Items Count",
      data: liCounts,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 6,
      },
    },
    xaxis: {
      categories: titles,
      labels: {
        rotate: -45,
        style: { colors: "#1C252E", fontSize: "12px", fontWeight: 500 },
        trim: false,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      title: { text: "List Item Count" },
      labels: {
        style: { colors: "#1C252E", fontWeight: 500 },
      },
    },
    colors: ["#1E90FF"],
    grid: { borderColor: "#e0e0e0", strokeDashArray: 4 },
    dataLabels: { enabled: false },
    tooltip: {
      y: { formatter: (v) => `${v} items` },
      x: { formatter: (title) => `${title}` },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto research-profile">
      <h4 className="text-xl font-semibold mb-4">List Item Count Per Publication</h4>
      <div className="faculty-member-publication-chart-body">
        <Chart options={options} series={series} type="bar" height={280} />
      </div>
    </div>
  );
};

export default FacultyMemberPublicationChart;
