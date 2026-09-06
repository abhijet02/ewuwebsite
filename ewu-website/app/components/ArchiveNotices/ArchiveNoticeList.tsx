"use client";

import { FC } from "react";
import { Icon } from "@iconify/react";
import "./ArchiveNoticeList.scss";
import { usePageData } from "@lib/hooks/usePageData";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";

const ArchiveNoticeAll: FC = () => {
  const { archivedNotices: notices } = usePageData();

  const searchParams = useSearchParams();

  const year = searchParams.get("year");

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <section className="notice-part">
      <div className="container">
        <div className="notice-title">
          <h2>All Notices of {year}</h2>
          {/* <a href="#">
            View All
            <Icon icon="si:arrow-right-duotone" width="20" height="20" />
          </a> */}
        </div>
        <div className="row">
          <div
            {...(!isStatic
              ? {
                  "data-aos":
                    window.innerWidth < 800 ? "fade-up" : "fade-right",
                }
              : {})}
            className="col-lg-12"
          >
            <div className="event-main">
              {notices &&
                notices.length > 0 &&
                notices
                  ?.filter(
                    (item) =>
                      new Date(item.date).getFullYear().toString() === year
                  )
                  .map((notice) => (
                    <div key={notice.id} className="event-box">
                      <div className="event-date">
                        <h1>{moment(notice.date).format("DD")}</h1>
                        <p>{moment(notice.date).format("MMM")}</p>
                      </div>
                      <div className="event-info">
                        <h4>{notice.label}</h4>
                        <div className="d-flex gap-3">
                          <p className="d-flex align-items-center gap-1">
                            <Icon icon="wi:time-4" width="20" height="20" />
                            <span>
                              {new Date(notice.date).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </p>
                          <p className="d-flex align-items-center gap-1">
                            <Icon
                              icon="mingcute:location-2-line"
                              width="20"
                              height="20"
                            />
                            <span>{notice.location}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchiveNoticeAll;
