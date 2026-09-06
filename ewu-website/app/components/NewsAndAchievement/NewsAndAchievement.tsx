"use client";

import { FC } from "react";
import "./NewsAndAchievement.scss";
import Image from "next/image";
import { Icon } from "@iconify/react";
import moment from "moment";
import { renderSafeHTML } from "@lib/utils/html2text";
import Link from "next/link";
import { usePageData } from "@lib/hooks/usePageData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/store";

const NewsAndAchievement: FC = () => {
  const { pageNews: news, pageAchievements: achievements } = usePageData();

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <div className="news-achievements-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            {/* <!-- Section Heading --> */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="upcoming-event-title">Latest From Our News</h2>
              <Link href={`/pages/news`} className="dates-main-btn">
                View All
                <Icon
                  className="dates-arrow"
                  icon="eva:diagonal-arrow-right-up-outline"
                  width="18"
                  height="18"
                />
              </Link>
            </div>

            {/* <!-- News Item --> */}
            {news
              ?.map((item, index) => (
                <div key={index} className="news-item">
                  <Image
                    {...(!isStatic ? { "data-aos": "fade-up-right" } : {})}
                    src={item?.thumbnail}
                    width={300}
                    height={365}
                    alt="News-Banner"
                  />{" "}
                  <div
                    {...(!isStatic ? { "data-aos": "zoom-in-left" } : {})}
                    className="news-box"
                  >
                    <a className="news-btn" href="">
                      News
                    </a>{" "}
                    <a href="" className="news-title">
                      {item?.label}
                    </a>
                    <div className="news-meta">
                      <Icon
                        icon="carbon:user-avatar-filled-alt"
                        className="for-margin"
                        width="20"
                      />{" "}
                      {item?.reporterName}
                      <Icon
                        icon="clarity:date-line"
                        className="for-margin"
                        width="20"
                      />{" "}
                      {moment(item?.date).format("DD MMM, YYYY")}
                    </div>
                    <div className="news-description">
                      {renderSafeHTML(
                        item?.description?.slice(0, 220) + " ..."
                      )}
                    </div>
                  </div>
                </div>
              ))
              .slice(0, 2)}
          </div>

          <div className="col-lg-6">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="upcoming-event-title">Our Achievements</h2>
              <a href={`/pages/achievements`} className="dates-main-btn">
                View All
                <Icon
                  className="dates-arrow"
                  icon="eva:diagonal-arrow-right-up-outline"
                  width="18"
                  height="18"
                />
              </a>
            </div>

            {/* <!-- Repeatable Achievement Cards --> */}
            {achievements
              ?.map((item, index) => (
                <div key={index} className="achievement-card">
                  <Image
                    {...(!isStatic ? { "data-aos": "zoom-out" } : {})}
                    src={item?.thumbnail}
                    width={280}
                    height={280}
                    alt="News Banner"
                  />{" "}
                  <div
                    {...(!isStatic
                      ? {
                          "data-aos":
                            window.innerWidth < 800 ? "fade-up" : "fade-left",
                        }
                      : {})}
                    className="achievement-content"
                  >
                    <div className="achievement-date">
                      Achievement On :{" "}
                      {moment(item?.date).format("DD MMM, YYYY")}
                    </div>
                    <p className="achievement-description">{item?.label}</p>
                    <a href="#" className="view-details-btn">
                      View Details{" "}
                      <Icon
                        className="dates-arrow"
                        icon="eva:diagonal-arrow-right-up-outline"
                        width="20"
                      />
                    </a>
                  </div>
                </div>
              ))
              .slice(0, 2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAndAchievement;
