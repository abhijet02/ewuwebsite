"use client";

import Image from "next/image";
import "./CampusLife.scss";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCampusLifeData } from "@lib/hooks/useCampusLifeData";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Link from "next/link";
import { useViewAllLink } from "@lib/hooks/useViewAllLink";

const CampusLife: React.FC = () => {
  const { campusLifes } = useCampusLifeData();
  const viewAllLink = useViewAllLink({ componentName: "CampusLife" });

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <div className="campus-life-wrapper">
      <div className="container">
        <div className="header-with-view-all-button">
          <h2>Campus Life</h2>
          <Link href={viewAllLink || ""} className="for-all-view-all-button">
            View All
            <Icon icon="si:arrow-right-duotone" width="20" height="20" />
          </Link>
        </div>

        {campusLifes?.length ? (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={4}
            loop={true}
            autoplay={{
              delay: 2500, // Slide interval
              disableOnInteraction: false,
              pauseOnMouseEnter: true, // Pause on hover
            }}
            style={{ padding: "8px" }}
            breakpoints={{
              320: { slidesPerView: 1 }, // 320px up to 567px
              768: { slidesPerView: 2 }, // 568px up to 899px
              900: { slidesPerView: 3 }, // 900px up to 1200px
              1201: { slidesPerView: 4 }, // 1201px and above
            }}
          >
            {campusLifes.map((campusLife) => (
              <SwiperSlide key={campusLife.id}>
                <Link href={campusLife?.link} className="item">
                  <div className="img-wrapper">
                    <Image
                      src={campusLife?.mediaUrl}
                      width={300}
                      height={400}
                      className="image-fluid"
                      alt="Campus Life"
                    />
                  </div>
                  <div className="content-wrapper">
                    <h4 className="title">{campusLife?.title}</h4>
                    <p className="disc">{campusLife?.subtitle}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>No campus life data found.</p>
        )}
      </div>
    </div>
  );
};

export default CampusLife;
