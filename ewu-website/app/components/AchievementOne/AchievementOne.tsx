"use client";

import "./AchievementOne.scss";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import moment from "moment";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useAchievementData } from "@lib/hooks/useAchievementData";
import { useRef } from "react";
import { useViewAllLink } from "@lib/hooks/useViewAllLink";

const AchievementOne: React.FC = () => {
  const { pageId, pageAchievements: achievements } = useAchievementData();
  const viewAllLink = useViewAllLink({ componentName: "AchievementOne" });

  // sort by dates
  const filteredAchievements = [...(achievements || [])].sort((a, b) =>
    moment(b.date).diff(moment(a.date))
  );
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  // Create refs for custom navigation
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="achievements-part">
      <div className="container">
        <div className="header-with-view-all-button mb-2">
          <h2>Our Achievements</h2>
          <Link href={viewAllLink || ""} className="for-all-view-all-button">
            View All
            <Icon icon="si:arrow-right-duotone" width="20" height="20" />
          </Link>
        </div>
        <div className="achievements-right">
          <div className="achivements-navigations-button">
            <div
              className="achivements-slider-navigation-button-body"
              ref={prevRef}
            >
              <Icon icon="iconamoon:arrow-left-2" width="24" height="24" />
            </div>
            <div
              className="achivements-slider-navigation-button-body"
              ref={nextRef}
            >
              <Icon icon="iconamoon:arrow-right-2" width="24" height="24" />
            </div>
          </div>
          <Swiper
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            slidesPerView={1}
            spaceBetween={20}
            modules={[Autoplay, Navigation]}
            loop={true}
            onBeforeInit={(swiper) => {
              if (typeof swiper.params.navigation !== "boolean") {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            breakpoints={{
              567: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }}
          >
            {filteredAchievements?.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
                  className="achievements-box"
                >
                  <div className="achievements-box-img">
                    {item?.thumbnail && (
                      <Image
                        src={item?.thumbnail}
                        width={200}
                        height={200}
                        alt="achievements img"
                      />
                    )}
                  </div>
                  <div className="achievements-info">
                    <div className="achievements-timeline">
                      <Icon
                        icon="material-symbols:date-range-outline-rounded"
                        width="20"
                        height="20"
                      />
                      {moment(item.date).format("MMM DD, YYYY")}
                    </div>
                    <h2>{item.label}</h2>
                    <Link href={`/pages/achievement-details/${item?.slug}`}>
                      <button>
                        View Details
                        <Icon
                          icon="si:arrow-right-duotone"
                          width="20"
                          height="20"
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default AchievementOne;
