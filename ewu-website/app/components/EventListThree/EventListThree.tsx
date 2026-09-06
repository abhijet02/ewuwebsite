"use client";

import { FC } from "react";
import "./EventListThree.scss";
import { Icon } from "@iconify/react";
import moment from "moment";
import { renderSafeHTML } from "@/lib/utils/html2text";
import { usePageData } from "@lib/hooks/usePageData";

const EventListThree: FC = () => {
  const { pageEvents: events } = usePageData();

  return (
    <div className="third-dates-section third-events-section">
      <div className="container">
        <h2 className="upcoming-event-section mb-5">Upcoming Events</h2>

        <div className="row g-4">
          {events?.map((item, index) => (
            <div key={index} className="col-md-4">
              <div className="event-card d-flex">
                <div key={index} className="d-flex">
                  <div className="event-date">
                    <div className="day">
                      {moment(item.fromDate).format("D")}
                    </div>
                    <div className="month">
                      {moment(item.fromDate).format("MMM")}
                    </div>
                  </div>
                  <div className="event-details">
                    <h6>{item.title}</h6>
                    <p className="supply-text">
                      {renderSafeHTML(item.description.slice(0, 150) + "...")}
                    </p>
                    <div className="d-flex align-items-center ">
                      <p className="date-duration me-3">
                        <Icon icon="fa6-solid:school" width="16" />{" "}
                        {item.location}
                      </p>
                      <p className="person">
                        <Icon icon="tdesign:time" width="15" />{" "}
                        {item?.fromDate && item?.toDate
                          ? moment(item.fromDate).isSame(item.toDate, "day")
                            ? moment(item.fromDate).format("D MMM, YYYY")
                            : `${moment(item.fromDate).format(
                                "D MMM, YYYY"
                              )} - ${moment(item.toDate).format("D MMM, YYYY")}`
                          : moment(item?.fromDate).format("D MMM, YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventListThree;
