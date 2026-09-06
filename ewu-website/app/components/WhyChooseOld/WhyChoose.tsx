"use client";

import "./WhyChoose.scss";
import "../Slider/Slider.scss";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import { Autoplay, Pagination } from "swiper/modules";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { contactInfoActions } from "@/lib/slices/contactInfo/contactInfo.slice";
import React, { useRef, useState } from "react";
import { checkIfVideo } from "@lib/utils/checkIfVideo";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const WhyChoose: React.FC = () => {
  const dispatch = useAppDispatch();

  const contactInfos = useAppSelector(
    (state) => state.contactInfo.getContactInfoResponse?.findAll
  );

  useEffect(() => {
    dispatch(
      contactInfoActions.getContactInfo({
        request: {
          page: 1,
          limit: 100,
        },
      })
    );
  }, [dispatch]);

  const defaultContactInfo = contactInfos?.find((c) => c?.pageId === 0);

  const swiperRef = useRef<SwiperClass | null>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isVideoActive, setIsVideoActive] = useState(false);

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <>
      <section className="why-choose-two">
        <div className="container">
          <div className="why-choose-two-main">
            <div className="why-choose-two-info">
              <div className="why-chooes-info">
                <div className="common-header" style={{ textAlign: "left" }}>
                  <h2 {...(!isStatic ? { "data-aos": "fade-down" } : {})}>
                    Why choose east west university
                  </h2>
                </div>
                <h5 {...(!isStatic ? { "data-aos": "fade-down" } : {})}>
                  Please visit us before taking any decision
                </h5>
                <div
                  {...(!isStatic
                    ? {
                        "data-aos":
                          window.innerWidth < 800 ? "fade-up" : "fade-right",
                      }
                    : {})}
                  className="why-contact"
                >
                  <div>
                    <Icon icon="system-uicons:mail" width="34" height="34" />
                  </div>
                  <div className="dark-mode-contents">
                    <span>Email</span>
                    <p>{defaultContactInfo?.primaryEmail}</p>
                  </div>
                </div>
                <div
                  {...(!isStatic
                    ? {
                        "data-aos":
                          window.innerWidth < 800 ? "fade-up" : "fade-right",
                      }
                    : {})}
                  className="why-contact"
                >
                  <div>
                    <Icon icon="fluent:phone-32-light" width="34" height="34" />
                  </div>
                  <div className="dark-mode-contents">
                    <span>Phone</span>
                    <p>{defaultContactInfo?.primaryPhone}</p>
                  </div>
                </div>
                <div
                  {...(!isStatic
                    ? {
                        "data-aos":
                          window.innerWidth < 800 ? "fade-up" : "fade-right",
                      }
                    : {})}
                  className="why-contact"
                >
                  <div>
                    <Icon icon="ph:phone-plus-thin" width="34" height="34" />
                  </div>
                  <div className="dark-mode-contents">
                    <span>Hotline</span>
                    <p>{defaultContactInfo?.primaryHotline}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-10">
                <div className="row">
                  {defaultContactInfo?.contents?.map((item) => (
                    <div className="col-lg-4 my-2 box-item-main" key={item?.id}>
                      <div
                        {...(!isStatic ? { "data-aos": "fade-down" } : {})}
                        className="box-item"
                      >
                        <p>{item?.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="why-choose-slider-wrapper">
          <section className="video-banner">
            {isVideoActive && (
              <div className="slider-mute-wrapper">
                <button
                  className="mute-button"
                  onClick={() => {
                    setIsMuted((prev) => !prev);
                    document
                      .querySelectorAll(".video-background-2")
                      .forEach((video: HTMLVideoElement) => {
                        video.muted = !video.muted;
                      });
                  }}
                >
                  {isMuted ? (
                    <Icon icon="mdi:mute" width="24" height="24" />
                  ) : (
                    <Icon icon="octicon:unmute-16" width="20" height="20" />
                  )}
                </button>
              </div>
            )}

            <Swiper
              pagination={{ clickable: true }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              modules={[Pagination, Autoplay]}
              className="mySwiper banner-swiper"
              onSlideChange={(swiper) => {
                const activeIndex = swiper.activeIndex;
                const activeItem = defaultContactInfo?.media?.[activeIndex];
                setIsVideoActive(checkIfVideo(activeItem?.url)); 
                document
                  .querySelectorAll(".video-background-2")
                  .forEach((video: HTMLVideoElement) => {
                    video.pause();
                    video.currentTime = 0;
                    video.play();
                  });
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                const firstItem = defaultContactInfo?.media?.[0];
                setIsVideoActive(checkIfVideo(firstItem?.url)); 
              }}
            >
              {defaultContactInfo?.media?.map((item, index) => (
                <SwiperSlide key={item.id || index}>
                  {!checkIfVideo(item?.url) ? (
                    <img
                      src={item?.url}
                      alt={"Slider Photo"}
                      className="media-image"
                      width={"100%"}
                      height={"100%"}
                    />
                  ) : (
                    <video
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      preload="auto"
                      className="video-background-2"
                    >
                      <source src={item?.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </div> */}
      </section>
    </>
  );
};

export default WhyChoose;
