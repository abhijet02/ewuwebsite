"use client";

import Image from "next/image";
import "./ClubNewsAll.scss";
import { Icon } from "@iconify/react";
import { FC } from "react";
import moment from "moment";
import Link from "next/link";
import { usePageData } from "@lib/hooks/usePageData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const ClubNewsAll: FC = () => {
  const { paramNews: news, pageParams } = usePageData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <>
      <section className="club-news-all-part">
        <div className="container">
          <div className="club-news-all-header">
            <div className="common-header">
              <h3>All Latest News</h3>
            </div>
          </div>
          <div className="row">
            {news?.map((item, index) => (
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
                key={index}
              >
                <div className="club-news-box">
                  <div className="club-news-img">
                    <Image
                      src={item?.thumbnail}
                      width={400}
                      height={400}
                      alt="news box"
                    />
                  </div>
                  <div className="club-news-icon">
                    <Icon
                      icon="material-symbols:date-range-outline-rounded"
                      width="16"
                      height="16"
                    />
                    {moment(
                      item.date instanceof Date
                        ? item.date
                        : new Date(item.date)
                    ).format("MMMM D, YYYY")}
                  </div>
                  <h2>{item.label}</h2>
                  <p>{item.reporterName}</p>
                  <Link
                    href={`/pages/club-news-details/${item.slug}?pageId=${pageParams}`}
                  >
                    View Details
                    <Icon
                      icon="si:arrow-right-duotone"
                      width="20"
                      height="20"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ClubNewsAll;
