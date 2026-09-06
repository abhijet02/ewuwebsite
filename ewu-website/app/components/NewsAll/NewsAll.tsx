"use client";

import Image from "next/image";
import "./NewsAll.scss";
import { Icon } from "@iconify/react";
import { FC, useState, useMemo } from "react";
import moment from "moment";
import Link from "next/link";
import { usePageData } from "@lib/hooks/usePageData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { YesOrNo } from "@lib/services/news/news.service.type";

const ITEMS_PER_PAGE = 6;

const NewsAll: FC = () => {
  const { paramNews } = usePageData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  /** 🔹 Search & Pagination states */
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /** 🔹 1. Filter out archived news */
  const news = useMemo(() => {
    if (!paramNews || !Array.isArray(paramNews)) return [];
    return paramNews.filter((n) => n.isArchived === YesOrNo.NO);
  }, [paramNews]);

  /** 🔹 2. Filter by search term */
  const filteredNews = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return news;
    return news.filter((n) => n.label.toLowerCase().includes(term));
  }, [news, searchTerm]);

  /** 🔹 3. Total pages */
  const totalPages = useMemo(
    () => Math.ceil(filteredNews.length / ITEMS_PER_PAGE),
    [filteredNews.length]
  );

  /** 🔹 4. Paginate (no useEffect — purely derived) */
  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredNews.slice(startIndex, endIndex);
  }, [filteredNews, currentPage]);

  /** 🔹 5. Handle page change */
  const handlePageChange = (page: number) => {
    const newPage = Math.max(1, Math.min(totalPages, page));
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-5">
      <div className="container">
        {/* 🔍 Header + Search */}
        <div className="header-with-input-field">
          <h2>All News</h2>
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="header-with-input-field-customization"
          />
        </div>

        {/* 📰 News Cards Grid */}
        <div className="row g-4 mb-4">
          {paginatedNews.length > 0 ? (
            paginatedNews.map((item, index) => (
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-6"
                key={item.id || index}
                {...(!isStatic
                  ? {
                      "data-aos":
                        typeof window !== "undefined" && window.innerWidth < 800
                          ? "fade-up"
                          : index === 0
                          ? "fade-right"
                          : index === paginatedNews.length - 1
                          ? "fade-left"
                          : "zoom-in",
                    }
                  : {})}
              >
                {/* ✅ Proper Next.js Link usage */}
                <Link
                  href={`/pages/news-details/${item.slug}`}
                  prefetch={false}
                  className="news-list-news-card mb-4 block"
                >
                  <div className="news-list-news-card-media">
                    <Image
                      src={item.thumbnail}
                      fill
                      sizes="100vw"
                      alt="News Thumbnail"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="news-list-news-card-content">
                    <div className="news-list-news-card-info">
                      <Icon
                        icon="material-symbols:date-range-outline-rounded"
                        width="16"
                        height="16"
                      />
                      <p>
                        {moment(
                          item.date instanceof Date
                            ? item.date
                            : new Date(item.date)
                        ).format("MMMM D, YYYY")}
                      </p>
                    </div>

                    <div className="news-list-news-card-title-desc">
                      <h2>{item.label}</h2>
                      {/* Optional short description */}
                      {/* <p>{stripHTMLAndLimitWords(item?.description, 18)}</p> */}
                    </div>
                  </div>

                  <div className="news-list-button-container">
                    <div className="button-text primary-button-text">
                      View Details
                      <Icon
                        icon="si:arrow-right-duotone"
                        width="20"
                        height="20"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-12 text-center my-5">
              <p>No news found matching your search.</p>
            </div>
          )}
        </div>

        {/* 📄 Pagination */}
        {totalPages > 1 && (
          <div className="custome-pagination text-center my-4">
            {/* Prev */}
            <button
              className="page-btn arrow-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Icon icon="ep:arrow-left" width="20" height="20" />
            </button>

            {/* Numbers */}
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
                    className={`page-btn ${
                      currentPage === page ? "active" : ""
                    }`}
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

            {/* Next */}
            <button
              className="page-btn arrow-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Icon icon="ep:arrow-right" width="20" height="20" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsAll;
