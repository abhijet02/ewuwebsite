"use client";

import "./PartnershipsOne.scss";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { usePatnershipData } from "@lib/hooks/usePatnershipData";
import { useViewAllLink } from "@lib/hooks/useViewAllLink";

const PartnershipsOne: React.FC = () => {
  const { pagePartnerships } = usePatnershipData();
  const viewAllLink = useViewAllLink({ componentName: "PartnershipsOne" });

  const sortedPartnerships = useMemo(() => {
    return pagePartnerships?.slice().sort((a, b) => a.id - b.id) || [];
  }, [pagePartnerships]);

  const half = Math.ceil(sortedPartnerships.length / 2);
  const leftData = [
    ...sortedPartnerships.slice(0, half),
    ...sortedPartnerships.slice(0, half),
  ];
  const rightData = [
    ...sortedPartnerships.slice(half),
    ...sortedPartnerships.slice(half),
  ];

  const leftSwiperRef = useRef<any>(null);
  const rightSwiperRef = useRef<any>(null);

  return (
    <section className="partnerships">
      <div className="container">
        <div className="header-with-view-all-button">
          <h2>Partnerships and Affiliates</h2>
          <Link href={viewAllLink || ""} className="for-all-view-all-button">
            View All
            <Icon icon="si:arrow-right-duotone" width="20" height="20" />
          </Link>
        </div>

        {/* First row: left → right */}
        <div className="swiper-row">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView="auto"
            loop
            speed={3000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1, // below 575px
              },
              576: {
                slidesPerView: "auto", // from 576px and above
              },
            }}
            allowTouchMove={false}
            ref={leftSwiperRef}
            onMouseEnter={() => leftSwiperRef.current?.autoplay.stop()}
            onMouseLeave={() => leftSwiperRef.current?.autoplay.start()}
          >
            {leftData.map((item, index) => (
              <SwiperSlide key={index}>
                <Link className="slide-card" href={item.websiteLink}>
                  <Image
                    src={item.logoUrl}
                    alt={item.name}
                    width={150}
                    height={80}
                  />
                  <div>{item.name}</div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Second row: right → left */}
        <div className="swiper-row">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView="auto"
            loop
            speed={3000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: true,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1, // below 575px
              },
              576: {
                slidesPerView: "auto", // from 576px and above
              },
            }}
            allowTouchMove={false}
            ref={rightSwiperRef}
            onMouseEnter={() => rightSwiperRef.current?.autoplay.stop()}
            onMouseLeave={() => rightSwiperRef.current?.autoplay.start()}
          >
            {rightData.map((item, index) => (
              <SwiperSlide key={index}>
                <Link className="slide-card" href={item.websiteLink}>
                  <Image
                    src={item.logoUrl}
                    alt={item.name}
                    width={150}
                    height={80}
                  />
                  <div>{item.name}</div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PartnershipsOne;
