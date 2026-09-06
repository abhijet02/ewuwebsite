"use client";

import React from "react";
import { checkIfVideo } from "@lib/utils/checkIfVideo";
import BannerSlider from "./Component/BannerSlider";

type BannerProps = {
  pageSliders: any[];
};

const Banner: React.FC<BannerProps> = ({ pageSliders }) => {
  if (!pageSliders || pageSliders.length === 0) return null;

  return (
    <section className="banner-part">
      <BannerSlider
        slides={pageSliders.map((item) => ({
          id: item.id,
          url: item.sliderMediaUrl,
          type: checkIfVideo(item.sliderMediaUrl) ? "video" : "image",
        }))}
      />
    </section>
  );
};

export default Banner;
