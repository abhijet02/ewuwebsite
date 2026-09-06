"use client";

import { FC, useState, useMemo, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./NoticeAll.scss";
import moment from "moment";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useNoticeData } from "@lib/hooks/useNoticeData";

const ITEMS_PER_PAGE = 10;

const NoticeAll: FC = () => {
  const { paramNotices: notices = [] } = useNoticeData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All");

  // ✅ Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(notices.map((n) => n.category).filter(Boolean))
    );
    return ["All", ...cats];
  }, [notices]);

  /** 🔹 Filter by category + search term */
  const filteredNotices = useMemo(() => {
    let data = notices;
    if (activeCategory !== "All") {
      data = data.filter((n) => n.category === activeCategory);
    }
    if (searchTerm.trim()) {
      data = data.filter((n) =>
        n.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return data;
  }, [notices, searchTerm, activeCategory]);

  /** 🔹 Total pages */
  const totalPages = useMemo(
    () => Math.ceil(filteredNotices.length / ITEMS_PER_PAGE),
    [filteredNotices.length]
  );

  /** 🔹 Paginated notices */
  const paginatedNotices = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredNotices.slice(start, end);
  }, [filteredNotices, currentPage]);

  /** 🔹 Handle page change */
  const handlePageChange = (page: number) => {
    const newPage = Math.max(1, Math.min(totalPages, page));
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="all-notice-page-body">
      <div className="header-with-input-field">
        <h2>All Notices</h2>

        <div className="search-select-wrapper">
          <input
            type="text"
            placeholder="Search notices..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            value={activeCategory}
            onChange={(e) => {
              setActiveCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="all-notice-page-list">
        {paginatedNotices.length > 0 ? (
          paginatedNotices.map((notice) => (
            <div key={notice.id} className="notice-list-page-notice-box">
              <div className="notice-list-page-notice-date-box">
                <h1>{moment(notice.date).format("DD")}</h1>
                <p>{moment(notice.date).format("MMM")}</p>
                <p>{moment(notice.date).format("YYYY")}</p>
              </div>
              <div className="notice-list-page-notice-info-box">
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
          ))
        ) : (
          <p className="text-center my-5">No notices found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="custome-pagination text-center my-4">
          <button
            className="page-btn arrow-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Icon icon="ep:arrow-left" width="20" height="20" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;

            const isVisible =
              page === 1 ||
              page === 2 ||
              page === totalPages ||
              page === totalPages - 1 ||
              (page >= currentPage - 1 && page <= currentPage + 1);

            const isDotsAfterSecond = page === 3 && currentPage > 4;
            const isDotsBeforeSecondToLast =
              page === totalPages - 2 && currentPage < totalPages - 3;

            if (isVisible) {
              return (
                <button
                  key={i}
                  className={`page-btn ${currentPage === page ? "active" : ""}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              );
            } else if (isDotsAfterSecond || isDotsBeforeSecondToLast) {
              return (
                <span key={i} className="dots">
                  ...
                </span>
              );
            }

            return null;
          })}

          <button
            className="page-btn arrow-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <Icon icon="ep:arrow-right" width="20" height="20" />
          </button>
        </div>
      )}
    </section>
  );
};

export default NoticeAll;
