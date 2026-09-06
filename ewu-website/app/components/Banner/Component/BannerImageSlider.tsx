"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import React from "react";

type BannerImageSliderProps = {
  images: { id?: string; url: string }[];
};

const BannerImageSlider: React.FC<BannerImageSliderProps> = ({ images }) => {
  return (
    <Swiper
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      modules={[Pagination, Autoplay]}
      className="mySwiper banner-swiper"
    >
      {images.map((img, index) => (
        <SwiperSlide key={img.id || index}>
          <img
            src={img.url}
            alt={`Slider ${index + 1}`}
            className="banner-img"
            width="100%"
            height="100%"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerImageSlider;
