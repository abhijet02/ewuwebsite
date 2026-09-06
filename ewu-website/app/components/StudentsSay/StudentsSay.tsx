"use client";

import "./StudentsSay.scss";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import { Pagination, Navigation } from "swiper/modules";
import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { usePageData } from "@lib/hooks/usePageData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";

const StudentsSay: React.FC = () => {
  const { pageStudentsSays } = usePageData();

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const swiperRef = useRef<SwiperClass | null>(null);

  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  if (!pageStudentsSays || pageStudentsSays.length === 0) return null;

  return (
    <>
      <section className="students-says-part">
        <div className="container">
          <div className="row">
            {/* Arrows */}
            <div className="col-12">
              <div className="custom-arrow">
                {pageStudentsSays?.length > 2 && (
                  <>
                    <button
                      className="left-arrow"
                      onClick={() => swiperRef.current?.slidePrev()}
                    >
                      <Icon icon="mynaui:arrow-left" width="22" height="22" />
                    </button>
                    <button
                      className="right-arrow"
                      onClick={() => swiperRef.current?.slideNext()}
                    >
                      <Icon icon="mynaui:arrow-right" width="22" height="22" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Title */}
            <div
              {...(!isStatic
                ? {
                    "data-aos":
                      window.innerWidth < 800 ? "fade-up" : "fade-right",
                  }
                : {})}
              className="col-lg-4"
            >
              <div className="students-says-title">
                <h2>What students say?</h2>
                <p>
                  Your opinion matters, and by providing feedback, you
                  contribute to the continuous enhancement of our academic
                  programs, support services, and campus life.
                </p>
              </div>
            </div>

            {/* Slider */}
            <div
              {...(!isStatic
                ? {
                    "data-aos":
                      window.innerWidth < 800 ? "fade-up" : "fade-left",
                  }
                : {})}
              className="col-lg-8"
            >
              <Swiper
                pagination={false}
                navigation={false}
                slidesPerView={1}
                spaceBetween={20}
                modules={[Pagination, Navigation]}
                loop={true}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                breakpoints={{
                  1024: { slidesPerView: 2, spaceBetween: 20 },
                  1440: { slidesPerView: 2, spaceBetween: 20 },
                }}
                className="mySwiper"
              >
                {pageStudentsSays &&
                  pageStudentsSays.map((student) => (
                    <SwiperSlide key={student.id}>
                      <div className="students-says-box">
                        <div className="students-says-info">
                          <div className="students-says-rating">
                            {[...Array(5)].map((_, i) => (
                              <Icon
                                key={i}
                                icon="ic:round-star"
                                width="20"
                                height="20"
                              />
                            ))}
                          </div>
                          <div className="student-message">
                            <p className="student-message-text">
                              {student.description}
                            </p>
                            <span
                              className="read-more"
                              onClick={() => setSelectedStudent(student)}
                            >
                              Read more
                            </span>
                          </div>
                        </div>
                        <div className="students-says-img">
                          <Image
                            src={student.photoUrl}
                            width={300}
                            height={300}
                            className="logo"
                            alt="Student Avatar"
                          />
                          <div className="student-testimonial">
                            <h2>{student.name}</h2>
                            <p className="student-designation">
                              {student.designation}
                            </p>
                          </div>
                        </div>
                        <span className="student-quote">
                          <Icon icon="lucide:quote" width="34" height="34" />
                        </span>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Modal */}
        {selectedStudent && (
          <div
            className="student-modal-overlay"
            onClick={() => setSelectedStudent(null)}
          >
            <div className="student-modal" onClick={(e) => e.stopPropagation()}>
              <div className="student-modal-header">
                <h2>{selectedStudent.name}</h2>
                <button
                  className="close-btn"
                  onClick={() => setSelectedStudent(null)}
                >
                  ✖
                </button>
              </div>

              <div className="student-modal-body">
                <div className="student-modal-body-media">
                  <Image
                    src={selectedStudent.photoUrl}
                    width={120}
                    height={120}
                    alt="Student Avatar"
                  />
                </div>
              <div className="student-modal-body-details">
                <h2>{selectedStudent.name}</h2>
                <p className="student-designation">
                  {selectedStudent.designation}
                </p>
                <div className="students-says-rating">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} icon="ic:round-star" width="20" height="20" />
                  ))}
                </div>
              </div>
                <div className="student-modal-message-body">
                  {selectedStudent.description}
                </div>
                
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default StudentsSay;
