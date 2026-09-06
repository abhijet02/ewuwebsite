"use client";

import { FC, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./NoticeListTwo.scss";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { noticeActions } from "@lib/slices/notice/notice.slice";
import { Notice } from "@lib/services/notice/notice.service.type";
import { pageActions } from "@lib/slices/page/page.slice";
import moment from "moment";
import { renderSafeHTML } from "@lib/utils/html2text";
import Link from "next/link";
import { usePageData } from "@lib/hooks/usePageData";

const NoticeListTwo: FC = () => {
  const { pageNotices: notices } = usePageData();

  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);

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
    <div className="second-notice-section">
      <div className="container">
        <div className="row">
          {/* <!-- Notice Panel --> */}
          <div className="col-md-8">
            <div className="notice-panel">
              <h2>Notice</h2>
              <hr />

              <ul
                className="nav nav-pills nav-justified mb-3"
                id="pills-tab"
                role="tablist"
              >
                {notices?.length > 0 &&
                  notices?.map((item, index) => (
                    <li className="nav-item" role="presentation" key={index}>
                      <button
                        className={`nav-link ${
                          activeTab === item.category ? "active" : ""
                        }`}
                        id={`pills-${item.category}-tab`}
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
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id={`tab-${activeTab}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${activeTab}`}
                  tabIndex={0}
                >
                  <div className="notice-scroll">
                    {notices
                      ?.filter((item) => item.category === activeTab)
                      .map((item, index) => (
                        <div className="notice-item" key={index}>
                          <p className="notice-subject">{item.label}</p>
                          <p className="notice-details">
                            {renderSafeHTML(
                              item.description.slice(0, 480) + "..."
                            )}
                          </p>
                          <span className="notice-date">
                            <Icon
                              className="for-adjust"
                              icon="uil:calender"
                              width="20"
                            />
                            {moment(item.date).format("DD MMM, YYYY")}
                          </span>
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

          {/* <!-- Profile Panel --> */}
          <div className="col-lg-4">
            <div className="social-part">
              <div className="social-part-main">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fmyewu%2F&tabs=timeline&width=400&height=600&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=true&appId"
                  style={{
                    border: "none",
                    width: "100%",
                    minWidth: "400px",
                    height: "600px",
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
    </div>
  );
};

export default NoticeListTwo;
