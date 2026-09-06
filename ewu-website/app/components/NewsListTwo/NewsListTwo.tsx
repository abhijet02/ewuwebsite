"use client";

import Image from "next/image";
import "./NewsListTwo.scss";
import { Icon } from "@iconify/react";
import moment from "moment";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useNewsData } from "@lib/hooks/useNewsData";
import { useViewAllLink } from "@lib/hooks/useViewAllLink";

const NewsListTwo: React.FC = () => {
  const { pageId, pageNews } = useNewsData();
  const viewAllLink = useViewAllLink({ componentName: "NewsListTwo" });

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const firstNews = pageNews?.[0];

  return (
    <section className="recent-news-part">
      <div className="container">
        <div className="header-with-view-all-button">
          <h2>Latest news</h2>
          <Link href={viewAllLink || ""} className="for-all-view-all-button">
            View All
            <Icon icon="si:arrow-right-duotone" width="20" height="20" />
          </Link>
        </div>
        <div className="recent-news-main mt-4">
          <div className="row">
            <div
              {...(!isStatic
                ? {
                    "data-aos":
                      window.innerWidth < 800 ? "fade-up" : "fade-right",
                  }
                : {})}
              className="col-lg-6"
            >
              {firstNews && (
                <Link
                  href={`/pages/news-details/${firstNews.slug}`}
                  className="news-img d-block"
                >
                  <Image
                    src={firstNews?.thumbnail}
                    width={600}
                    height={600}
                    alt="news img"
                  />
                  <div className="news-info">
                    <div className="news-timeline">
                      <div>
                        <Icon icon="gg:profile" width="20" height="20" />
                        {firstNews.reporterName}
                      </div>
                      <div>
                        <Icon
                          icon="material-symbols:date-range-outline-rounded"
                          width="20"
                          height="20"
                        />
                        {moment(firstNews.date).format("MMMM D, YYYY")}
                      </div>
                    </div>
                    <h2>{firstNews.label}</h2>
                  </div>
                </Link>
              )}
            </div>
            <div
              {...(!isStatic
                ? {
                    "data-aos":
                      window.innerWidth < 800 ? "fade-up" : "fade-left",
                  }
                : {})}
              className="col-lg-6"
            >
              <div className="news-right">
                {pageNews &&
                  pageNews.length > 0 &&
                  pageNews?.slice(1, 4)?.map((news, index) => (
                    <Link key={index} href={`/pages/news-details/${news.slug}`}>
                      <div className="news-box">
                        <div className="news-box-img">
                          <Image
                            src={news?.thumbnail}
                            width={200}
                            height={200}
                            alt="news img"
                          />
                        </div>
                        <div className="news-info">
                          <div className="news-timeline">
                            <div>
                              <Icon icon="gg:profile" width="20" height="20" />
                              {news.reporterName}
                            </div>
                            <div>
                              <Icon
                                icon="material-symbols:date-range-outline-rounded"
                                width="20"
                                height="20"
                              />
                              {moment(news.date).format("MMMM D, YYYY")}
                            </div>
                          </div>
                          <h2>{news.label}</h2>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsListTwo;
