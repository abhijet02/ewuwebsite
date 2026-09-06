"use client";
import React, { useEffect, useRef, useState } from "react";
import "./IntroVideo.scss";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import "./MissionVision.scss";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { aboutOrgActions } from "@lib/slices/aboutOrg/aboutOrg.slice";
import { checkIfVideo } from "@lib/utils/checkIfVideo";
import { Icon } from "@iconify/react";
import Image from "next/image";

const IntroVideo: React.FC = () => {
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const dispatch = useAppDispatch();

  const aboutOrgs = useAppSelector(
    (state) => state.aboutOrg.getAboutOrgsResponse?.aboutOrgs
  );

  useEffect(() => {
    dispatch(
      aboutOrgActions.getAboutOrgs({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );
  }, [dispatch]);

  const aboutUsContent = aboutOrgs?.filter((item) => item.id === 2)[0];

  return (
    <section className="intro-video-section">
      <div className="container">
        <div
          {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
          className="intro-video-body"
        >
          <div className="intro-video-header mb-4">
            <p className="sub-title-exception">
              {aboutUsContent?.sectionTitle}
            </p>
            <h2 className="about-us-h2-exception">
              {aboutUsContent?.sectionSubTitle}
            </h2>
          </div>
          <div
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              height: "420px",
              position: "relative",
              width: "100%",
            }}
          >
            {aboutUsContent?.mediaUrl &&
            !checkIfVideo(aboutUsContent?.mediaUrl) ? (
              <Image
                src={aboutUsContent?.mediaUrl}
                alt="About Us"
                width={800}
                height={360}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <video
                //ref={videoRef}
                src={aboutUsContent?.mediaUrl}
                controls
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default IntroVideo;
