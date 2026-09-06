"use client";
import "./AchievementDetails.scss";
import { renderSafeHTML } from "@lib/utils/html2text";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useNewsData } from "@lib/hooks/useAnnouncementData";
import Image from "next/image";
import { RootState } from "@lib/root.reducer";
import { useSelector } from "react-redux";
import ShareButtons from "../Share/ShareButtons";
import { usePathname } from "next/navigation";
import ArticlePageLayout from "../Share/ArticlePageLayout";
import GalleryModal from "../Gallery/GalleryModal";
import { GalleryPhoto } from "@lib/services/gallery/gallery.service.type";
import { Icon } from "@iconify/react";
import Head from "next/head";

const AchievementDetails: React.FC = () => {
  const { filteredAchievement } = useNewsData();
  const path = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_LOCAL_FILE_PATH;
  const fullUrl = `${baseUrl}${path}`;
  const firstMediaItem = filteredAchievement?.photos?.[0];

  const swiperRef = useRef<SwiperClass | null>(null);
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  // Gallery modal states
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryPhoto[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Prepare gallery items
  useEffect(() => {
    if (filteredAchievement?.photos?.length) {
      const items = filteredAchievement.photos.map((photo) => ({
        mediaUrl: photo.url,
      }));
      setGalleryItems(items as any);
    }
  }, [filteredAchievement]);

  const handleSlideClick = (index: number) => {
    setSelectedIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <ArticlePageLayout>
      <div className="achivement-details-wrapper">
        <div>
          <h2>{filteredAchievement?.label}</h2>
          <div className="achivement-details-subheader-part">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                alignItems: "center",
              }}
            >
              {filteredAchievement?.date && (
                <div className="achivement-details-date-time">
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
                    {new Date(filteredAchievement?.date).toDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-6">
            <section className="industrialization-club-part">
              <div {...(!isStatic ? { "data-aos": "fade-up" } : {})}>
                <div className="industrialization-club">
                  {renderSafeHTML(filteredAchievement?.description)}
                </div>
              </div>
            </section>
          </div>

          <div className="col-lg-6">
            <section
              className="achivement-banner"
              onMouseEnter={() => swiperRef.current?.autoplay.stop()}
              onMouseLeave={() => swiperRef.current?.autoplay.start()}
            >
              <Swiper
                pagination={{
                  el: ".custom-swiper-pagination",
                  clickable: true,
                }}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                modules={[Pagination, Autoplay]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
              >
                {filteredAchievement?.photos?.map((item, index) => (
                  <SwiperSlide
                    key={item.id || index}
                    onClick={() => handleSlideClick(index)}
                    className="d-flex justify-content-center align-items-center"
                  >
                    {item?.url && (
                      <Image
                        src={item?.url}
                        alt={"Slider Photo"}
                        className="media-image img-fluid"
                        width={1200}
                        height={700}
                        style={{ objectFit: "contain" }}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="custom-swiper-pagination"></div>
            </section>
            <section className="image-for-print">
              {firstMediaItem && firstMediaItem?.url && (
                <Image
                  src={firstMediaItem.url}
                  alt="Article Photo"
                  width={650}
                  height={300}
                  style={{ objectFit: "contain" }}
                />
              )}
            </section>
          </div>
        </div>

        <ShareButtons
          url={fullUrl}
          platforms={["facebook", "twitter", "linkedin", "print", "mail"]}
          title={filteredAchievement?.label || "Check this out"}
        />

        {/* Gallery Modal */}
        <GalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          items={galleryItems}
          filteredGallerys={galleryItems}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          onPrevious={() =>
            setSelectedIndex(
              (prev) => (prev - 1 + galleryItems.length) % galleryItems.length
            )
          }
          onNext={() =>
            setSelectedIndex((prev) => (prev + 1) % galleryItems.length)
          }
        />
      </div>
    </ArticlePageLayout>
  );
};

export default AchievementDetails;
