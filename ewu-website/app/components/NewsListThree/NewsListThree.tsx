"use client";

import { FC, useEffect } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import "./NewsListThree.scss";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { newsActions } from "@lib/slices/news/news.slice";
import { pageActions } from "@lib/slices/page/page.slice";
import { News } from "@lib/services/news/news.service.type";
import moment from "moment";
import { renderSafeHTML } from "@lib/utils/html2text";
import Link from "next/link";
import { usePageData } from "@lib/hooks/usePageData";

const NewsListThree: FC = () => {
  const { pageNews: news } = usePageData();

  return (
    <div className="third-latest-news-section">
      <div className="container">
        <div className="col-lg-12">
          <h2 className="latest-news-head">Latest From Our News</h2>
          <div className="latest-news-card-contents">
            <div className="row">
              {/* <!-- Card 1 --> */}
              {news
                ?.map((item, index) => (
                  <div key={index} className="col-md-4">
                    <div className="news-card">
                      <div className="date-badge">
                        <div>{moment(item.date).format("DD")}</div>
                        <div>{moment(item.date).format("MMM")}</div>
                      </div>
                      <Image
                        className="img-fluid"
                        src={item?.thumbnail}
                        width={415}
                        height={415}
                        alt="News Banner"
                      />{" "}
                      <div className="card-outer-body">
                        <div className="card-inner-body">
                          <h3 className="latest-news-title">{item.label}</h3>{" "}
                          <p className="latest-news-details">
                            {renderSafeHTML(
                              item.description?.slice(0, 100) + "..."
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                .slice(0, 3)}
            </div>
          </div>

          <div className="view-all-btn-wrapper">
            <Link href={`/pages/news`} className="view-all-btn">
              View All
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
    </div>
  );
};

export default NewsListThree;
