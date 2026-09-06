"use client";

import React, { useEffect, useState } from "react";
import "./YearlyView.scss";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { yearlyViewActions } from "@lib/slices/yearlyView/yearlyView.slice";
import { usePathname } from "next/navigation";
import { pageActions } from "@lib/slices/page/page.slice";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const YearlyView: React.FC = () => {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const pageId = pages?.find((page) => page.link == pathName)?.id;

  const yearlyViews = useAppSelector(
    (state) => state.yearlyView.getYearlyViewsResponse?.yearlyViews
  );

  const [yearSearch, setYearSearch] = useState<string>("");

  useEffect(() => {
    dispatch(
      yearlyViewActions.getYearlyViews({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );

    dispatch(
      pageActions.getPages({
        request: {
          page: 0,
          limit: 500,
        },
      })
    );
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

  useEffect(() => {
    if (
      filteredYearsDesc.length > 0 &&
      !filteredYearsDesc.includes(String(activeTab))
    ) {
      setActiveTab(Number(filteredYearsDesc[0]));
    }
  }, [filteredYearsDesc, activeTab]);

  return (
    <>
      <section className="yearly-view-part">
        <div {...(!isStatic ? { "data-aos": "zoom-in" } : {})}>
          <div className="yearly-view-info">
            <div className="yearly-view-tabs">
              {/* Search box */}
              <div className="year-search-box mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by year (e.g., 2024)"
                  value={yearSearch}
                  onChange={(e) => setYearSearch(e.target.value)}
                />
              </div>

              {/* Tabs */}
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                {filteredYearsDesc.map((yearStr) => {
                  const year = Number(yearStr);
                  return (
                    <li className="nav-item" role="presentation" key={year}>
                      <button
                        className={`nav-link ${
                          activeTab === year ? "active" : ""
                        }`}
                        type="button"
                        onClick={() => setActiveTab(year)}
                      >
                        {year}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Tab content */}
              <div className="tab-content" id="pills-tabContent">
                <div className="row">
                  {filteredYearlyViewByYear?.[activeTab]
                    ?.filter((item) => item.pageId === pageId)
                    ?.map((item, index) => (
                      <div
                        className="col-md-12 col-lg-6 col-sm-12 col-12 mb-4"
                        key={index}
                      >
                        <div
                          style={{
                            boxShadow:
                              "0 0 2px 0 rgba(145 158 171 / 20%), 0 12px 24px -4px rgba(145 158 171 / 12%)",
                            background: "#FFF",
                            borderRadius: "16px",
                            overflow: "hidden",
                          }}
                        >
                          {item.photoUrl && (
                            <Image
                              src={item.photoUrl}
                              alt={item.title || "Yearly View"}
                              className="card-img-top"
                              width={1000} // Optional, sets the natural width for next/image
                              height={800} // Optional, sets the natural height for next/image
                              style={{
                                width: "100%", // makes image responsive
                                height: "auto", // preserves natural height
                                objectFit: "contain", // ensures full image is visible
                              }}
                            />
                          )}

                          <div style={{ padding: "16px 8px" }}>
                            {item.title && (
                              <h5 className="card-title">{item.title}</h5>
                            )}

                            {item.attachment1Url && (
                              <div className="mt-2">
                                <Link
                                  href={item.attachment1Url}
                                  target="_blank"
                                  className="card-link"
                                >
                                  {item.attachment1Name}
                                </Link>
                              </div>
                            )}

                            {item.attachment2Url && (
                              <div className="mt-2">
                                <Link
                                  href={item.attachment2Url}
                                  target="_blank"
                                  className="card-link"
                                >
                                  {item.attachment2Name}
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default YearlyView;
