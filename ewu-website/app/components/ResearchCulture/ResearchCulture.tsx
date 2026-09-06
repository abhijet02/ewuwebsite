"use client";

import "./ResearchCulture.scss";
import dynamic from "next/dynamic";

// Dynamically import ApexCharts (SSR-safe)
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ResearchCulture: React.FC = () => {
  const barChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 380,
      toolbar: { show: false },
      background: "transparent",
      animations: { enabled: true, speed: 800 },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
        dataLabels: { position: "top" },
        barHeight: "60%",
      },
    },
    dataLabels: {
      enabled: false,
      offsetX: 50,
      style: {
        fontSize: "13px",
        fontWeight: 900,
        colors: ["var(--apex-label)"],
      },
    },
    colors: ["var(--apex-bar)"],
    xaxis: {
      categories: [
        "Total Publications",
        "Journal Articles",
        "Proceedings",
        "Book Chapters",
        "Other Publications",
        "Books",
        "Patents",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      min: 0,
      max: 420,
      labels: {
        style: { fontSize: "13px", colors: ["var(--apex-axis-label)"] },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "13px",
          fontWeight: 500,
          colors: ["var(--apex-axis-label)"],
        },
        maxWidth: 180,
      },
    },
    tooltip: { theme: "light", y: { formatter: (v) => `${v}` } },
    legend: { show: false },
    grid: {
      show: true,
      borderColor: "var(--apex-grid)",
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              barHeight: "60%",
              borderRadius: 4,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: [
              "Total",
              "Journals",
              "Proceedings",
              "Chap.",
              "Others",
              "Books",
              "Patents",
            ],
            labels: {
              rotate: 90,
              style: { fontSize: "9px" },
            },
          },
          yaxis: {
            labels: {
              style: { fontSize: "10px" },
              maxWidth: 80,
            },
          },
          tooltip: {
            enabled: true,
          },
          legend: { show: false },
        },
      },
    ],
  };

  const barChartSeries = [
    {
      name: "Publications",
      data: [414, 203, 140, 60, 12, 5, 1],
    },
  ];

  // Area Chart Options for KPI SVGs (compact, 2020-2025 trends)
  const areaChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      height: 120,
      width: 40,
      sparkline: { enabled: true },
      toolbar: { show: false },
      background: "transparent",
      animations: { enabled: true, speed: 800 },
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#fff"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        opacityFrom: 0,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      theme: "light",
      x: { show: false },
      y: { formatter: (v) => `${v}` },
      marker: { show: false },
    },
    legend: { show: false },
    grid: { show: false },
    xaxis: {
      categories: ["2020", "2021", "2022", "2023", "2024", "2025"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false }, // Hide for compact view
    },
    yaxis: {
      labels: { show: false },
    },
    colors: ["var(--apex-area)"],
    responsive: [
      {
        breakpoint: 768,
        options: {
          height: 100,
        },
      },
    ],
  };

  // First KPI: Publications trend (rising from ~200 to 414)
  const publicationsSeries = [
    {
      name: "Publications",
      data: [200, 220, 250, 300, 350, 414],
    },
  ];

  // Second KPI: Presentations trend (rising from ~100 to 199)
  const presentationsSeries = [
    {
      name: "Presentations",
      data: [100, 110, 130, 150, 175, 199],
    },
  ];

  return (
    <div className="container mt-5">
      {/* Header + Filter */}
      <div className="research-culture-header-filter">
        <div className="research-culture-header">
          <h4>Building a Research Culture</h4>
          <p>
            East West University&apos;s Commitment to Academic Excellence in
            2024
          </p>
        </div>
        <div className="research-culture-filter">
          <label htmlFor="yearFilter">Select Year:</label>
          <select id="yearFilter" name="yearFilter" defaultValue="2024">
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <p>
        In 2024, East West University placed a strategic focus on building a
        research culture, reaffirming its commitment to academic excellence.
        Through targeted initiatives, the university has strengthened faculty
        engagement and provided greater institutional support for research
        activities. This year, EWU achieved a significant milestone by producing
        <strong> 414 research works</strong>—an impressive testament to the
        institution's growing emphasis on research-driven development. By
        prioritizing faculty development, improving institutional policies, and
        offering financial and logistical support, EWU has laid a strong
        foundation for sustained research excellence. The progress made in 2024
        demonstrates East West University's commitment to establishing a
        sustainable research culture. Looking ahead, East West University
        remains committed to <strong>enhancing research infrastructure </strong>
        , promoting interdisciplinary collaboration, and
        <strong>supporting the academic community </strong>
        in pushing the boundaries of knowledge. The strides made in 2024 reflect
        not only past achievements but also a clear vision for a future rooted
        in innovation and scholarly impact.
      </p>

      {/* Grid: Chart (8) + KPIs (4) */}
      <div className="row g-4 mt-5">
        {/* Bar Chart - 8 Columns */}
        <div className="col-12 col-md-8">
          <div className="research-culture-chart-card">
            <h5>Research Publication Overview</h5>
            <Chart
              options={barChartOptions}
              series={barChartSeries}
              type="bar"
              height={280}
            />
          </div>
        </div>

        {/* KPI Cards - 4 Columns */}
        <div className="col-12 col-md-4">
          <div className="research-culture-kpi">
            {/* First KPI: Publications */}
            <div className="research-culture-kpi-card">
              <div className="kpi-part">
                <h2>414</h2>
                <p>Research Article Published</p>
              </div>
              <div className="kpi-svg-part">
                <Chart
                  options={areaChartOptions}
                  series={publicationsSeries}
                  type="area"
                  height={80}
                />
              </div>
            </div>
            {/* Second KPI: Presentations */}
            <div className="research-culture-kpi-card">
              <div className="kpi-part">
                <h2>199</h2>
                <p>Research Article Presented</p>
              </div>
              <div className="kpi-svg-part">
                <Chart
                  options={areaChartOptions}
                  series={presentationsSeries}
                  type="area"
                  height={80}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchCulture;
