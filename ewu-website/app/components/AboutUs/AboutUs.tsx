"use client";
import React, { useEffect, useRef, useState } from "react";
import "./AboutUs.scss";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import "./MissionVision.scss";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { aboutOrgActions } from "@lib/slices/aboutOrg/aboutOrg.slice";
import { checkIfVideo } from "@lib/utils/checkIfVideo";
import { Icon } from "@iconify/react";
import Image from "next/image";

const AboutUs: React.FC = () => {
  // Set initial active tab to match the aboutUstitle from API
  const [activeTab, setActiveTab] = useState("about");
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
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

  const aboutUsContent = aboutOrgs?.filter((item) => item.id === 1)[0];

  // Set the active tab based on API data once it's loaded
  useEffect(() => {
    if (aboutUsContent) {
      setActiveTab(aboutUsContent.aboutUstitle);
    }
  }, [aboutUsContent]);

  const openModal = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const truncateText = (text: string, limit: number) => {
    if (!text) return "";

    // Remove line breaks
    const clean = text.replace(/\s+/g, " ").trim();

    if (clean.length <= limit) return clean;

    // Cut at limit
    let truncated = clean.slice(0, limit);

    // Avoid breaking the last word
    truncated = truncated.slice(0, truncated.lastIndexOf(" "));

    return truncated + "...";
  };
  return (
    <>
      <section className="about-us-part">
        <div className="container">
          <div className="row justify-content-between align-items-start">
            <div
              {...(!isStatic
                ? {
                    "data-aos": window.innerWidth < 800 ? "fade-up" : "zoom-in",
                  }
                : {})}
              className="col-lg-6"
            >
              <div>
                <div className="common-header">
                  <p>{aboutUsContent?.sectionTitle}</p>
                  <h2 className="about-us-h2-exception">
                    {aboutUsContent?.sectionSubTitle}
                  </h2>
                </div>
                <div className="about-us-tabs">
                  <ul
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${
                          activeTab === aboutUsContent?.aboutUstitle
                            ? "active"
                            : ""
                        }`}
                        id="pills-home-tab"
                        type="button"
                        onClick={() =>
                          setActiveTab(aboutUsContent?.aboutUstitle)
                        }
                      >
                        {aboutUsContent?.aboutUstitle}
                      </button>
                    </li>

                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${
                          activeTab === aboutUsContent?.visionTitle
                            ? "active"
                            : ""
                        }`}
                        id="pills-contact-tab"
                        type="button"
                        onClick={() =>
                          setActiveTab(aboutUsContent?.visionTitle)
                        }
                      >
                        {aboutUsContent?.visionTitle}
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${
                          activeTab === aboutUsContent?.missionTitle
                            ? "active"
                            : ""
                        }`}
                        id="pills-profile-tab"
                        type="button"
                        onClick={() =>
                          setActiveTab(aboutUsContent?.missionTitle)
                        }
                      >
                        {aboutUsContent?.missionTitle}
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    {activeTab === aboutUsContent?.aboutUstitle && (
                      <div
                        className="tab-pane fade show active"
                        id="pills-home"
                      >
                        <div className="about-tab-content">
                          <p
                            style={{ lineHeight: "165%", textAlign: "justify" }}
                          >
                            {truncateText(aboutUsContent?.aboutUs || "", 450)}
                            <button
                              onClick={() =>
                                openModal(
                                  aboutUsContent?.aboutUstitle,
                                  aboutUsContent?.aboutUs
                                )
                              }
                              className="about-us-read-more-button"
                              style={{ marginLeft: "16px" }}
                            >
                              Read more
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                    {activeTab === aboutUsContent?.missionTitle && (
                      <div
                        className="tab-pane fade show active"
                        id="pills-profile"
                      >
                        <div className="about-tab-content">
                          <p
                            style={{ lineHeight: "165%", textAlign: "justify" }}
                          >
                            {truncateText(aboutUsContent?.mission || "", 450)}
                            <button
                              onClick={() =>
                                openModal(
                                  aboutUsContent?.missionTitle,
                                  aboutUsContent?.mission
                                )
                              }
                              className="about-us-read-more-button"
                              style={{ marginLeft: "16px" }}
                            >
                              Read more
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                    {activeTab === aboutUsContent?.visionTitle && (
                      <div
                        className="tab-pane fade show active"
                        id="pills-contact"
                      >
                        <div className="about-tab-content">
                          <p
                            style={{ lineHeight: "165%", textAlign: "justify" }}
                          >
                            {truncateText(aboutUsContent?.vision || "", 450)}
                            <button
                              onClick={() =>
                                openModal(
                                  aboutUsContent?.visionTitle,
                                  aboutUsContent?.vision
                                )
                              }
                              className="about-us-read-more-button"
                              style={{ marginLeft: "16px" }}
                            >
                              Read more
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
              className="col-lg-6"
            >
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  height: "300px",
                  position: "relative",
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
                    // autoPlay
                    //loop
                    // onPlay={(e) => {
                    //   const v = e.currentTarget as HTMLVideoElement;
                    //   v.muted = true; // always enforce muted
                    // }}
                  />
                )}
              </div>
              <div className="theme-song-caption">
                <p>EWU Theme Song</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5>{modalTitle}</h5>
              <button className="modal-close" onClick={closeModal}>
                <Icon icon="material-symbols:close" width="20" height="20" />
              </button>
            </div>
            <div className="modal-body">
              <p>{modalContent}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AboutUs;
