"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import "./AboutUsThree.scss";
import "./MissionVision.scss";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { aboutOrgActions } from "@lib/slices/aboutOrg/aboutOrg.slice";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { checkIfVideo } from "@lib/utils/checkIfVideo";

const AboutUsThree: FC = () => {
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

  const openModal = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="third-home-page-about-university-section">
        <div className="container">
          <div className="third-about-university-section">
            <div className="row">
              {/* <!-- Text Section --> */}
              <div
                {...(!isStatic ? { "data-aos": "fade-up" } : {})}
                className="col-md-7"
              >
                <h2 className="about-title">{aboutUsContent?.aboutUstitle}</h2>
                <p className="about-text">{aboutUsContent?.aboutUs}</p>

                {/* <ul className="list-unstyled">
                <li className="d-flex align-items-center mb-2">
                  <span className="correct-icon-wrapper">
                    <Icon icon="mingcute:check-fill" width="24" />{" "}
                  </span>
                  University Award Achieved
                </li>
                <li className="d-flex align-items-center">
                  <span className="correct-icon-wrapper">
                    <Icon icon="mingcute:check-fill" width="24" />{" "}
                  </span>
                  Available Popular Courses
                </li>
              </ul> */}

                <div className="row">
                  <div
                    {...(!isStatic
                      ? {
                          "data-aos":
                            window.innerWidth < 800 ? "fade-up" : "fade-left",
                        }
                      : {})}
                    className="col-md-6"
                  >
                    <div className="our-mission-box">
                      <h6 className="info-title">
                        <Icon
                          className="check-icon"
                          icon="gravity-ui:target-dart"
                          width="30"
                          color="#aa4a44"
                        />
                        {aboutUsContent?.missionTitle}
                      </h6>
                      <p className="info-text">
                        {aboutUsContent?.mission?.slice(0, 300) + "....."}
                        <span>
                          <button
                            onClick={() =>
                              openModal(
                                aboutUsContent?.missionTitle,
                                aboutUsContent?.mission
                              )
                            }
                            style={{
                              fontWeight: 600,
                              color: "#aa4a44",
                              marginLeft: "40px",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Learn More
                          </button>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    {...(!isStatic
                      ? {
                          "data-aos":
                            window.innerWidth < 800 ? "fade-up" : "fade-left",
                        }
                      : "")}
                    className="col-md-6"
                  >
                    <div className="our-vision-box">
                      <h6 className="info-title">
                        <Icon
                          className="check-icon"
                          icon="game-icons:trophy-cup"
                          width="30"
                          color="#aa4a44"
                        />
                        {aboutUsContent?.visionTitle}
                      </h6>
                      <p className="info-text">
                        {aboutUsContent?.vision?.slice(0, 300) + "....."}
                        <br />
                        <span>
                          <button
                            onClick={() =>
                              openModal(
                                aboutUsContent?.visionTitle,
                                aboutUsContent?.vision
                              )
                            }
                            style={{
                              fontWeight: 600,
                              color: "#aa4a44",
                              marginLeft: "40px",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Learn More
                          </button>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Image Section --> */}
              <div
                {...(!isStatic
                  ? {
                      "data-aos":
                        window.innerWidth < 800 ? "fade-up" : "fade-left",
                    }
                  : {})}
                className="col-md-5"
              >
                {aboutUsContent?.mediaUrl &&
                !checkIfVideo(aboutUsContent?.mediaUrl) ? (
                  <Image
                    src={aboutUsContent?.mediaUrl}
                    width={420}
                    height={500}
                    className="why-choose-banner img-fluid"
                    alt="Banner EWU"
                  />
                ) : (
                  <video
                    src={aboutUsContent?.mediaUrl}
                    controls
                    //autoPlay
                    muted
                    loop
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
        </div>
      </div>

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

export default AboutUsThree;
