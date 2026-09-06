"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import "./VisitUs.scss";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { contactInfoActions } from "@/lib/slices/contactInfo/contactInfo.slice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import Image from "next/image";
import { checkIfVideo } from "@lib/utils/checkIfVideo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const VisitUs: React.FC = () => {
  const dispatch = useAppDispatch();

  const contactInfos = useAppSelector(
    (state) => state.contactInfo.getContactInfoResponse?.findAll
  );

  useEffect(() => {
    dispatch(
      contactInfoActions.getContactInfo({
        request: { page: 1, limit: 100 },
      })
    );
  }, [dispatch]);

  const defaultContactInfo = contactInfos?.find((c) => c?.pageId === 10);
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <section className="visit-us-part">
      <div className="container">
        <div className="row visit-us-main">
          {/* MEDIA SLIDER PART */}
          <div className="col-lg-7 col-md-12 visit-us-img-part">
            <Swiper
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              modules={[Pagination, Autoplay]}
              className="visit-us-swiper"
            >
              {defaultContactInfo?.media?.map((item, index) => (
                <SwiperSlide key={index}>
                  {!checkIfVideo(item?.url) ? (
                    <div className="visit-us-img">
                      <Image
                        src={item?.url}
                        alt={`Visit Us Media ${index + 1}`}
                        fill
                        style={{ objectFit: "cover", borderRadius: "14px" }}
                        sizes="100vw"
                      />
                    </div>
                  ) : (
                    <div className="visit-us-img">
                      <video
                        loop
                        controls
                        playsInline
                        className="visit-us-video"
                        style={{
                          borderRadius: "14px",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <source src={item?.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* INFO PART */}
          <div
            {...(!isStatic
              ? {
                  "data-aos": window.innerWidth < 800 ? "fade-up" : "fade-left",
                }
              : {})}
            className="col-lg-6 col-md-12"
          >
            <div className="visit-us">
              <h2>Visit Us</h2>

              <div className="visit-us-info">
                <div>
                  <div className="visit-us-icon">
                    <Icon icon="solar:phone-linear" width="22" height="22" />
                    <span>Phone</span>
                  </div>
                  {defaultContactInfo?.primaryPhone}
                </div>
                <div>
                  <div className="visit-us-icon">
                    <Icon icon="ix:support" width="22" height="22" />
                    <span>Hot line</span>
                  </div>
                  {defaultContactInfo?.primaryHotline}
                </div>
                <div>
                  <div className="visit-us-icon">
                    <Icon icon="clarity:email-line" width="22" height="22" />
                    <span>Email</span>
                  </div>
                  {defaultContactInfo?.primaryEmail}
                </div>
                <div>
                  <div className="visit-us-icon">
                    <Icon icon="streamline:web" width="22" height="22" />
                    <span>Web</span>
                  </div>
                  <p>
                    <a
                      target="_blank"
                      href={defaultContactInfo?.link}
                      style={{ color: "#737477" }}
                    >
                      {defaultContactInfo?.link}
                    </a>
                  </p>
                </div>
                <div className="visit-us-maps">
                  <div className="visit-us-icon">
                    <Icon
                      icon="mingcute:location-2-line"
                      width="22"
                      height="22"
                    />
                    <span>Location</span>
                  </div>
                  <p>{defaultContactInfo?.address}</p>
                </div>
              </div>

              <a
                className="visit-us-location"
                target="_blank"
                href="https://maps.app.goo.gl/Mg6P5tGGsmTCAwt6A"
              >
                <Icon
                  icon="fluent:my-location-16-regular"
                  width="26"
                  height="26"
                />
                <span>View Our Campus Map</span>
                <Icon
                  icon="ic:round-keyboard-arrow-right"
                  width="26"
                  height="26"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitUs;
