"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import React, { useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@lib/hooks";
import { sliderActions } from "@lib/slices/slider/slider.slice";

type Slide = {
  id?: string;
  url: string;
  type: "image" | "video";
};

type BannerSliderProps = {
  slides: Slide[];
};

const BannerSlider: React.FC<BannerSliderProps> = ({ slides }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Use Redux state and dispatch only
  const dispatch = useAppDispatch();
  const isSliderVideoMuted = useAppSelector(
    (state) => state.slider?.isVideoMuted
  );

  // Sync all video elements with Redux state
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = isSliderVideoMuted;
      }
    });
  }, [isSliderVideoMuted]);

  const toggleMute = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      // Use Redux action to toggle mute state
      dispatch(sliderActions.toggleVideoMuted());
    }
  };

  // Alternative: If you want to set specific mute state
  // const setMuteState = (muted: boolean) => {
  //   dispatch(sliderActions.setVideoMuted({ isMuted: muted }));
  // };

  // 🔹 If no data yet, show black full screen
  if (!slides || slides.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "black",
        }}
      />
    );
  }

  return (
    <Swiper
      pagination={{ clickable: true }}
      autoplay={{ delay: 30000, disableOnInteraction: false }}
      modules={[Pagination, Autoplay]}
      className="mySwiper banner-swiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={slide.id || index}>
          {slide.type === "image" ? (
            <Image
              src={slide.url}
              alt={`Slide ${index + 1}`}
              className="banner-img"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              width={100}
              height={100}
            />
          ) : (
            <div style={{ position: "relative", height: "100vh" }}>
              <video
                ref={(el: HTMLVideoElement | null) => {
                  videoRefs.current[index] = el;
                }}
                autoPlay
                muted={isSliderVideoMuted} // Use Redux state
                loop
                playsInline
                preload="auto"
                className="video-background"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              >
                <source src={slide.url} type="video/mp4" />
              </video>
              <div
                style={{
                  position: "absolute",
                  bottom: "64px",
                  left: "32px",
                  zIndex: 2,
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
                  onClick={() => toggleMute(index)}
                >
                  <Icon
                    icon={isSliderVideoMuted ? "mdi:mute" : "octicon:unmute-16"} // Use Redux state
                    width="24"
                    height="24"
                    color="#fff"
                  />
                </button>
              </div>
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;
