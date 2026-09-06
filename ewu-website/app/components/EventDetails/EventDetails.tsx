"use client";

import { FC, useState, useEffect } from "react";
import { renderSafeHTML } from "@lib/utils/html2text";
import Image from "next/image";
import { useNewsData } from "@lib/hooks/useAnnouncementData";
import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";
import PdfViewer from "../PdfViewer/PdfViewer";
import "./EventDetails.scss";
import ShareButtons from "../Share/ShareButtons";
import { usePathname } from "next/navigation";
import ArticlePageLayout from "../Share/ArticlePageLayout";

const EventDetails: FC = () => {
  const { filteredEvent } = useNewsData();
  const [pdfUrl, setPdfUrl] = useState("");
  const [timer, setTimer] = useState("");
  const path = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_LOCAL_FILE_PATH;
  const fullUrl = `${baseUrl}${path}`;
  const handlePreview = (url: string) => setPdfUrl(url);

  const getCountdown = (eventDate: string) => {
    if (!eventDate) return "";

    const now = moment();
    const event = moment(eventDate);

    if (event.isSame(now, "day")) return "Event Started";
    if (now.isAfter(event, "day")) return "Event Closed";

    const duration = moment.duration(event.diff(now));
    return `${Math.floor(
      duration.asDays()
    )}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
  };

  useEffect(() => {
    if (!filteredEvent?.fromDate) return;
    const eventDateString =
      typeof filteredEvent?.fromDate === "string"
        ? filteredEvent?.fromDate
        : filteredEvent?.fromDate.toISOString();

    setTimer(getCountdown(eventDateString));
    const interval = setInterval(() => {
      setTimer(getCountdown(eventDateString));
    }, 1000);

    return () => clearInterval(interval);
  }, [filteredEvent?.fromDate]);

  return (
    <ArticlePageLayout>
      <div className="events-details-wrapper">
        <div className="row g-3">
          <h3>{filteredEvent?.title}</h3>
          {/* LEFT SIDE */}
          <div className="col-md-8 left-side">
            <div className="event-cover-image-wrapper">
              <Image
                src={filteredEvent?.attachmentUrl}
                alt="Event Cover"
                fill
                sizes="100vw"
              />
              <div className="overlay-timer">{timer}</div>
            </div>
            <section className="image-for-print">
              <Image
                src={filteredEvent?.attachmentUrl}
                alt="Article Photo"
                className="news-details-media-file"
                width={650}
                height={300}
                style={{
                  objectFit: "contain",
                }}
              />
            </section>
            <div className="event-description">
              <h3>Event Details</h3>
              {renderSafeHTML(filteredEvent?.description)}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-4 right-side">
            <div className="event-details-card">
              <div className="header">
                <h2>Event Details</h2>
              </div>
              <div className="details">
                <div className="detail-item">
                  <div className="icon">
                    <Icon icon="uil:calender" width="20" height="20" />
                  </div>
                  <div>
                    <p>Start Time</p>
                    <p>
                      {filteredEvent?.fromDate &&
                        moment(filteredEvent?.fromDate).format(
                          "ddd, D MMM, YYYY"
                        )}
                    </p>
                  </div>
                </div>

                {filteredEvent?.location && (
                  <div className="detail-item">
                    <div className="icon">
                      <Icon icon="charm:map-pin" width="20" height="20" />
                    </div>
                    <div>
                      <p>Location</p>
                      <p>{filteredEvent?.location}</p>
                    </div>
                  </div>
                )}

                {filteredEvent?.attachments?.length > 0 && (
                  <div className="attachments-wrapper">
                    <button>Attachments</button>
                    <div className="attachments-list">
                      {filteredEvent.attachments.map((attachment) => (
                        <a
                          key={attachment.id}
                          onClick={() =>
                            handlePreview(attachment.attachmentUrl)
                          }
                        >
                          {attachment.attachmentName || "Unknown"}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SPEAKERS */}
        {filteredEvent?.eventSpeaker?.length > 0 && (
          <div className="speakers">
            <h3>Event Speakers</h3>
            <div className="row g-3">
              {filteredEvent.eventSpeaker.map((speaker) => (
                <div
                  key={speaker.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-4"
                >
                  <div className="speaker-card">
                    {speaker.photoUrl && (
                      <Image
                        src={speaker.photoUrl}
                        alt={speaker.name}
                        width={120}
                        height={120}
                      />
                    )}
                    {speaker.name && <h5>{speaker.name}</h5>}
                    {speaker.designation && <p>{speaker.designation}</p>}
                    {speaker.companyName && <p>{speaker.companyName}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <PdfViewer
          url={pdfUrl}
          open={!!pdfUrl}
          onClose={() => setPdfUrl(null)}
          title="PDF Preview"
        />
        <ShareButtons
          url={fullUrl}
          platforms={["facebook", "twitter", "linkedin", "print"]}
        />
      </div>
    </ArticlePageLayout>
  );
};

export default EventDetails;
