"use client";

import "./ConvocationQuote.scss";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import { Pagination, Navigation } from "swiper/modules";
import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import PdfViewer from "../PdfViewer/PdfViewer";
import { useConvocationQoute } from "@lib/hooks/useConvocationQoute";

const ConvocationQuote: React.FC<{ year?: string }> = ({ year }) => {
  const { pageStudentsSays } = useConvocationQoute();
  const [pdfModal, setPdfModal] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const swiperRef = useRef<SwiperClass | null>(null);

  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  if (!pageStudentsSays || pageStudentsSays.length === 0) return null;

  return (
    <section className="pt-5 pb-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="convocation-slider-header">
              <h3>Message</h3>
              <div className="custom-arrow">
                {pageStudentsSays &&
                  pageStudentsSays?.length > 2 &&
                  pageStudentsSays.filter((p) => p?.year == year) && (
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
                        <Icon
                          icon="mynaui:arrow-right"
                          width="22"
                          height="22"
                        />
                      </button>
                    </>
                  )}
              </div>
            </div>
          </div>
          <div>
            <Swiper
              pagination={false}
              navigation={false}
              slidesPerView={3}
              spaceBetween={20}
              modules={[Pagination, Navigation]}
              loop={true}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 10 }, // 👈 mobile first
                768: { slidesPerView: 2, spaceBetween: 15 }, // 👈 tablet
                991: { slidesPerView: 2, spaceBetween: 20 }, // 👈 desktop
                1440: { slidesPerView: 3, spaceBetween: 20 }, // 👈 large screen
              }}
            >
              {pageStudentsSays &&
                pageStudentsSays
                  .filter((p) => p?.year == year)
                  .map((student) => (
                    <SwiperSlide key={student.id} style={{ padding: "12px" }}>
                      <div
                        className="convocation-quote-message-box"
                        onClick={() => {
                          if (student.attachmentUrl) {
                            setPdfModal({
                              url: student.attachmentUrl,
                              title: student.name,
                            });
                          } else {
                            setSelectedStudent(student);
                          }
                        }}
                      >
                        <div className="convocation-quote-img">
                          <Image
                            src={student.photoUrl}
                            fill
                            sizes="100vw"
                            alt="Student Avatar"
                          />
                        </div>
                        <div className="convocation-quote-messanger-info">
                          <h5>{student.name}</h5>
                          <p>{student.designation}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </div>
        {pdfModal && (
          <PdfViewer
            url={pdfModal.url}
            title="Preview"
            open={!!pdfModal}
            onClose={() => setPdfModal(null)}
          />
        )}
      </div>
    </section>
  );
};

export default ConvocationQuote;
