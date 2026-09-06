"use client";

import Image from "next/image";
import "./ArchiveNewsAll.scss";
import { Icon } from "@iconify/react";
import { FC } from "react";
import moment from "moment";
import Link from "next/link";
import { usePageData } from "@lib/hooks/usePageData";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";

const ArchiveNewsAll: FC = () => {
  const { archivedNews: news } = usePageData();

  const searchParams = useSearchParams();

  const year = searchParams.get("year");

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <>
      <section className="latest-news-part">
        <div className="container">
          <div className="latest-news-header">
            <div className="common-header">
              {/* <p>See All Latest News</p> */}
              <h2>All News of {year}</h2>
            </div>
          </div>
          <div className="row">
            {news
              ?.filter(
                (item) => new Date(item.date).getFullYear().toString() === year
              )
              ?.map((item, index) => (
                <div
                  {...(!isStatic
                    ? {
                        "data-aos":
                          window.innerWidth < 800
                            ? "fade-up" // all items fade-up on small screens
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
                  <div className="latest-news-box">
                    <div className="latest-news-img">
                      <Image
                        src={item?.thumbnail}
                        width={400}
                        height={400}
                        alt="news box"
                      />
                    </div>
                    <div className="latest-news-icon">
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
                    <Link href={`/pages/news-details/${item.id}`}>
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

export default ArchiveNewsAll;
