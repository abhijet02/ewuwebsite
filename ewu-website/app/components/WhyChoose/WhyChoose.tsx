"use client";

import "./WhyChoose.scss";
import "../Slider/Slider.scss";
import "swiper/css";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useContactInfoData } from "@lib/hooks/useContactInfoData";
import { checkIfVideo } from "@lib/utils/checkIfVideo";

const WhyChoose: React.FC = () => {
  const { defaultContactInfo } = useContactInfoData();

  return (
    <section className="why-study-here-section">
      <div className="container">
        <div className="row g-3">
          {/* LEFT CONTENT */}
          <div className="col-12 col-sm-12 col-md-12 col-lg-7">
            <div className="why-study-here-content">
              <h2>
                Why choose <br /> <span>East West University</span>
              </h2>
              <p>Please visit us before taking any decision</p>
            </div>

            <div className="row g-2 mt-4">
              {/* Email */}
              <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                <div className="why-choose-contact-card">
                  <div className="why-choose-card-icon-body">
                    <Icon icon="proicons:mail" width="32" height="32" />
                  </div>
                  <div className="why-choose-card-information">
                    <h6>Email</h6>
                    <p>{defaultContactInfo?.primaryEmail}</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                <div className="why-choose-contact-card">
                  <div className="why-choose-card-icon-body">
                    <Icon icon="proicons:phone" width="32" height="32" />
                  </div>
                  <div className="why-choose-card-information">
                    <h6>Phone</h6>
                    <p>{defaultContactInfo?.primaryPhone}</p>
                  </div>
                </div>
              </div>

              {/* Hotline */}
              <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                <div className="why-choose-contact-card">
                  <div className="why-choose-card-icon-body">
                    <Icon icon="proicons:call" width="32" height="32" />
                  </div>
                  <div className="why-choose-card-information">
                    <h6>Hotline</h6>
                    <p>{defaultContactInfo?.primaryHotline}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SLIDER */}
          <div className="col-12 col-sm-12 col-md-12 col-lg-5">
            <Swiper
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[Pagination, Autoplay]}
              className="why-choose-swiper"
            >
              {defaultContactInfo?.media?.map((item, index) => (
                <SwiperSlide key={item?.id || index}>
                  {!checkIfVideo(item?.url) ? (
                    <div className="why-choose-image">
                      <Image
                        src={item?.url}
                        fill
                        sizes="100vw"
                        alt="Slider Image"
                      />
                    </div>
                  ) : (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="why-choose-video"
                    >
                      <source src={item?.url} type="video/mp4" />
                    </video>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* BOTTOM BOX ITEMS */}
        <div className="row g-3 mt-4">
          {defaultContactInfo?.contents?.map((item) => (
            <div className="col-lg-4 my-2 box-item-main" key={item?.id}>
              <div className="box-item">
                <p>{item?.text}</p>
                <div className="box-item-icon-body">
                  <Link href={item?.link}>
                    <Icon
                      icon="akar-icons:arrow-right"
                      width="24"
                      height="24"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
