"use client";

import React from "react";
import "./ArchiveOld.scss";
import { usePageData } from "@lib/hooks/usePageData";
import Link from "next/link";

const Archives: React.FC = () => {
  const { news = [], notices = [] } = usePageData();

  // Group by year
  const yearMap: Record<number, { news: boolean; notices: boolean }> = {};

  // Helper to populate map
  const addToYearMap = (items: any[], type: "news" | "notices") => {
    items.forEach((item) => {
      const date = new Date(item.date);
      if (!isNaN(date as any)) {
        const year = date.getFullYear();
        if (!yearMap[year]) {
          yearMap[year] = { news: false, notices: false };
        }
        yearMap[year][type] = true;
      }
    });
  };

  addToYearMap(news, "news");
  addToYearMap(notices, "notices");

  // Sort years descending
  const sortedYears = Object.keys(yearMap)
    .map(Number)
    .sort((a, b) => b - a);

  // Generate accordion content with links
  const accordionData = sortedYears.map((year) => {
    const contents = [];
    if (yearMap[year].news)
      contents.push({ type: "news", url: `/pages/archive-news?year=${year}` });
    if (yearMap[year].notices)
      contents.push({
        type: "notice",
        url: `/pages/archive-notices?year=${year}`,
      });

    return {
      year,
      contents,
    };
  });

  return (
    <div>
      <h2 className="archive-title">All News & Notices Archive</h2>
      <section className="accordion-wrapper">
        <div className="accordion" id="accordionExample">
          {accordionData?.map((item, index) => {
            const collapseId = `collapse-${index}`;
            const headingId = `heading-${index}`;

            return (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={headingId}>
                  <button
                    className={`accordion-button ${
                      index !== 0 ? "collapsed" : ""
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseId}`}
                    aria-expanded={index === 0 ? "true" : "false"}
                    aria-controls={collapseId}
                  >
                    {item.year}
                  </button>
                </h2>
                <div
                  id={collapseId}
                  className={`accordion-collapse collapse ${
                    index === 0 ? "show" : ""
                  }`}
                  aria-labelledby={headingId}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {item?.contents?.length > 0 &&
                      item?.contents?.map((content, contentIndex) => (
                        <p className="" key={`${content.type}-${contentIndex}`}>
                          <Link href={content.url} passHref>
                            {content.type === "news" ? "News" : "Notices"}
                          </Link>
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Archives;
