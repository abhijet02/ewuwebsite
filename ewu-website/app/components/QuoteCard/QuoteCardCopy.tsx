"use client";

import "./QuoteCardCopy.scss";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { useEffect } from "react";
import { quoteActions } from "@lib/slices/quote/quote.slice";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const QuoteCardCopy: React.FC = () => {
  const dispatch = useAppDispatch();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const quotes = useAppSelector(
    (state) => state.quote.getQuotesResponse?.Quotes
  );

  useEffect(() => {
    dispatch(
      quoteActions.getQuotes({
        request: {
          page: 1,
          limit: 10,
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play();
            video.muted = false; // restore based on state
          } else {
            video.pause();
            video.muted = true; // force mute when out of view
          }
        });
      },
      { threshold: 0.25 } // trigger when at least 25% visible
    );

    const videos = document.querySelectorAll(".video-background");
    videos.forEach((video) => observer.observe(video));

    return () => {
      videos.forEach((video) => observer.unobserve(video));
    };
  }, []);

  return (
    <section className="teachers-say-part">
      <div className="container">
        <Swiper
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".custom-next",
          }}
          modules={[Pagination, Navigation]}
          loop={true}
          className="mySwiper banner-swiper"
        >
          {quotes?.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
                className="teachers-box"
              >
                <div className="teachers-img">
                  {item.imageUrl && (
                    <>
                      {/* Check if the file is a video (mp4, webm, etc.) */}
                      {item.imageUrl.endsWith(".mp4") ||
                      item.imageUrl.endsWith(".webm") ||
                      item.imageUrl.endsWith(".mov") ? (
                        <video
                          controls
                          playsInline
                          preload="auto"
                          className="video-background"
                          height={500}
                          style={{
                            height: "300px",
                            width: "300px",
                            padding: "5px",
                            borderWidth: "10px",
                            borderStyle: "groove",
                            borderColor: "#f18f7c",
                            borderRadius: "40px",
                          }}
                        >
                          <source
                            src={item.imageUrl}
                            type={`video/${item.imageUrl.split(".").pop()}`}
                          />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        /* Render the image if it's not a video file */
                        <Image
                          src={item.imageUrl}
                          width={300}
                          height={300}
                          className="logo"
                          alt="Picture of the author"
                        />
                      )}
                    </>
                  )}
                </div>
                <div className="theachers-text-info">
                  <div className="theachers-text">
                    <p>
                      <span>
                        <Icon icon="lucide:quote" width="34" height="34" />
                      </span>
                      <span>{item.quote}</span>
                      <span>
                        <Icon icon="lucide:quote" width="34" height="34" />
                      </span>
                    </p>
                  </div>
                  <div className="theachers-info">
                    <div>
                      <h2>
                        <Link
                          style={{ color: "#b8a213", textDecoration: "none" }}
                          href={
                            index == 0
                              ? "/pages/office-member/Professor-Dr-Mohammed-Farashuddin"
                              : "/pages/office-member/Professor-Shams-Rahman"
                          }
                        >
                          {item.name}
                        </Link>
                      </h2>
                      <p>{item.designation}</p>
                    </div>
                    <div className="custom-next">
                      {item.nextThumbnailUrl && (
                        <Image
                          src={item.nextThumbnailUrl}
                          width={300}
                          height={300}
                          className="logo"
                          alt="Picture of the author"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default QuoteCardCopy;
