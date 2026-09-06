"use client";

import { FC, useState } from "react";
import { Icon } from "@iconify/react";
import "./NoticeAll.scss";
import moment from "moment";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useNoticeData } from "@lib/hooks/useNoticeData";

const NoticeAll: FC = () => {
  const [visibleCount, setVisibleCount] = useState(10);
  const { paramNotices: notices } = useNoticeData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotices = notices?.filter((notice) =>
    notice.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleNotices = filteredNotices?.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => {
      const nextCount = prev + 10;
      return nextCount > filteredNotices.length
        ? filteredNotices.length
        : nextCount;
    });
  };

  const handleLoadLess = () => {
    setVisibleCount((prev) => {
      const nextCount = prev - 10;
      return nextCount < 10 ? 10 : nextCount;
    });
  };

  return (
    <section className="notice-part">
      <div className="header-with-input-field">
        <h2>All Notices</h2>
        <input
          type="text"
          placeholder="Search notices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="header-with-input-field-customization"
        />
      </div>
      <div className="notice-main">
        {visibleNotices?.map((notice) => (
          <div key={notice.id} className="event-box">
            <div className="event-date">
              <h1>{moment(notice.date).format("DD")}</h1>
              <p>{moment(notice.date).format("MMM")}</p>
              <p>{moment(notice.date).format("YYYY")}</p>
            </div>
            <div className="event-info">
              <Link href={`/pages/notice-details/${notice.slug}`}>
                <h4>{notice.label}</h4>
                <div className="d-flex flex-column flex-md-row gap-3">
                  <p className="d-flex align-items-center gap-1">
                    <Icon icon="wi:time-4" width="20" height="20" />
                    <span>
                      {new Date(notice.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                  {notice.location && (
                    <p className="d-flex align-items-center gap-1">
                      <Icon
                        icon="mingcute:location-2-line"
                        width="20"
                        height="20"
                      />
                      <span>{notice.location}</span>
                    </p>
                  )}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      {filteredNotices && filteredNotices.length > 5 && (
        <div className="text-center mt-4">
          {visibleCount < filteredNotices.length && (
            <button className="load-btn" onClick={handleLoadMore}>
              Load More
            </button>
          )}
          {visibleCount > 10 && (
            <button className="load-less-btn ml-2" onClick={handleLoadLess}>
              Load Less
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default NoticeAll;
