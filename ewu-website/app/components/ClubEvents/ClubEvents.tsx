"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import "./ClubEvents.scss";
import { usePageData } from "@lib/hooks/usePageData";
import { useClubData } from "@lib/hooks/useClubData";
import { useParams } from "next/navigation";

const ClubEvents: React.FC = () => {
  const { pageEvents, pageId } = usePageData();

  const { dynamicStyles } = useClubData();

  const { slug } = useParams();

  return (
    <div className="recent-clubs-events-part" style={{ ...dynamicStyles }}>
      <div className="container">
        <div className="row recent-clubs-events-items-row">
          <div className="col-lg-3">
            <div className="recent-clubs-events-title">
              <h1>Recent Events</h1>
            </div>
          </div>

          <div className="col-lg-7">
            <div>
              {pageEvents &&
                pageEvents.length > 0 &&
                pageEvents?.map((event) => (
                  <a
                    href={`/pages/club-event-details/${event?.slug}?pageId=${pageId}`}
                    className="recent-clubs-events-item"
                    key={event.id}
                  >
                    <div className="d-flex gap-3">
                      <div className="recent-clubs-events-date">
                        <h3>{new Date(event?.fromDate).getDate()}</h3>
                        <p>
                          {new Date(event?.fromDate).getMonth() + 1},{" "}
                          {new Date(event?.fromDate).getFullYear()}
                        </p>
                      </div>
                      <div
                        style={{
                          background: "#fff",
                          borderRadius: "12px",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={event?.attachmentUrl}
                          alt="news"
                          className="rounded"
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                    <div className="recent-clubs-events-info">
                      <h2>{event.title}</h2>
                      <div className="d-flex flex-column gap-3 mt-3">
                        <p className="d-flex align-items-center gap-2 m-0">
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                            }}
                          >
                            <Icon
                              icon="ion:time-outline"
                              width="24"
                              height="24"
                            />{" "}
                          </div>

                          <span>
                            {
                              new Date(event?.fromDate)
                                .toTimeString()
                                .split(" ")[0]
                            }
                          </span>
                        </p>
                        <p className="d-flex align-items-center gap-2 m-0">
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                            }}
                          >
                            <Icon icon="mi:location" width="24" height="24" />
                          </div>
                          <span>{event.location}</span>
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </div>
          <div className="col-lg-2">
            <div className="recent-clubs-events-view-all">
              <a href={`/pages/club-event-all/${slug}?pageId=${pageId}`}>
                View All
                <Icon icon="si:arrow-right-duotone" width="20" height="20" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubEvents;
