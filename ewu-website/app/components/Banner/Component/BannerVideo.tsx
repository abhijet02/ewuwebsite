"use client";

import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

type BannerVideoProps = {
  src: string;
  isMuted?: boolean;
};

const BannerVideo: React.FC<BannerVideoProps> = ({ src }) => {
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        setPaused(true);
      });
    }
  }, [paused]);

  const toggleMute = (event) => {
    event.stopPropagation();
    if (videoRef.current) {
      const newMuted = !muted;
      videoRef.current.muted = newMuted;
      setMuted(newMuted);
    }
  };

  const togglePlayPause = (event) => {
    event.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = muted; // enforce current mute state
      if (videoRef.current.paused) {
        videoRef.current.play();
        setPaused(false);
      } else {
        videoRef.current.pause();
        setPaused(true);
      }
    }
  };

  return (
    <div
      className="banner-video-wrapper"
      style={{
        position: "relative",
        height: "100vh",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onClick={togglePlayPause}
        className="video-background"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
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
          onClick={toggleMute}
        >
          <Icon
            icon={muted ? "mdi:mute" : "octicon:unmute-16"}
            width="24"
            height="24"
            color="#fff"
          />
        </button>
      </div>
    </div>
  );
};

export default BannerVideo;
