"use client";

import React, { useEffect, useState } from "react";
import "./NewsLetter.scss";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { yearlyViewActions } from "@lib/slices/yearlyView/yearlyView.slice";
import { usePathname } from "next/navigation";
import { pageActions } from "@lib/slices/page/page.slice";
import Image from "next/image";
import PdfViewer from "@/app/components/PdfViewer/PdfViewer";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";

const NewsLetter: React.FC = () => {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);
  const pageId = pages?.find((page) => page.link === pathName)?.id;

  const yearlyViews = useAppSelector(
    (state) => state.yearlyView.getYearlyViewsResponse?.yearlyViews
  );
  const vcNewsletter = pathName === "/pages/vc-newsletter";
  const [titleSearch, setTitleSearch] = useState<string>("");
  const [yearSearch, setYearSearch] = useState<string>("");

  useEffect(() => {
    dispatch(
      yearlyViewActions.getYearlyViews({ request: { page: 1, limit: 500 } })
    );
    dispatch(pageActions.getPages({ request: { page: 0, limit: 500 } }));
  }, [dispatch]);

  const yearlyViewByPage = yearlyViews?.filter(
    (item) => item.pageId === pageId
  );

  const yearlyViewByYear = yearlyViewByPage?.reduce((acc, item) => {
    const year = parseInt(item.year);
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {} as Record<number, typeof yearlyViewByPage>);

  const filteredYearlyViewByYear = yearSearch
    ? Object.keys(yearlyViewByYear || {})
        .filter((yearStr) => yearStr.includes(yearSearch))
        .reduce((acc, yearStr) => {
          acc[Number(yearStr)] = yearlyViewByYear![Number(yearStr)];
          return acc;
        }, {} as Record<number, typeof yearlyViewByPage>)
    : yearlyViewByYear;

  const filteredYearsDesc = filteredYearlyViewByYear
    ? Object.keys(filteredYearlyViewByYear).sort(
        (a, b) => Number(b) - Number(a)
      )
    : [];

  const initialTabYear = filteredYearsDesc.length
    ? Number(filteredYearsDesc[0])
    : 0;

  const [activeTab, setActiveTab] = useState<number>(initialTabYear);
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const [pdfModal, setPdfModal] = useState<{
    url: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    if (
      filteredYearsDesc.length > 0 &&
      !filteredYearsDesc.includes(String(activeTab))
    ) {
      setActiveTab(Number(filteredYearsDesc[0]));
    }
  }, [filteredYearsDesc, activeTab]);

  const handleDownload = async (url: string, filename: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <section className="yearly-view-part">
      <div {...(!isStatic ? { "data-aos": "zoom-in" } : {})}>
        <div className="yearly-view-info">
          {/* Filters row */}
          <div className="yearly-view-filters">
            <div className="form-group">
              <label>Search by Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter title..."
                value={titleSearch}
                onChange={(e) => setTitleSearch(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Select by Year</label>
              <select
                className="form-select"
                value={activeTab}
                onChange={(e) => setActiveTab(Number(e.target.value))}
              >
                {filteredYearsDesc.map((yearStr) => {
                  const year = Number(yearStr);
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Yearly views */}
          <div className="tab-content">
            <div className="row">
              {filteredYearlyViewByYear?.[activeTab]
                ?.filter(
                  (item) =>
                    item.pageId === pageId &&
                    (!titleSearch ||
                      item.title
                        ?.toLowerCase()
                        .includes(titleSearch.toLowerCase()))
                )
                ?.map((item, index) => (
                  <div
                    key={index}
                    className="col-12 col-sm-6 col-md-6 col-lg-4 mb-3 "
                  >
                    <div className="news-letter-card">
                      <div
                        className={`${
                          pathName === "/pages/vc-newsletter"
                            ? "yearly-vc-newsletter-view-img-wrapper"
                            : "yearly-newsletter-view-img-wrapper"
                        }`}
                      >
                        <Image
                          src={item?.photoUrl}
                          alt={item.title || "Yearly View"}
                          width={800} // provide a large enough width
                          height={0}
                          sizes="100vw"
                          className="yearly-view-img"
                        />
                      </div>

                      <div className="yearly-view-card">
                        {item.title && (
                          <h5 className="yearly-view-title">{item.title}</h5>
                        )}

                        <div className="yearly-view-buttons">
                          {[
                            {
                              name: item.attachment1Name,
                              url: item.attachment1Url,
                            },
                            {
                              name: item.attachment2Name,
                              url: item.attachment2Url,
                            },
                          ]
                            .filter((att) => att.name && att.url)
                            .map((att, idx) => (
                              <div key={idx} className="yearly-view-btn-group">
                                <button
                                  className="news-letter-preview-button"
                                  onClick={() =>
                                    setPdfModal({
                                      url: att.url,
                                      title: att.name,
                                    })
                                  }
                                >
                                  Preview
                                </button>
                                <button
                                  className="news-letter-download-button"
                                  onClick={() =>
                                    handleDownload(att.url, att.name)
                                  }
                                >
                                  Download
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {pdfModal && (
        <PdfViewer
          url={pdfModal.url}
          title={pdfModal.title}
          open={!!pdfModal}
          onClose={() => setPdfModal(null)}
        />
      )}
    </section>
  );
};

export default NewsLetter;
