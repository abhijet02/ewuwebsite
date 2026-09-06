"use client";

import React from "react";
import "./Pagination.scss";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  showPrevNext = true,
  maxVisiblePages = 3,
}) => {
  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is within max visible limit
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Complex logic for more pages than max visible
      const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      // Adjust start if we're near the end
      const adjustedStart = Math.max(1, end - maxVisiblePages + 1);

      for (let i = adjustedStart; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 1;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

  const handlePageClick = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages &&
      pageNumber !== currentPage
    ) {
      onPageChange(pageNumber);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`pagination-container ${className}`}>
      <ul className="pagination">
        {showPrevNext && (
          <li className={currentPage === 1 ? "disabled" : ""}>
            <a
              className="prev-decor"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePrevious();
              }}
              aria-disabled={currentPage === 1}
            >
              Prev
            </a>
          </li>
        )}

        {showStartEllipsis && (
          <>
            <li>
              <a
                className="no-border"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(1);
                }}
              >
                1
              </a>
            </li>
            {visiblePages[0] > 2 && (
              <li>
                <span className="no-border ellipsis">...</span>
              </li>
            )}
          </>
        )}

        {visiblePages.map((pageNum) => (
          <li key={pageNum}>
            <a
              className={`no-border ${currentPage === pageNum ? "active" : ""}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(pageNum);
              }}
            >
              {pageNum}
            </a>
          </li>
        ))}

        {showEndEllipsis && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <li>
                <span className="no-border ellipsis">...</span>
              </li>
            )}
            <li>
              <a
                className="no-border"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(totalPages);
                }}
              >
                {totalPages}
              </a>
            </li>
          </>
        )}

        {showPrevNext && (
          <li className={currentPage === totalPages ? "disabled" : ""}>
            <a
              className="next-decor"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
              aria-disabled={currentPage === totalPages}
            >
              Next
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
