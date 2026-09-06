"use client";

import "./Slider.scss";
import "swiper/css";
import "swiper/css/pagination";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import { Autoplay, Pagination } from "swiper/modules";
import { checkIfVideo } from "@lib/utils/checkIfVideo";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { YesOrNo } from "@lib/services/slider/slider.service.type";
import { useAppSelector, useAppDispatch } from "@lib/hooks";
import { sliderActions } from "@lib/slices/slider/slider.slice";
import { checkIfImage } from "@lib/utils/checkIfImage";
import { useSliderData } from "@lib/hooks/useSliderData";
import Link from "next/link";
import { useEventData } from "@lib/hooks/useEventData";
import { useParams } from "next/navigation";
import { useMarqueeData } from "@lib/hooks/useMarqueeData";

const Slider: React.FC = () => {
  const { pageLatestNews } = useMarqueeData();
  const hasMarque = pageLatestNews.length > 0;

  // Get slider data from custom hook
  const { pageSliders, page } = useSliderData();
  // console.log("page",page);
  // console.log("pageSliders",pageSliders);

  // Get page and event data
  const { pageEvents } = useEventData();

  // Ref for Swiper instance
  const swiperRef = useRef<SwiperClass | null>(null);

  // Redux dispatch
  const dispatch = useAppDispatch();

  // Redux state for video mute
  const isSliderVideoMuted = useAppSelector(
    (state) => state.slider?.isVideoMuted,
  );

  // Countdown timer state
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Countdown logic
  useEffect(() => {
    // Exit if no slider data
    if (!pageSliders || pageSliders.length === 0) return;

    // Find first slider with a valid future countdown date
    const validSlider = pageSliders.find(
      (item) =>
        item.countDownDate &&
        new Date(item.countDownDate).getTime() > Date.now(),
    );

    if (!validSlider) return;

    const countdownDate = new Date(validSlider.countDownDate).getTime();

    // Update countdown every second
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setCountdown({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      // Calculate remaining time
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [pageSliders]);

  // Ref for video element
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Auto play/pause video based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return;

      const video = videoRef.current;
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;

      // Video position in the document
      const videoTop = video.offsetTop;
      const videoBottom = videoTop + video.offsetHeight;

      // Visible viewport boundaries
      const viewportTop = scrollY;
      const viewportBottom = scrollY + viewportHeight;

      // Check if video is visible in viewport
      const isInView = videoBottom > viewportTop && videoTop < viewportBottom;

      if (isInView) {
        video.play();
      } else {
        video.pause();
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mute state for all slider videos
  const toggleMute = () => {
    dispatch(sliderActions.toggleVideoMuted());
  };

  // Toggle play/pause for clicked video
  const togglePlayPause = (video: HTMLVideoElement) => {
    if (video.paused) video.play();
    else video.pause();
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pageSliders && pageSliders.length > 0) {
      setIsLoading(false);
    }
  }, [pageSliders]);

  const formatDate = (dateString) => {
    if (!dateString) return "";

    // Split manually to avoid timezone shift
    const [year, month, day] = dateString.split("-");

    const d = parseInt(day, 10);
    const m = new Date(dateString).toLocaleString("en-US", { month: "long" });

    const suffix = (n) => {
      if (n > 3 && n < 21) return "th";
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${d}${suffix(d)} ${m} ${year}`;
  };

  return (
    <section
      className={`slider-hero-section ${
        hasMarque ? "height-for-marque" : "height-for-no-marque"
      }`}
    >
      {" "}
      {page?.isHomePage === "YES" && (
        <div className="slider-gradient-overlay"></div>
      )}
      <Swiper
        className="slider-hero-section-swiper-container"
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        onSlideChange={() => {
          document
            .querySelectorAll(".video-background-slider")
            .forEach((video: HTMLVideoElement) => {
              video.pause();
              video.currentTime = 0;
              video.muted = true; // Ensure muted
              video
                .play()
                .catch((err) => console.warn("Slide autoplay blocked:", err));
            });
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {/* Map through slider data */}
        {pageSliders?.map((item, index) => (
          <SwiperSlide
            key={index}
            className="slider-hero-section-swiper-container-slider-part"
          >
            {/* Image Slider */}
            {!checkIfVideo(item?.sliderMediaUrl) ? (
              <div className="slider-media-container">
                <Image
                  src={item?.sliderMediaUrl}
                  alt="Slider Photo"
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Overlay Text */}
                {item?.overlayText && (
                  <h4
                    className={
                      page?.clubId > 0
                        ? "slider-overlay-text-club"
                        : "slider-overlay-text"
                    }
                  >
                    {item.overlayText}
                  </h4>
                )}
              </div>
            ) : (
              // Video Slider
              <div className="slider-media-container">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={isSliderVideoMuted}
                  playsInline
                  preload="auto"
                  onClick={(e) => togglePlayPause(e.currentTarget)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                >
                  <source src={item?.sliderMediaUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Mute/Unmute Button */}
                <div
                  style={{
                    position: "absolute",
                    bottom:
                      window.innerWidth <= 676
                        ? "16px"
                        : hasMarque
                          ? "64px"
                          : "24px",
                    left: window.innerWidth <= 767 ? "8px" : "32px",
                    zIndex: 105,
                  }}
                >
                  <button
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "100%",
                      background: "#1c4370",
                      border: "none",
                    }}
                    onClick={toggleMute}
                  >
                    {isSliderVideoMuted ? (
                      <Icon
                        icon="mdi:mute"
                        width="24"
                        height="24"
                        color="#fff"
                      />
                    ) : (
                      <Icon
                        icon="octicon:unmute-16"
                        width="24"
                        height="24"
                        color="#fff"
                      />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Watermark */}

            {item.isWatermarkEnable === YesOrNo.YES && (
              <div
                className={`watermark-wrapper ${
                  hasMarque
                    ? "watermark-wrapper-with-marquee"
                    : "watermark-wrapper-without-marquee"
                }`}
              >
                {checkIfImage(item?.watermarkLogourl) && (
                  <Image
                    src={item?.watermarkLogourl}
                    width={360}
                    height={72}
                    className="logo"
                    alt="Watermark Logo"
                  />
                )}
              </div>
            )}

            {/*********************************************************************************  
                                        Banner's
          **********************************************************************************/}
            <div className="banner-container-slider">
              <div className="row g-3 justify-content-between">
                <div
                  className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"
                  style={{ flexDirection: "row" }}
                >
                  {item.isBanner1Show === YesOrNo.YES && (
                    <div className="banner-card-style">
                      <div className="banner-card-left-part">
                        <div className="baner-card-media">
                          {checkIfImage(item?.banner1LogoUrl) && (
                            <Image
                              src={item?.banner1LogoUrl}
                              fill
                              sizes="100vw"
                              alt="Banner 1 Logo"
                            />
                          )}
                        </div>
                        <p>{item?.banner1LogoLabel}</p>
                      </div>
                      <h5>{item?.banner1label}</h5>
                    </div>
                  )}

                  {item.isBanner2Show === YesOrNo.YES && (
                    <div className="banner-card-style">
                      <div className="banner-card-left-part">
                        <div className="baner-card-media">
                          {checkIfImage(item?.banner2LogoUrl) && (
                            <Image
                              src={item?.banner2LogoUrl}
                              fill
                              sizes="100vw"
                              alt="Banner 1 Logo"
                            />
                          )}
                        </div>
                        <p>{item?.banner2LogoLabel}</p>
                      </div>
                      <h5>{item?.banner2label}</h5>
                    </div>
                  )}
                </div>

                {/* COLUMN 2 */}
                <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 d-flex justify-content-center flex-column">
                  {item.isCountdownShow === YesOrNo.YES && (
                    <div className="banner-card-style-countdown">
                      <div>
                        {/* {checkIfImage(item?.countDownLogo) && (
                          <Image
                            src={item?.countDownLogo}
                            width={179}
                            height={43}
                            className="logo"
                            alt="Countdown Logo"
                          />
                        )} */}
                      </div>
                      <h5>{item?.countDownLabel}</h5>
                      <p>
                        Application Deadline <br />{" "}
                        {formatDate(item?.countDownDate)}
                      </p>
                      <div className="slider-timer-card-deck">
                        <div className="count-down-box">
                          <div className="timer-box-container">
                            <p>{countdown?.days}</p>
                          </div>
                          <h5>Days</h5>
                        </div>
                        <div className="count-down-box">
                          <div className="timer-box-container">
                            <p>{countdown.hours}</p>
                          </div>
                          <h5>Hours</h5>
                        </div>
                        <div className="count-down-box">
                          <div className="timer-box-container">
                            <p>{countdown.minutes}</p>
                          </div>
                          <h5>Minutes</h5>
                        </div>
                        <div className="count-down-box">
                          <div className="timer-box-container">
                            <p>{countdown.seconds}</p>
                          </div>
                          <h5>Seconds</h5>
                        </div>
                      </div>
                      <Link
                        href="https://admission.ewubd.edu/"
                        className="slider-banner-action-button"
                      >
                        Apply now
                      </Link>
                    </div>
                  )}
                  {/* <button className="slider-upcoming-event-button">
                    Upcoming Event
                  </button> */}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/*********************************************************************************  
                                    Specific club event card 
      **********************************************************************************/}
      {page?.clubId > 0 && pageEvents && pageEvents?.length > 0 && (
        <Link
          href={`/pages/club-event-details/${pageEvents[0]?.id}?pageId=${pageEvents[0]?.pageId}`}
          target="_blank"
          className="slider-event-card-for-club"
        >
          <div className="slider-event-card-for-club-media">
            <Image
              src={pageEvents[0]?.attachmentUrl}
              alt={pageEvents[0]?.title}
              fill
              sizes="100vw"
            />
          </div>
          <p>{pageEvents[0]?.title}</p>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                color: "#fff",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  color: "#fff",
                }}
              >
                <Icon icon="majesticons:calendar-line" width="20" height="20" />
              </div>
              <p>
                {new Date(pageEvents[0]?.fromDate).getDate()}/
                {new Date(pageEvents[0]?.fromDate).getMonth() + 1}/
                {new Date(pageEvents[0]?.fromDate).getFullYear()}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                color: "#fff",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  color: "#fff",
                }}
              >
                <Icon icon="ion:time-outline" width="20" height="20" />
              </div>
              <p>
                {new Date(pageEvents[0]?.fromDate).toTimeString().split(" ")[0]}
              </p>
            </div>
          </div>
        </Link>
      )}
    </section>
  );
};

export default Slider;
