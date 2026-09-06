"use client";

import { FC } from "react";
import { Icon } from "@iconify/react";
import "./ClubNoticeAll.scss";
import { usePageData } from "@lib/hooks/usePageData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const ClubNoticeAll: FC = () => {
  const { paramNotices: notices } = usePageData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <section className="notice-part">
      <div className="container">
        <div className="notice-title">
          <h2>See All Notices</h2>
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
                notices?.map((notice) => (
                  <div key={notice.id} className="event-box">
                    <div className="event-date">
                      <h1>{new Date(notice.date).getDay()}</h1>
                      <p>
                        {new Date(notice.date).toLocaleString("default", {
                          month: "short",
                        })}
                      </p>
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

export default ClubNoticeAll;
