"use client";

import "./QuoteCard.scss";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SwiperCore from "swiper";

import Link from "next/link";
import { useQouteCardData } from "@lib/hooks/useQouteCardData";

const QuoteCard: React.FC = () => {
  const { pageQuotes: quotes } = useQouteCardData();

  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ Better loading detection
  const loading = !quotes || quotes.length === 0;

  const swiperRef = useRef<SwiperCore | null>(null);

  const handlePillClick = (index: number) => {
    setActiveIndex(index);
    const s = swiperRef.current as any;
    if (!s) return;
    if (typeof s.slideToLoop === "function") {
      s.slideToLoop(index);
    } else if (typeof s.slideTo === "function") {
      s.slideTo(index);
    }
  };

  return (
    <div className="quote-body">
      <div className="container">
        <div className="header-body">
          <h4>Message from the Leadership</h4>
        </div>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          spaceBetween={30}
          allowTouchMove={!loading} // disable swiper interaction while loading
        >
          {loading
            ? Array.from({ length: 2 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="row g-3">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                      <div className="messanger-image-body">
                        <div
                          className="skeleton skeleton-img"
                          style={{ height: "220px", width: "100%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                      <div className="messanger-message-body">
                        <div className="message-body">
                          <div className="quote-icon first-quote-icon">
                            <div className="skeleton skeleton-title"></div>
                          </div>
                          <div className="skeleton skeleton-text"></div>
                          <div className="skeleton skeleton-text"></div>
                          <div className="quote-icon last-quote-icon">
                            <div className="skeleton skeleton-title"></div>
                          </div>
                        </div>

                        <div className="messanger-info">
                          <div className="messanger-info-details">
                            <div
                              className="skeleton skeleton-title"
                              style={{ width: "50%" }}
                            ></div>
                            <div
                              className="skeleton skeleton-text"
                              style={{ width: "30%" }}
                            ></div>
                          </div>

                          <div className="thumbnail">
                            <div
                              className="skeleton skeleton-img"
                              style={{ width: 80, height: 80 }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : quotes?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="row g-3">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                      <div className="messanger-image-body">
                        {item.imageUrl.endsWith(".mp4") ||
                        item.imageUrl.endsWith(".webm") ||
                        item.imageUrl.endsWith(".mov") ? (
                          <video
                            controls
                            playsInline
                            preload="auto"
                            className="video-background"
                            width={350}
                            height={350}
                          >
                            <source
                              src={item.imageUrl}
                              type={`video/${item.imageUrl.split(".").pop()}`}
                            />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <Image
                            src={item.imageUrl}
                            alt={`quote-image-${index}`}
                            width={350}
                            height={350}
                          />
                        )}
                      </div>
                    </div>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                      <div className="messanger-message-body">
                        <div className="message-body">
                          <div className="quote-icon first-quote-icon">
                            <Icon icon="lucide:quote" width="36" height="36" />
                          </div>
                          <p>{item?.quote}</p>
                          <div className="quote-icon last-quote-icon">
                            <Icon icon="lucide:quote" width="36" height="36" />
                          </div>
                        </div>

                        <div className="messanger-info">
                          <div className="messanger-info-details">
                            <Link href={item?.url}>
                              <h4>{item?.name}</h4>
                            </Link>
                            <p>{item?.designation}</p>
                          </div>

                          {item?.nextThumbnailUrl && activeIndex === index && (
                            <div
                              className="thumbnail"
                              role="button"
                              tabIndex={0}
                              onClick={() =>
                                handlePillClick(
                                  (index + 1) % (quotes?.length || 1)
                                )
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  handlePillClick(
                                    (index + 1) % (quotes?.length || 1)
                                  );
                                }
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <Image
                                src={item?.nextThumbnailUrl}
                                width={300}
                                height={300}
                                className="logo"
                                alt={`author-${index}`}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>

        {/* Custom indicator pills */}
        <div className="col-12">
          <div className="indicator">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="indicator-pill skeleton"></div>
                ))
              : quotes?.map((_, i) => (
                  <div
                    key={i}
                    className={`indicator-pill ${
                      activeIndex === i ? "indicator-pill-active" : ""
                    }`}
                    onClick={() => handlePillClick(i)}
                    style={{ cursor: "pointer" }}
                  ></div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
