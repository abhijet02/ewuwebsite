"use client";

import "./NewsDetails.scss";
import { renderSafeHTML } from "@lib/utils/html2text";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { checkIfVideo } from "@lib/utils/checkIfVideo";
import Image from "next/image";
import { Icon } from "@iconify/react";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import ShareButtons from "../Share/ShareButtons";
import { useParams, usePathname } from "next/navigation";
import ArticlePageLayout from "../Share/ArticlePageLayout";
import { newsActions } from "@lib/slices/news/news.slice";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import GalleryModal from "../Gallery/GalleryModal";
import { GalleryPhoto } from "@lib/services/gallery/gallery.service.type";

const NewsDetails: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const slug: string = id as string;

  const selectedNews = useAppSelector(
    (state: RootState) => state.news.getNewsBySlugResponse?.newsBySlug
  );

  const path = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_LOCAL_FILE_PATH;
  const fullUrl = `${baseUrl}${path}`;
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);
  const swiperRef = useRef<SwiperClass | null>(null);
  const firstMediaItem = selectedNews?.photos?.[0];

  // Modal state
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryPhoto[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Check if data exists
  const isLoading = !selectedNews;

  useEffect(() => {
    dispatch(newsActions.getNewsBySlug({ request: { slug } }));
  }, [dispatch, slug]);

  // Map photos to galleryItems
  useEffect(() => {
    if (selectedNews?.photos?.length) {
      const items = selectedNews.photos.map((photo) => ({
        mediaUrl: photo.url,
        title: "",
      }));
      setGalleryItems(items as any);
    }
  }, [selectedNews]);

  if (isLoading) {
    return (
      <div className="news-details-wrapper">
        <div className="skeleton skeleton-title skeleton-text"></div>
        <div className="skeleton skeleton-text" style={{ width: "40%" }}></div>
        <div className="skeleton skeleton-text" style={{ width: "30%" }}></div>
        <div className="skeleton skeleton-img"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
      </div>
    );
  }

  return (
    <ArticlePageLayout>
      <div className="news-details-wrapper">
        <div className="social-icon-wrapper">
          <div className="news-details-header-part">
            <h2>{selectedNews?.label}</h2>
            <div className="news-details-subheader-part">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                {selectedNews?.date && (
                  <div className="news-details-date-time">
                    <div
                      style={{
                        height: "24px",
                        width: "24px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Icon icon="uis:calender" width="20" height="20" />
                    </div>
                    <p style={{ margin: 0, textAlign: "left" }}>
                      {moment(selectedNews?.date).format("ddd, D MMM, YYYY")}
                    </p>
                  </div>
                )}
                {selectedNews?.reporterName && (
                  <div className="news-details-date-time">
                    <div
                      style={{
                        height: "24px",
                        width: "24px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Icon icon="gridicons:user" width="20" height="20" />
                    </div>
                    <p style={{ margin: 0, textAlign: "left" }}>
                      {selectedNews?.reporterName}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Swiper Slider */}
        <section
          className="news-details-media-part"
          onMouseEnter={() => swiperRef.current?.autoplay.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay.start()}
        >
          <Swiper
            pagination={{ el: ".custom-swiper-pagination", clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            modules={[Pagination, Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {selectedNews?.photos?.map((item, index) => (
              <SwiperSlide key={item.id || index}>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedIndex(index);
                    setGalleryOpen(true);
                    swiperRef.current?.autoplay.stop(); // pause background autoplay
                  }}
                >
                  {!checkIfVideo(item?.url) ? (
                    <Image
                      src={item?.url}
                      alt="Slider Photo"
                      className="news-details-media-file"
                      width={1500}
                      height={550}
                      style={{ objectFit: "contain" }}
                    />
                  ) : (
                    <video autoPlay loop muted playsInline preload="auto">
                      <source src={item?.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-swiper-pagination"></div>
        </section>

        {/* Image for print */}
        <section className="image-for-print">
          {firstMediaItem && (
            <Image
              src={firstMediaItem?.url}
              alt="Article Photo"
              className="news-details-media-file"
              width={650}
              height={300}
              style={{ objectFit: "contain" }}
            />
          )}
        </section>

        {/* Description */}
        <section className="news-details-description-part">
          <div {...(!isStatic ? { "data-aos": "fade-up" } : {})}>
            <div className="industrialization-club">
              <div>{renderSafeHTML(selectedNews?.description)}</div>
            </div>
          </div>
        </section>

        {/* Share Buttons */}
        <ShareButtons
          url={fullUrl}
          platforms={["facebook", "twitter", "linkedin", "print"]}
        />

        {/* Gallery Modal */}
        <GalleryModal
          isOpen={isGalleryOpen}
          onClose={() => {
            setGalleryOpen(false);
            swiperRef.current?.autoplay.start(); // resume autoplay
          }}
          items={galleryItems}
          selectedIndex={selectedIndex}
          onPrevious={() =>
            setSelectedIndex((prev) =>
              prev === 0 ? galleryItems.length - 1 : prev - 1
            )
          }
          onNext={() =>
            setSelectedIndex((prev) =>
              prev === galleryItems.length - 1 ? 0 : prev + 1
            )
          }
          filteredGallerys={galleryItems}
          setSelectedIndex={setSelectedIndex}
        />
      </div>
    </ArticlePageLayout>
  );
};

export default NewsDetails;
