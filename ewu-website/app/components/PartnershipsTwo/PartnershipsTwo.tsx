"use client";

import "./PartnershipsTwo.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { usePatnershipData } from "@lib/hooks/usePatnershipData";

const PartnershipsTwo: React.FC = () => {
  const { pagePartnerships } = usePatnershipData();

  const sortedPartnerships = [...(pagePartnerships || [])].sort(
    (a, b) => a?.id - b?.id
  );

  const leftData = sortedPartnerships?.slice(0, 6) || [];
  const rigthData = sortedPartnerships?.slice(6) || [];
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <>
      <div
        {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
        className="col-lg-8 col-md-12"
      >
        <div className="partnerships-affiliates-title">
          <h2 className="mb-3">Partnerships and Affiliates</h2>
          {/* <p>
            As an adaptive learning center teacher, Andy goes above and beyond
            to ensure students with diverse learning needs can succeed in a
            general education setting.
          </p> */}
        </div>
        <Swiper
          pagination={false}
          navigation={false}
          slidesPerView={2}
          spaceBetween={20}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
          breakpoints={{
            567: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          className="mySwiper banner-swiper"
        >
          {leftData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="partnerships-affiliates-box">
                <div className="partnerships-affiliates-img">
                  <Image
                    src={item?.logoUrl}
                    width={300}
                    height={300}
                    className="logo"
                    alt="Picture of the author"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          pagination={false}
          navigation={false}
          slidesPerView={2}
          spaceBetween={20}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
          breakpoints={{
            567: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          className="mySwiper banner-swiper"
        >
          {rigthData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="partnerships-affiliates-box">
                <div className="partnerships-affiliates-img">
                  <Image
                    src={item?.logoUrl}
                    width={300}
                    height={300}
                    className="logo"
                    alt="Picture of the author"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default PartnershipsTwo;
