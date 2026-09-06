"use client";

import { FC, useEffect } from "react";
import "./WhyChooseTwo.scss";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { contactInfoActions } from "@lib/slices/contactInfo/contactInfo.slice";
import WhyChoose2 from "../../assets/bg-faculties.png";

const WhyChooseTwo: FC = () => {
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

  return (
    <div className="second-why-choose-ewu-container">
      <div className="container">
        <div className="row">
          <div className="col-md-4 why-choose-img">
            <Image
              src={WhyChoose2}
              width={420}
              height={500}
              className="why-choose-banner img-fluid"
              alt="Banner EWU"
            />
          </div>
          <div className="col-md-8">
            <h2 className="why-choose-title">
              Why Choose East West University
            </h2>
            <div className="row">
              {/* Left Column */}
              <div className="col-md-6">
                {defaultContactInfo?.contents
                  ?.filter((_, index) => index % 2 === 0)
                  .map((item, index) => (
                    <div className="scholarship-item" key={item?.id}>
                      <div className="number-box">{index * 2 + 1}</div>
                      <div className="scholarship-text">{item?.text}</div>
                    </div>
                  ))}
              </div>

              {/* Right Column */}
              <div className="col-md-6">
                {defaultContactInfo?.contents
                  ?.filter((_, index) => index % 2 !== 0)
                  .map((item, index) => (
                    <div className="scholarship-item" key={item?.id}>
                      <div className="number-box">{index * 2 + 2}</div>
                      <div className="scholarship-text">{item?.text}</div>
                    </div>
                  ))}
              </div>
            </div>

            <p className="visit-us-text">
              Please Visit Us Before Taking Any Decision
            </p>
            <div className="contact-info">
              <p className="info-text">
                <span>
                  <Icon
                    className="info-space"
                    icon="wpf:message-outline"
                    width="20"
                    color="#AA4A44"
                  />
                </span>{" "}
                Email: {defaultContactInfo?.primaryEmail}
              </p>

              <p className="info-text">
                <span>
                  <Icon
                    className="info-space"
                    icon="icomoon-free:mobile"
                    width="20"
                    color="#AA4A44"
                  />
                </span>
                Mobile No: {defaultContactInfo?.primaryPhone}
              </p>

              <p className="info-text">
                <span>
                  <Icon
                    className="info-space"
                    icon="streamline:call-center-support-service-solid"
                    width="20"
                    color="#AA4A44"
                  />
                </span>{" "}
                Hotline: {defaultContactInfo?.primaryHotline}
              </p>
            </div>
            {/* <a href="#" className="main-btn">
              View More
              <Icon
                className="diagonal-arrow"
                icon="cil:arrow-right"
                width="18"
              />{" "}
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseTwo;
