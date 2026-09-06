"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import "./NewsListAll.scss";
import { stripHTMLAndLimitWords } from "@lib/utils/html2text";
import { usePageData } from "@lib/hooks/usePageData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useState, useMemo } from "react";
import Placeholder from "public/placeholder.png";
import Link from "next/link";

const ITEMS_PER_PAGE = 12;

const NewsListAll = () => {
  const { paramNews } = usePageData();
  const news = useMemo(() => paramNews || [], [paramNews]); // stabilize reference

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);
  const isPhoto = useSelector((state: RootState) => state.accessibility.photo);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useMemo(
    () => Math.ceil(news.length / ITEMS_PER_PAGE),
    [news]
  );

  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return news.slice(startIndex, endIndex);
  }, [news, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="pt-5 pb-5">
      <div className="container">
        <div className="row g-4 pt-5">
          {paginatedNews.map((nw, index) => (
            <div
              {...(!isStatic
                ? {
                    "data-aos":
                      index === 0
                        ? "fade-right"
                        : index === paginatedNews.length - 1
                        ? "fade-left"
                        : "zoom-in",
                  }
                : {})}
              className="col-lg-4 col-md-6 col-sm-12 my-2"
              key={nw?.id}
            >
              <Link
                href={`/pages/news-details/${nw.slug}`}
                className="news-list-news-card mb-4"
              >
                {!isPhoto ? (
                  <div className="image-alt-text">
                    <p>{nw?.label || "No image available"}</p>
                  </div>
                ) : (
                  <div className="news-list-news-card-media">
                    <Image
                      src={nw?.thumbnail || Placeholder}
                      fill
                      sizes="100vw"
                      alt={nw?.label || "News image"}
                    />
                  </div>
                )}
                <div className="news-list-news-card-content">
                  <div className="news-list-news-card-info">
                    <Icon
                      icon="material-symbols:date-range-outline-rounded"
                      width="16"
                      height="16"
                    />
                    <p>{new Date(nw?.date).toDateString()}</p>
                  </div>

                  <div className="news-list-news-card-title-desc">
                    <h2>{nw?.label}</h2>
                    <p>{stripHTMLAndLimitWords(nw?.description, 18)}</p>
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
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="custome-pagination text-center my-4">
            <button
              className="page-btn arrow-btn"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <Icon icon="ep:arrow-left" width="20" height="20" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;
              if (
                page === 1 ||
                page === 2 ||
                page === totalPages ||
                page === totalPages - 1 ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
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
              } else if (
                (page === 3 && currentPage > 4) ||
                (page === totalPages - 2 && currentPage < totalPages - 3)
              ) {
                return (
                  <span key={i} className="dots">
                    ...
                  </span>
                );
              } else {
                return null;
              }
            })}

            <button
              className="page-btn arrow-btn"
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
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

export default NewsListAll;
