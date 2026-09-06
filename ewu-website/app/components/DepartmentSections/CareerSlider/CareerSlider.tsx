"use client";

import "./CareerSlider.scss";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { usePageData } from "@lib/hooks/usePageData";

const CareerSlider: React.FC = () => {
  const { pageId, pagePartnerships } = usePageData();

  const sortedOrganization = useMemo(() => {
    return pagePartnerships?.slice().sort((a, b) => a.id - b.id);
  }, [pagePartnerships]);
  if (!pagePartnerships || pagePartnerships.length === 0) return null;

  return (
    <div className="third-club-section">
      <div className="second-club-wrapper">
        <section className="clubs-carousel-part">
          <div className="container">
            <div className="clubs-carousel-title">
              <div>
                <h2 className="club-title-dark">
                  Job <span className="mark-blue">Perspective</span>
                </h2>
                <p>
                  Graduating from this department opens doors to exciting career
                  opportunities!
                </p>
              </div>
              <div className="clubs-carousel-title-link">
                <Link href={`/pages/job-perspective?pageId=${pageId}`}>
                  View All
                  <Icon icon="si:arrow-right-duotone" width="20" height="20" />
                </Link>
              </div>
            </div>
            <div className="partnerships-main">
              <Swiper
                pagination={false}
                navigation={true}
                slidesPerView={2}
                spaceBetween={20}
                autoplay={{
                  delay: 1500,
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
                {sortedOrganization?.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Link href={item.websiteLink}>
                      <div className="clubs-carousel-box">
                        <div className="clubs-carousel-img">
                          <Image
                            src={item?.logoUrl}
                            width={300}
                            height={300}
                            className="logo"
                            alt="Picture of the author"
                          />
                          <h1 className="clubs-carousel-text">{item.name}</h1>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CareerSlider;
