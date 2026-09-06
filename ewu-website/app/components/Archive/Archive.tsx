"use client";

import { FC, useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { usePageData } from "@lib/hooks/usePageData";
import { useAdmissionResultData } from "@lib/hooks/useAdmissionResultData";
import PdfViewer from "../PdfViewer/PdfViewer";
import { useNewsMediaData } from "@lib/hooks/useNewsMediaData";
import Link from "next/link";
import "./Archivelist.scss"; // Import SCSS
import { useProcurementData } from "@lib/hooks/useProcurementData";

const ArchiveFilter: FC = () => {
  const {
    pages,
    archivedNews,
    archivedEvents,
    archivedAchievements,
    archivedNotices,
  } = usePageData();

  const { archivedAdmissionResults } = useAdmissionResultData();
  const { archivedNewsMediaData } = useNewsMediaData();
  const { archivedProcurements } = useProcurementData();

  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const handlePreview = (url: string) => {
    setPdfUrl(url);
    setPdfOpen(true);
  };

  const [page, setPage] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");

  // Collect all valid pageIds from sources that have them
  const usedPageIds = new Set<number>(
    [
      ...(archivedNews || []).map((n) => n.pageId),
      ...(archivedEvents || []).map((e) => e.pageId),
      ...(archivedAchievements || []).map((a) => a.pageId),
      ...(archivedNotices || []).map((n) => n.pageId),
      ...(archivedNewsMediaData || []).map((m) => m.pageId),
    ].filter(Boolean)
  );

  // Filter pages that are used in those datasets
  const filteredPages = (pages || []).filter((page) =>
    usedPageIds.has(page.id)
  );

  const years = useMemo(() => {
    let items: any[] = [];
    if (category === "news") items = archivedNews || [];
    else if (category === "events") items = archivedEvents || [];
    else if (category === "achievements") items = archivedAchievements || [];
    else if (category === "notices") items = archivedNotices || [];
    else if (category === "admissionResults")
      items = archivedAdmissionResults || [];
    else if (category === "newsMedia") items = archivedNewsMediaData || [];
    else if (category === "procurements") items = archivedProcurements || [];

    const yearSet = new Set<number>();
    items.forEach((item) => {
      let yearVal: number | null = null;

      if (category === "news" && item.date)
        yearVal = new Date(item.date).getFullYear();
      else if (category === "events" && item.fromDate)
        yearVal = new Date(item.fromDate).getFullYear();
      else if (category === "achievements" && item.date)
        yearVal = new Date(item.date).getFullYear();
      else if (category === "notices" && item.date)
        yearVal = new Date(item.date).getFullYear();
      else if (category === "admissionResults")
        yearVal = item.year ? Number(item.year) : null;
      else if (category === "newsMedia" && item.date)
        yearVal = new Date(item.date).getFullYear();
      else if (category === "procurements" && item.publishDate)
        yearVal = new Date(item.publishDate).getFullYear();

      if (yearVal !== null && !isNaN(yearVal)) yearSet.add(yearVal);
    });

    return Array.from(yearSet).sort((a, b) => b - a);
  }, [
    category,
    archivedNews,
    archivedEvents,
    archivedAchievements,
    archivedNotices,
    archivedAdmissionResults,
    archivedNewsMediaData,
    archivedProcurements,
  ]);

  const filteredItems = useMemo(() => {
    let items: any[] = [];

    if (category === "news") items = archivedNews || [];
    else if (category === "events") items = archivedEvents || [];
    else if (category === "achievements") items = archivedAchievements || [];
    else if (category === "notices") items = archivedNotices || [];
    else if (category === "admissionResults")
      items = archivedAdmissionResults || [];
    else if (category === "newsMedia") items = archivedNewsMediaData || [];
    else if (category === "procurements") items = archivedProcurements || [];

    return items.filter((item) => {
      // Year filter
      const matchesYear = (() => {
        if (!year) return true;
        if (category === "news" && item.date)
          return new Date(item.date).getFullYear() === Number(year);
        if (category === "events" && item.fromDate)
          return new Date(item.fromDate).getFullYear() === Number(year);
        if (category === "achievements" && item.date)
          return new Date(item.date).getFullYear() === Number(year);
        if (category === "notices" && item.date)
          return new Date(item.date).getFullYear() === Number(year);
        if (category === "admissionResults" && item.year)
          return item.year === Number(year);
        if (category === "newsMedia" && item.date)
          return new Date(item.date).getFullYear() === Number(year);
        if (category === "procurements" && item.publishDate)
          return new Date(item.publishDate).getFullYear() === Number(year);
        return true;
      })();

      // Page-wise filter
      const matchesPage = (() => {
        if (!page) return true;
        // Match by departmentId or officeId or pageId depending on dataset
        if (category === "news" && item.pageId)
          return String(item.pageId) === String(page);
        if (category === "events" && item.pageId)
          return String(item.pageId) === String(page);
        if (category === "achievements" && item.pageId)
          return String(item.pageId) === String(page);
        if (category === "notices" && item.pageId)
          return String(item.pageId) === String(page);
        if (category === "newsMedia" && item.pageId)
          return String(item.pageId) === String(page);
        if (category === "procurements" && item.pageId)
          return String(item.pageId) === String(page);
        if (category === "admissionResults" && item.pageId)
          return String(item.pageId) === String(page);

        // If your data uses departmentId or officeId instead of pageId:
        if (item.departmentId && String(item.departmentId) === String(page))
          return true;
        if (item.officeId && String(item.officeId) === String(page))
          return true;

        return false;
      })();

      return matchesYear && matchesPage;
    });
  }, [
    category,
    year,
    page,
    archivedNews,
    archivedEvents,
    archivedAchievements,
    archivedNotices,
    archivedAdmissionResults,
    archivedNewsMediaData,
    archivedProcurements,
  ]);

  const [visibleCount, setVisibleCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Optional: scroll to top on page change
  };

  const start = (currentPage - 1) * itemsPerPage;
  const visibleItems = filteredItems.slice(start, start + itemsPerPage);

  return (
    <div className="container">
      <section className="archive-container">
        <div className="archive-header">
          <h3>Archive</h3>
          <div className="archive-filters">
            <div className="filter-select">
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setYear("");
                  setVisibleCount(20);
                  setCurrentPage(1);
                }}
              >
                <option value="">Select Category</option>
                <option value="news">News</option>
                <option value="events">Events</option>
                <option value="achievements">Achievements</option>
                <option value="notices">Notices</option>
                <option value="admissionResults">Admission Results</option>
                <option value="newsMedia">News Media</option>
                <option value="procurements">Procurements</option>
              </select>
              <Icon
                icon="material-symbols:keyboard-arrow-down-rounded"
                className="select-icon"
              />
            </div>

            <div className="filter-select">
              <select
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                  setVisibleCount(10);
                }}
                disabled={!category || years.length === 0}
              >
                <option value="">Select Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <Icon
                icon="material-symbols:keyboard-arrow-down-rounded"
                className="select-icon"
              />
            </div>

            <div className="filter-select">
              <select
                value={page}
                onChange={(e) => {
                  setPage(e.target.value);
                  setVisibleCount(10);
                }}
                disabled={!category || pages?.length === 0}
              >
                <option value="">Select Page</option>
                {filteredPages?.map((y) => (
                  <option key={y.id} value={y.id}>
                    {y.label}
                  </option>
                ))}
              </select>
              <Icon
                icon="material-symbols:keyboard-arrow-down-rounded"
                className="select-icon"
              />
            </div>
            <button
    className="button-outline primary-button-outline clear-filters-btn"
    onClick={() => {
      setCategory("");
      setYear("");
      setPage("");
      setVisibleCount(10);
      setCurrentPage(1);
    }}
  >
    Clear Filters
  </button>
          </div>
        </div>
        <hr style={{ padding: "0.25px" }} className="mt-4 mb-5" />
        <div className="archive-table-wrapper">
          {!category ? (
            <p className="no-data">Please choose a category to show data</p>
          ) : filteredItems.length === 0 ? (
            <p className="no-data">No data found for the selected year</p>
          ) : (
            <>
              <table className="archive-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {category === "news" &&
                          `${item?.label} - ${new Date(
                            item?.date
                          ).toDateString()}`}
                        {category === "events" &&
                          `${item?.title} - ${
                            item?.fromDate
                              ? new Date(item?.fromDate).toDateString()
                              : "No Date"
                          }`}
                        {category === "achievements" &&
                          `${item?.label} - ${new Date(
                            item?.date
                          ).toDateString()}`}
                        {category === "notices" &&
                          `${item?.label} - ${new Date(
                            item?.date
                          ).toDateString()}`}
                        {category === "admissionResults" &&
                          `${item?.title} - ${new Date(
                            item?.publishDate
                          ).toDateString()}`}
                        {category === "newsMedia" &&
                          `${item?.label} - ${new Date(
                            item?.date
                          ).toDateString()}`}
                        {category === "procurements" &&
                          `${item?.title} - ${new Date(
                            item?.publishDate
                          ).toDateString()}`}
                      </td>
                      <td className="action-cell">
                        {category === "admissionResults" && item?.fileUrl && (
                          <button
                            className="button-outline primary-button-outline"
                            onClick={() => handlePreview(item?.fileUrl)}
                          >
                            View
                          </button>
                        )}
                        {category === "procurements" && item?.fileUrl && (
                          <button
                            className="button-outline primary-button-outline"
                            onClick={() => handlePreview(item?.fileUrl)}
                          >
                            View
                          </button>
                        )}
                        {category === "newsMedia" && (
                          <Link
                            href={`/pages/news-media-details/${item?.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button-outline primary-button-outline"
                          >
                            Open Link
                          </Link>
                        )}
                        {["news", "events", "achievements", "notices"].includes(
                          category
                        ) && (
                          <Link
                            href={
                              category === "news"
                                ? `/pages/news-details/${item?.slug}`
                                : category === "events"
                                ? `/pages/event-details/${item?.slug}`
                                : category === "achievements"
                                ? `/pages/achievement-details/${item?.slug}`
                                : `/pages/notice-details/${item?.slug}`
                            }
                            className="button-outline primary-button-outline"
                          >
                            Open
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="custome-pagination text-center my-4">
                <button
                  className="page-btn arrow-btn"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <Icon icon="ep:arrow-left" width="20" height="20" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => {
                  // Logic to show first 2, last 2, current ±1, and "..." in between
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
            </>
          )}
        </div>

        <PdfViewer
          url={pdfUrl}
          title="PDF Preview"
          open={pdfOpen}
          onClose={() => setPdfOpen(false)}
        />
      </section>
    </div>
  );
};

export default ArchiveFilter;
