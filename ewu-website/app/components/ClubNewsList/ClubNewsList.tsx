"use client";

import Image from "next/image";
import "./ClubNewsList.scss";
import { Icon } from "@iconify/react";
import moment from "moment";
import Link from "next/link";
import { usePageData } from "@lib/hooks/usePageData";
import { useClubData } from "@lib/hooks/useClubData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useParams } from "next/navigation";
const ClubNewsList: React.FC = () => {
  const { pageId, pageNews } = usePageData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const firstNews = pageNews?.[0];

  const { dynamicStyles } = useClubData();

  const { slug } = useParams();

  return (
    <>
      <section className="recent-news-part" style={dynamicStyles}>
        <div className="container">
          <div className="recent-news-header">
            <div className="common-header">
              <p className="highlight-text">RECENT NEWS</p>
              <h2>
                Latest from our <span className="mark-blue">news</span>
              </h2>
            </div>
            <div className="recent-news-all">
              <Link href={`/pages/club-news-all/${slug}?pageId=${pageId}`}>
                View All
                <Icon icon="si:arrow-right-duotone" width="20" height="20" />
              </Link>
            </div>
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
                    href={`/pages/club-news-details/${firstNews.slug}?pageId=${pageId} `}
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
                      <Link
                        key={index}
                        href={`/pages/club-news-details/${news.slug}?pageId=${pageId}`}
                      >
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
                                <Icon
                                  icon="gg:profile"
                                  width="20"
                                  height="20"
                                />
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
    </>
  );
};

export default ClubNewsList;
