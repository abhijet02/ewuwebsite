"use client";

import ChairpersonCard from "../ChairpersonCard/ChairpersonCard";
import "./ChairpersonList.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { useFacultyData } from "@lib/hooks/useFacultyData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";

const ChairpersonList: React.FC = () => {
  const {
    faculty,
    facultyChairpersons,
    departments,
    designations,
    facultyCoordinator,
  } = useFacultyData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);
  const isLoading = !facultyChairpersons || facultyChairpersons.length === 0;
  const combinedFaculty = [
    ...(facultyChairpersons ?? []),
    ...(facultyCoordinator ?? []),
  ].sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));
  return (
    <section className="chairperson-slider-deck">
      <div className="container">
        {!isLoading ? (
          <div className="faculty-header">
            <p>Welcome to the {faculty?.name} at East West University</p>
            <h2>Department Chairperson</h2>
          </div>
        ) : (
          <div className="faculty-header">
            <div
              className="skeleton skeleton-text"
              style={{ width: "60%" }}
            ></div>
            <div
              className="skeleton skeleton-title skeleton-text"
              style={{ width: "35%" }}
            ></div>
          </div>
        )}
        {isLoading ? (
          <div className="row g-3 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div className="col-12 col-sm-6 col-md-3 col-lg-3" key={i}>
                <div className="skeleton skeleton-img"></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-text"></div>
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            breakpoints={{
              567: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1440: { slidesPerView: 4, spaceBetween: 20 },
            }}
            navigation={{ nextEl: ".custom-next" }}
            modules={[Pagination, Navigation]}
            loop={false}
            className="mySwiper banner-swiper"
          >
            {combinedFaculty?.map((chairperson, index) => (
              <SwiperSlide key={chairperson?.id}>
                <div
                  {...(!isStatic
                    ? {
                        "data-aos":
                          window.innerWidth < 800
                            ? "fade-up"
                            : index === 0
                              ? "fade-right"
                              : index === facultyChairpersons.length - 1
                                ? "fade-left"
                                : "zoom-in",
                      }
                    : {})}
                  key={chairperson.id}
                >
                  <ChairpersonCard
                    chairperson={chairperson}
                    departments={departments}
                    designations={designations}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default ChairpersonList;
