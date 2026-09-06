"use client";

import { FC } from "react";
import "./ClubEventAll.scss";
import { Icon } from "@iconify/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import moment from "moment";
import { usePageData } from "@lib/hooks/usePageData";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const ClubEventAll: FC = () => {
  const { paramEvents: events, pageParams } = usePageData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <>
      <section className="latest-news-part">
        <div className="container">
          <div className="latest-news-header">
            <div className="common-header">
              <h2>See All Events</h2>
              {/* <h2>Events</h2> */}
            </div>
          </div>
          <div className="row">
            {events?.map((item, index) => (
              <div
                {...(!isStatic
                  ? {
                      "data-aos":
                        window.innerWidth < 800
                          ? "fade-up" // all items fade-up on small screens
                          : index === 0
                          ? "fade-right"
                          : index === events.length - 1
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
                      src={item?.attachmentUrl}
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
                      item.fromDate instanceof Date
                        ? item.fromDate
                        : new Date(item.fromDate)
                    ).format("MMMM D, YYYY")}
                  </div>
                  <h2>{item.title}</h2>

                  <Link
                    href={`/pages/club-event-details/${item?.slug}?pageId=${pageParams}`}
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

export default ClubEventAll;
