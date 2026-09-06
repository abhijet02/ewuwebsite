"use client";

import { Icon } from "@iconify/react";
import moment from "moment";
import "./EventList.scss";
import Link from "next/link";
import { useViewAllLink } from "@lib/hooks/useViewAllLink";
import { useEventData } from "@lib/hooks/useEventData";

const EventList: React.FC = () => {
  const { pageEvents: events } = useEventData();
  const viewAllLink = useViewAllLink({ componentName: "EventList" });

  const isLoading = !events || events.length === 0;
  return (
    <div className="mt-3">
      {!isLoading ? (
        <div className="header-with-view-all-button">
          <h2>Events</h2>
          <Link href={viewAllLink || ""} className="for-all-view-all-button">
            View All
            <Icon icon="si:arrow-right-duotone" width="20" height="20" />
          </Link>
        </div>
      ) : (
        <div className="header-with-view-all-button d-flex">
          <div
            className="skeleton skeleton-text"
            style={{ width: "60%" }}
          ></div>
          <div
            className="skeleton skeleton-text"
            style={{ width: "35%" }}
          ></div>
        </div>
      )}
      <div className="home-page-event-container">
        {events &&
          events?.slice(0, 5).map((event, index) => (
            <div key={event.id}>
              <Link
                href={`/pages/event-details/${event.slug}`}
                target="_blank"
                className="home-page-event-box"
              >
                <div className="home-page-event-date-box">
                  <h1>{moment(event.fromDate).format("D")}</h1>
                  <p>{moment(event.fromDate).format("MMM")}</p>
                </div>
                <div className="home-page-event-info-box">
                  <h4>{event.title}</h4>
                  <div className="home-page-event-location-date-all-box">
                    {event?.fromDate && (
                      <div className="home-page-event-location-date-box">
                        <div className="home-page-event-location-date-icon-box">
                          <Icon icon="wi:time-4" width="20" height="20" />
                        </div>
                        <p>
                          {event?.fromDate && event?.toDate
                            ? moment(event.fromDate).isSame(event.toDate, "day")
                              ? moment(event.fromDate).format(
                                  "ddd, D MMM, YYYY"
                                )
                              : `${moment(event.fromDate).format(
                                  "ddd, D MMM, YYYY"
                                )} - ${moment(event.toDate).format(
                                  "ddd, D MMM, YYYY"
                                )}`
                            : moment(event?.fromDate).format(
                                "ddd, D MMM, YYYY"
                              )}
                        </p>
                      </div>
                    )}

                    {event.location && (
                      <div className="home-page-event-location-date-box">
                        <div className="home-page-event-location-date-icon-box">
                          <Icon
                            icon="mingcute:location-2-line"
                            width="20"
                            height="20"
                          />
                        </div>
                        <p>{event.location}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
              {index !== 5 - 1 && <hr className="home-page-event-divider" />}
            </div>
          ))}
      </div>
    </div>
  );
};

export default EventList;
