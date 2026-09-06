"use client";

import "./NoticeForHomePage.scss";
import { Icon } from "@iconify/react";
import moment from "moment";
import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { useNoticeData } from "@lib/hooks/useNoticeData";
import { useViewAllLink } from "@lib/hooks/useViewAllLink";

const NoticeForHomePage: FC = () => {
  const { pageNotices: notices = [] } = useNoticeData();
  const viewAllLink = useViewAllLink({ componentName: "NoticeForHomePage" });

  // Sort notices by date descending
  const sortedNotices = [...notices].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Group notices by category
  const noticesByCategory: Record<string, any[]> = {};
  sortedNotices.forEach((notice) => {
    if (!noticesByCategory[notice.category]) {
      noticesByCategory[notice.category] = [];
    }
    noticesByCategory[notice.category].push(notice);
  });

  const categoryNames = Object.keys(noticesByCategory);
  const [activeTab, setActiveTab] = useState<string>("All");

  // ✅ Responsive check for mobile view
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 575);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const filteredNotices =
    activeTab === "All"
      ? sortedNotices.slice(0, 5)
      : (noticesByCategory[activeTab] || []).slice(0, 5);

  return (
    <section className="notice-for-home-page-background">
      <div className="container notice-for-home-page-body">
        {/* Header */}
        <div className="notice-for-home-page-header-with-view-all-button">
          <h2>Notice</h2>
          <Link
            href={viewAllLink || ""}
            className="for-all-view-all-button exception-button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            View All
            <Icon icon="si:arrow-right-duotone" width="20" height="20" />
          </Link>
        </div>

        {/* Tabs or Dropdown */}
        {!isMobile ? (
          <div className="notice-tabs">
            <button
              className={activeTab === "All" ? "active" : ""}
              onClick={() => setActiveTab("All")}
            >
              All
            </button>
            {categoryNames.map((category) => (
              <button
                key={category}
                className={activeTab === category ? "active" : ""}
                onClick={() => setActiveTab(category)}
              >
                {category}
              </button>
            ))}
          </div>
        ) : (
          <div className="notice-select-wrapper">
            <select
              className="notice-select"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="All">All</option>
              {categoryNames.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Notice list */}
        <div className="mt-4 g-3">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((data, i) => (
              <div key={i}>
                <Link
                  className="notice-card"
                  href={`/pages/notice-details/${data?.slug}`}
                >
                  <div className="notice-date">
                    <h2>{moment(data.date).format("DD")}</h2>
                    <p>{moment(data.date).format("MMM")}</p>
                  </div>
                  <div className="notice-content">
                    <h4>{data.label}</h4>
                  </div>
                </Link>
                {i !== filteredNotices.length - 1 && <div className="line" />}
              </div>
            ))
          ) : (
            <p className="no-notice">No notices found for this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NoticeForHomePage;
