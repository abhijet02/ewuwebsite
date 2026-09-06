"use client";

import "./NoticeDetails.scss";
import { renderSafeHTML, stripHTMLAndLimitWords } from "@lib/utils/html2text";
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
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const NoticeDetails: React.FC = () => {
  const { filteredNotice } = useNewsData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  // Social sharing setup
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = encodeURIComponent(filteredNotice?.label);
  const shareText = encodeURIComponent(
    filteredNotice?.description?.substring(0, 200) || ""
  );

  const socialShares = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      pageUrl
    )}$title=${encodeURIComponent(shareTitle)}$text=${encodeURIComponent(
      shareText
    )}`,

    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      pageUrl
    )}$title=${encodeURIComponent(shareTitle)}$text=${encodeURIComponent(
      shareText
    )}`,

    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      pageUrl
    )}$title=${encodeURIComponent(shareTitle)}$text=${encodeURIComponent(
      shareText
    )}`,
  };

  const handlePrint = () => {
    window.print();
  };

  const swiperRef = useRef<SwiperClass | null>(null);

  //const cards = splitHtmlIntoEqualCards(filteredNotice?.description, 4);

  return (
    <div className="news-details-wrapper">
      <div className="social-icon-wrapper">
        <div className="date-time">
          <Icon icon="simple-line-icons:calender" width="16" height="16" />
          <span>{moment(filteredNotice?.date).format("ddd, D MMM, YYYY")}</span>
        </div>
        <ul>
          <li>
            <a href={socialShares.facebook}>
              <Icon icon="ri:facebook-fill" width="22" height="22" />
            </a>
          </li>
          <li>
            <a href={socialShares.twitter}>
              <Icon icon="prime:twitter" width="18" height="18" />
            </a>
          </li>
          {/* <li>
            <a href="">
              <Icon icon="uil:instagram" width="22" height="22" />
            </a>
          </li> */}
          <li>
            <a href={socialShares.linkedin}>
              <Icon icon="flowbite:linkedin-solid" width="22" height="22" />
            </a>
          </li>
          <li>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                handlePrint();
              }}
              aria-label="Print this page"
            >
              <Icon
                icon="material-symbols-light:print-rounded"
                width="26"
                height="26"
              />
            </a>
          </li>
        </ul>
      </div>
      {filteredNotice?.photos?.length > 0 && (
        <section className="video-banner">
          <Swiper
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            modules={[Pagination, Autoplay]}
            className="mySwiper banner-swiper"
            onSlideChange={() => {
              // Restart video on slide change
              (
                document.querySelectorAll(
                  ".video-background"
                ) as NodeListOf<HTMLVideoElement>
              ).forEach((video) => {
                video.pause();
                video.currentTime = 0;
                video.play();
              });
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {filteredNotice?.photos?.map((item, index) => (
              <SwiperSlide key={item.id || index}>
                {!checkIfVideo(item?.url) ? (
                  <Image
                    src={item?.url}
                    alt={"Slider Photo"}
                    className="media-image"
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
      )}
      <section className="industrialization-club-part">
        <div {...(!isStatic ? { "data-aos": "fade-up" } : {})}>
          <div className="industrialization-club">
            <div className="notice-heading-wrapper">
              <div className="heading-part">
                <h2>{filteredNotice?.label}</h2>
                <p className="location">
                  <Icon icon="basil:location-solid" width="20" height="20" />{" "}
                  {filteredNotice?.location}
                </p>
              </div>
              {filteredNotice?.attachmentUrl && (
                <div className="notice-attachment-wrapper">
                  <Link
                    href={filteredNotice?.attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon icon="bytesize:download" width="20" height="20" />{" "}
                    Download
                  </Link>
                </div>
              )}
            </div>
            <div className="notice-disc-wrapper">
              <div className="notice-headline">
                <p className="notice">Notice</p>
              </div>
              <div className="card-wrapper">
                <div className="card">
                  {renderSafeHTML(filteredNotice?.description)}
                </div>
                <div className="card">
                  <p>
                    Hello, The viva-voce for BBA, LLB and B.Pharm programs will
                    be held on Tuesday, 20 May 2025 as per the schedule to be
                    mentioned in the notice of the aforesaid results.
                  </p>
                  <br />
                  <br />
                  <p>
                    The viva-voce for BBA, LLB and B.Pharm programs will be held
                    on Tuesday, 20 May 2025 as per the schedule to be mentioned
                    in the notice of the aforesaid results.
                  </p>
                </div>
                <div className="card">
                  <p>
                    The viva-voce for BBA, LLB and B.Pharm programs will be held
                    on Tuesday, 20 May 2025 as per the schedule to be mentioned
                    in the notice of the aforesaid results.
                  </p>
                  <br />
                  <br />

                  <p>
                    The viva-voce for BBA, LLB and B.Pharm programs will be held
                    on Tuesday, 20 May 2025 as per the schedule to be mentioned
                    in the notice of the aforesaid results.
                  </p>
                </div>
                <div className="card">
                  <p>
                    The viva-voce for BBA, LLB and B.Pharm programs will be held
                    on Tuesday, 20 May 2025 as per the schedule to be mentioned
                    in the notice of the aforesaid results.
                  </p>
                  <br />
                  <br />

                  <p>
                    The viva-voce for BBA, LLB and B.Pharm programs will be held
                    on Tuesday, 20 May 2025 as per the schedule to be mentioned
                    in the notice of the aforesaid results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NoticeDetails;
