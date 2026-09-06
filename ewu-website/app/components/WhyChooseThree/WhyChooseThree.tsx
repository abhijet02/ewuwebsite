"use client";

import "./WhyChooseThree.scss";
import { FC, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { contactInfoActions } from "@lib/slices/contactInfo/contactInfo.slice";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const WhyChooseThree: FC = () => {
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

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <div className="third-why-choose-container">
      <div className="why-choose-banner">
        {/* Image Bannner here */}
        <div className="container">
          <div className="row align-items-center">
            {/* <!-- Left Side --> */}
            <div
              {...(!isStatic
                ? {
                    "data-aos":
                      window.innerWidth < 800 ? "fade-up" : "fade-right",
                  }
                : {})}
              className="col-md-6 mb-5"
            >
              <div className="left-section">
                <h2 className="why-choose3-title">
                  Why Choose East
                  <br />
                  West University
                </h2>
                <p className="visit-us-text">
                  Please Visit Us Before Taking Any <br /> Decision
                </p>

                <div className="contact-info">
                  <div>
                    <p>
                      <Icon
                        icon="fontisto:email"
                        width="20"
                        className="space-right"
                      />{" "}
                      {defaultContactInfo?.primaryEmail}
                    </p>
                  </div>

                  <div>
                    <p>
                      <Icon
                        className="space-right"
                        icon="ion:call"
                        width="20"
                      />{" "}
                      {defaultContactInfo?.primaryPhone}
                    </p>
                  </div>

                  <div>
                    <p>
                      <Icon
                        className="space-right"
                        icon="lsicon:service-outline"
                        width="20"
                      />{" "}
                      {defaultContactInfo?.primaryHotline}
                    </p>
                  </div>
                </div>
                {/* <button className="apply-btn">
                  Apply Online
                  <Icon
                    className="diagonal-arrow"
                    icon="cil:arrow-right"
                    width="18"
                  />{" "}
                </button> */}
              </div>
            </div>

            {/* <!-- Right Side (Timeline) --> */}
            <div
              {...(!isStatic ? { "data-aos": "fade-up" } : {})}
              className="col-md-6"
            >
              <div className="timeline">
                {defaultContactInfo?.contents?.map((item, index) => {
                  const diamondColors = [
                    "green",
                    "red",
                    "blue",
                    "yellow",
                    "teal",
                    "purple",
                  ];
                  const color = diamondColors[index % diamondColors.length];

                  return (
                    <div className="timeline-item" key={item?.id}>
                      <div className={`diamond ${color}`}>
                        <span className="straight-digit">{index + 1}</span>
                      </div>
                      <div className="timeline-content">
                        <p>{item?.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseThree;
