"use client";

import "./ClubNewsDetails.scss";
import { renderSafeHTML } from "@lib/utils/html2text";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { checkIfVideo } from "@lib/utils/checkIfVideo";
import { useNewsData } from "@lib/hooks/useAnnouncementData";
import Image from "next/image";
import { Icon } from "@iconify/react";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";

const ClubNewsDetails: React.FC = () => {
  const { filteredNews } = useNewsData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);
  const swiperRef = useRef<SwiperClass | null>(null);

  // Check if data exists
  const isLoading = !filteredNews;

  if (isLoading) {
    return (
      <div className="news-details-wrapper">
        {/* Skeleton for title */}
        <div className="skeleton-title skeleton-text"></div>
        <div className="skeleton-text" style={{ width: "40%" }}></div>
        <div className="skeleton-text" style={{ width: "30%" }}></div>

        {/* Skeleton image */}
        <div className="skeleton-img"></div>

        {/* Skeleton description */}
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
      </div>
    );
  }

  // Normal rendering when data is available
  return (
    <div className="news-details-wrapper">
      <div className="social-icon-wrapper">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <h2>{filteredNews?.label}</h2>
          {filteredNews?.reporterName && (
            <div className="date-time">
              <div style={{ height: "24px", width: "24px" }}>
                <Icon icon="gridicons:user" width="20" height="20" />
              </div>
              <p style={{ margin: 0, textAlign: "left" }}>
                {filteredNews.reporterName}
              </p>
            </div>
          )}
          {filteredNews?.date && (
            <div className="date-time">
              <div style={{ height: "24px", width: "24px" }}>
                <Icon icon="uis:calender" width="20" height="20" />
              </div>
              <p style={{ margin: 0, textAlign: "left" }}>
                {moment(filteredNews?.date).format("ddd, D MMM, YYYY")}
              </p>
            </div>
          )}
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "40px",
          }}
        >
          <ul>
            <li>
              <a href="#">
                <Icon icon="ri:facebook-fill" width="22" height="22" />
              </a>
            </li>
            <li>
              <a href="#">
                <Icon icon="prime:twitter" width="18" height="18" />
              </a>
            </li>
            <li>
              <a href="#">
                <Icon icon="flowbite:linkedin-solid" width="22" height="22" />
              </a>
            </li>
            <li>
              <a href="#" aria-label="Print this page">
                <Icon
                  icon="material-symbols-light:print-rounded"
                  width="26"
                  height="26"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <section className="video-banner">
        <Swiper
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
          className="mySwiper banner-swiper"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {filteredNews?.photos?.map((item, index) => (
            <SwiperSlide key={item.id || index}>
              {!checkIfVideo(item?.url) ? (
                <Image
                  src={item?.url}
                  alt="Slider Photo"
                  className="media-image news-image-size"
                  width={1500}
                  height={550}
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
                  <source src={item?.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="industrialization-club-part">
        <div {...(!isStatic ? { "data-aos": "fade-up" } : {})}>
          <div className="industrialization-club">
            <div>{renderSafeHTML(filteredNews?.description)}</div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ClubNewsDetails;
