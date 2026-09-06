"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import "./NewsListShort.scss";
import { stripHTMLAndLimitWords } from "@lib/utils/html2text";
import { usePageData } from "@lib/hooks/usePageData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import Link from "next/link";
import { useViewAllLink } from "@lib/hooks/useViewAllLink";

const NewsListShort = () => {
  const { pageId, pageNews: news } = usePageData();
  const viewAllLink = useViewAllLink({ componentName: "NewsListShort" });

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <section className="department-page-latest-news-part">
      <div className="container">
        <div className="header-with-view-all-button">
          <h2>Latest News</h2>
          <Link href={viewAllLink || ""} className="for-all-view-all-button">
            View All
            <Icon icon="si:arrow-right-duotone" width="20" height="20" />
          </Link>
        </div>
        <div className="row">
          {news &&
            news
              ?.map((nw, index) => (
                <div
                  {...(!isStatic
                    ? {
                        "data-aos":
                          window.innerWidth < 800
                            ? "fade-up" // all items on small screens
                            : index === 0
                            ? "fade-right"
                            : index === news.length - 1
                            ? "fade-left"
                            : "zoom-in", // middle items on large screens
                      }
                    : {})}
                  className="col-lg-4 my-2"
                  key={nw?.id}
                >
                  <Link
                    className="latest-news-box"
                    href={`/pages/news-details/${nw?.slug}`}
                  >
                    <div className="latest-news-img">
                      <Image
                        src={nw?.thumbnail}
                        width={400}
                        height={400}
                        alt="News Thumbnail"
                      />
                    </div>
                    <div className="latest-news-icon">
                      <Icon
                        icon="material-symbols:date-range-outline-rounded"
                        width="16"
                        height="16"
                      />
                      <p>{new Date(nw?.date.toString()).toDateString()}</p>
                    </div>
                    <h2>{nw?.label}</h2>
                    <p>{stripHTMLAndLimitWords(nw?.description, 14)}</p>
                    <div className="department-page-latest-news-view-button">
                      View Details
                      <Icon
                        icon="si:arrow-right-duotone"
                        width="20"
                        height="20"
                      />
                    </div>
                  </Link>
                </div>
              ))
              .slice(0, 3)}
        </div>
      </div>
    </section>
  );
};

export default NewsListShort;
