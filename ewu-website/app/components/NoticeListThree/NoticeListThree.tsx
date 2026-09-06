"use client";

import { FC, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./NoticeListThree.scss";
import { useAppSelector } from "@lib/hooks";
import { Notice } from "@lib/services/notice/notice.service.type";
import moment from "moment";
import { renderSafeHTML } from "@lib/utils/html2text";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { usePageData } from "@lib/hooks/usePageData";

const NoticeListThree: FC = () => {
  const { pageNotices: notices } = usePageData();

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);

  // Find the page whose link contains 'home-page'
  const matchingPage = pages?.find((page) => page.label.includes("home-page"));

  // Manage active tab
  const [activeTab, setActiveTab] = useState(
    notices?.length > 0 ? notices[0].category : ""
  );

  // Update activeTab when notice content changes and set first one by default
  useEffect(() => {
    if (notices?.length > 0 && !activeTab) {
      setActiveTab(notices[0].category);
    }
  }, [notices]);

  return (
    <div className="third-notice-section">
      <div className="container">
        <div className="row">
          {/* <!-- Notice Container --> */}
          <div
            {...(!isStatic
              ? {
                  "data-aos":
                    window.innerWidth < 800 ? "fade-up" : "fade-right",
                }
              : {})}
            className="col-lg-8"
          >
            <div className="notice-panel">
              <h2>Notice</h2>
              <hr />

              {/* Notice Tabs */}
              <ul
                className="nav nav-pills nav-tabs nav-justified"
                id="pills-tab"
                role="tablist"
              >
                {/* Latest Notice Tab */}
                {notices?.length > 0 &&
                  notices.map((item, index) => (
                    <li className="nav-item" role="presentation" key={index}>
                      <button
                        className={`nav-link ${
                          activeTab === item.category ? "active" : ""
                        } exam-tab-btn`}
                        id={`pills-${item.category}-tab`}
                        data-bs-toggle="pill"
                        data-bs-target={`#pills-${item.category}`}
                        type="button"
                        role="tab"
                        aria-controls={`pills-${item.category}`}
                        aria-selected="false"
                        onClick={() => setActiveTab(item.category)}
                      >
                        {item.category}
                      </button>
                    </li>
                  ))}
              </ul>

              {/* Notice Tab  Contents */}
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id={`tab-${activeTab}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${activeTab}`}
                >
                  <div className="notice-scroll">
                    {notices
                      ?.filter((item) => item.category === activeTab)
                      .map((item, index) => (
                        <div className="notice-item d-flex" key={index}>
                          <div className="date-month-block text-center me-3">
                            <h1 className="notice-date">
                              {moment(item.date).format("DD")}
                            </h1>
                            <div className="notice-month">
                              {moment(item.date).format("MMM")}
                            </div>
                          </div>

                          <div className="notice-contents mb-3">
                            <p className="notice-subject">{item.label}</p>
                            <p className="notice-details">
                              {renderSafeHTML(
                                item.description?.slice(0, 480) + "..."
                              )}
                            </p>
                            <span className="notice-icon-date me-4">
                              <Icon
                                className="for-adjust"
                                icon="uil:calender"
                                width="18"
                              />
                              {moment(item.date).format("DD MMM, YYYY")}
                            </span>
                            <span className="notice-icon-date">
                              <Icon
                                className="for-adjust"
                                icon="fa6-solid:school"
                                width="16"
                              />
                              {item.location}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="view-all-btn-wrapper">
                <Link href={`/pages/notices`} className="view-all-btn">
                  View All Notice
                  <span>
                    <Icon
                      className="diagonal-arrow"
                      icon="eva:diagonal-arrow-right-up-outline"
                      width="18"
                      height="18"
                    />{" "}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* <!-- Socail iFrame Container --> */}
          <div
            {...(!isStatic ? { "data-aos": "fade-up" } : {})}
            className="col-lg-4"
          >
            <div className="social-part-main">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fmyewu%2F&tabs=timeline&width=400&height=600&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=true&appId"
                style={{
                  border: "none",
                  width: "100%",
                  height: "650px",
                }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeListThree;
