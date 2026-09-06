"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { renderSafeHTML } from "@lib/utils/html2text";
import { useGalleryData } from "@lib/hooks/useGalleryData";
import { useState } from "react";
import GalleryModal from "../Gallery/GalleryModal";
import { Icon } from "@iconify/react";

const GalleryDetails = () => {
  const { id } = useParams();
  const { gallerys } = useGalleryData();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Find the gallery item
  const selectedGalleryItem = gallerys?.find(
    (g) => String(g.id) === String(id)
  );

  // All gallery photos for modal and thumbnails
  const galleryItems = selectedGalleryItem?.galleryPhoto || [];

  // Modal handlers
  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const goToPrevious = () => {
    setSelectedIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToNext = () => {
    setSelectedIndex((prev) => Math.min(prev + 1, galleryItems.length - 1));
  };

  // helper: detect video by extension or mime
  const isVideo = (url: string) => {
    if (!url) return false;
    const videoExtensions = [".mp4", ".mov", ".avi", ".mkv", ".webm"];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  return (
    <div className="container my-5">
      <h4 className="mb-3">{selectedGalleryItem?.title}</h4>

      <p>{renderSafeHTML(selectedGalleryItem?.description)}</p>

      <div className="row g-3 my-5">
        {galleryItems?.map((item, index) => (
          <div className="col-12 col-sm-6 col-md-3 col-lg-3" key={index}>
            <div
              style={{
                width: "100%",
                height: "240px",
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                backgroundColor: "#f4f4f4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => openModal(index)}
            >
              {isVideo(item?.mediaUrl) ? (
                <div
                  style={{ position: "relative", width: "100%", height: "100%" }}
                >
                  <video
                    src={item.mediaUrl}
                    width="100%"
                    height="100%"
                    muted
                    playsInline
                    preload="metadata"
                    style={{
                      objectFit: "cover",
                      borderRadius: "4px",
                      backgroundColor: "#000",
                      display: "block", // Ensures the video takes up the full space
                    }}
                    onLoadedMetadata={(e) => {
                      const video = e.currentTarget;
                      video.currentTime = 1; // Grab frame from 1 second in
                    }}
                  />

                  {/* 2. The Play Icon Overlay */}
                  <div
                    style={{
                      position: "absolute", // Position over the video
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // Optional: add a slight dark overlay to make the icon stand out
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      borderRadius: "4px",
                      // Ensure the icon is above the video
                      zIndex: 1,
                      pointerEvents: "none", // Allows click events to pass through if needed
                    }}
                  >
                    <Icon 
                icon="mdi:play" 
                style={{
                    fontSize: "4rem", // Bootstrap utility size for large icon (adjust as needed)
                    color: "rgba(255, 255, 255, 0.9)",
                    // Optional: Style the icon background for better visibility
                    border: '2px solid rgba(255, 255, 255, 0.8)',
                    borderRadius: '50%',
                    padding: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}
            />
                  </div>
                </div>
              ) : (
                <Image
                  src={item?.mediaUrl}
                  alt={"thumb"}
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <GalleryModal
        isOpen={modalOpen}
        onClose={closeModal}
        items={galleryItems}
        filteredGallerys={galleryItems}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </div>
  );
};

export default GalleryDetails;
