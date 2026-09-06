"use client";

import { FC } from "react";
import { renderSafeHTML } from "@lib/utils/html2text";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { checkIfVideo } from "@lib/utils/checkIfVideo";
import Image from "next/image";
import "./ClubEventDetails.scss";
import { useNewsData } from "@lib/hooks/useAnnouncementData";
import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";

const ClubEventDetails: FC = () => {
  const { filteredEvent } = useNewsData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <div className="news-details-wrapper">
      <div className="social-icon-wrapper">
        <div className="date-time">
          <Icon icon="simple-line-icons:calender" width="16" height="16" />
          <span>
            {filteredEvent?.fromDate && filteredEvent?.toDate
              ? moment(filteredEvent.fromDate).isSame(
                  filteredEvent.toDate,
                  "day"
                )
                ? moment(filteredEvent.fromDate).format("ddd, D MMM, YYYY")
                : `${moment(filteredEvent.fromDate).format(
                    "ddd, D MMM, YYYY"
                  )} - ${moment(filteredEvent.toDate).format(
                    "ddd, D MMM, YYYY"
                  )}`
              : moment(filteredEvent?.fromDate).format("ddd, D MMM, YYYY")}
          </span>
        </div>
        <ul>
          <li>
            <a href="">
              <Icon icon="ri:facebook-fill" width="22" height="22" />
            </a>
          </li>
          <li>
            <a href="">
              <Icon icon="prime:twitter" width="18" height="18" />
            </a>
          </li>
          <li>
            <a href="">
              <Icon icon="uil:instagram" width="22" height="22" />
            </a>
          </li>
          <li>
            <a href="">
              <Icon icon="flowbite:linkedin-solid" width="22" height="22" />
            </a>
          </li>
          <li>
            <a href="">
              <Icon
                icon="material-symbols-light:print-rounded"
                width="26"
                height="26"
              />
            </a>
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-6">
          <section className="video-banner">
            {!checkIfVideo(filteredEvent?.attachmentUrl) ? (
              <Image
                src={filteredEvent?.attachmentUrl}
                alt={"Slider Photo"}
                className="media-image"
                width={1500}
                height={750}
              />
            ) : (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="video-background"
              >
                <source src={filteredEvent?.attachmentUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </section>
        </div>
        <div className="col-md-6">
          <section className="industrialization-club-part">
            <div
              {...(!isStatic ? { "data-aos": "fade-up" } : {})}
              className="container"
            >
              <div className="industrialization-club">
                <h2>{filteredEvent?.title}</h2>
                <h5>
                  {filteredEvent?.fromDate && filteredEvent?.toDate
                    ? moment(filteredEvent.fromDate).isSame(
                        filteredEvent.toDate,
                        "day"
                      )
                      ? moment(filteredEvent.fromDate).format(
                          "ddd, D MMM, YYYY"
                        )
                      : `${moment(filteredEvent.fromDate).format(
                          "ddd, D MMM, YYYY"
                        )} - ${moment(filteredEvent.toDate).format(
                          "ddd, D MMM, YYYY"
                        )}`
                    : moment(filteredEvent?.fromDate).format(
                        "ddd, D MMM, YYYY"
                      )}
                </h5>
                <h5>{filteredEvent?.location}</h5>
                <div>{renderSafeHTML(filteredEvent?.description)}</div>
                <div>
                  <a href={filteredEvent?.attachmentUrl}>
                    {filteredEvent?.attachmentName}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClubEventDetails;
