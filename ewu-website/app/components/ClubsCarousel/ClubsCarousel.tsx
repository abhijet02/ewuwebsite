"use client";

import "./ClubsCarousel.scss";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import { useMemo, useRef } from "react";
import { useClubData } from "@lib/hooks/useClubData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useViewAllLink } from "@lib/hooks/useViewAllLink";
const ClubsCarousel: React.FC = () => {
  const { clubs } = useClubData();
  const viewAllLink = useViewAllLink({ componentName: "ClubsCarousel" });

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const sortedClubs = useMemo(() => {
    return clubs?.slice().sort((a, b) => a.id - b.id);
  }, [clubs]);
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <section className="club-slider-section">
      <div className="container">
        <div className="header-with-view-all-button">
          <div className="header-content-with-subtitle">
            <h2>Student Developments</h2>
            <p>Clubs and Extra curricular Activities</p>
          </div>

          <Link href={viewAllLink || ""} className="for-all-view-all-button">
            View All
            <Icon icon="si:arrow-right-duotone" width="20" height="20" />
          </Link>
        </div>
        <div
          className="partnerships-main"
          onMouseEnter={() => swiperRef.current?.autoplay.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay.start()}
        >
          <Swiper
            pagination={{
              clickable: true,
              el: ".custom-swiper-pagination",
            }}
            slidesPerView={2}
            spaceBetween={20}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Autoplay, Pagination]}
            loop={true}
            breakpoints={{
              567: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
            }}
            className="mySwiper banner-swiper"
          >
            {sortedClubs?.map((item) => (
              <SwiperSlide key={item.id}>
                <Link href={`/pages/clubs/${item.slug}`}>
                  <div className="clubs-carousel-box">
                    <div className="clubs-carousel-img">
                      <Image
                        src={item?.logoUrl}
                        width={300}
                        height={300}
                        className="logo"
                        alt="Picture of the author"
                      />
                      <h1 className="clubs-carousel-text">{item.title}</h1>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
};

export default ClubsCarousel;
