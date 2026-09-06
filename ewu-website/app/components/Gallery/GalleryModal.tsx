"use client";

import {
  Gallery,
  GalleryPhoto,
} from "@lib/services/gallery/gallery.service.type";
import "./GalleryModal.scss";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryPhoto[] | Gallery[];
  selectedIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  filteredGallerys: GalleryPhoto[] | Gallery[];
  setSelectedIndex: (index: number) => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  items,
  selectedIndex,
  onPrevious,
  onNext,
  filteredGallerys,
  setSelectedIndex,
}) => {
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Prevent background scroll
  useEffect(() => {
    const html = document.documentElement;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      html.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      html.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") onPrevious();
      else if (event.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext]);

  // Scroll active thumbnail into view
  useEffect(() => {
    const thumbnails = thumbnailsRef.current;
    if (!thumbnails) return;
    const active = thumbnails.children[selectedIndex] as HTMLElement;
    if (active)
      active.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
  }, [selectedIndex]);

  if (!isOpen || !items.length) return null;

  const selectedItem = items[selectedIndex] as any;
  const isSelectedVideo = selectedItem?.mediaUrl?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className="gallery-modal-overlay" onClick={onClose}>
      <div
        className="gallery-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="gallery-modal-header">
          <button onClick={onClose} className="gallery-modal-close">
            <Icon icon="charm:cross" width="24" height="24" />
          </button>
        </div>

        {/* Mobile arrows above main image (only visible in mobile) */}

        {/* Main image + desktop arrows */}
        <div className="gallery-modal-main">
          <button
            onClick={onPrevious}
            className="gallery-modal-arrow left desktop-arrow"
          >
            <Icon icon="mdi:chevron-left" width="28" height="28" color="#fff" />
          </button>

          <div className="gallery-modal-media-wrapper">
            <div className="gallery-modal-media">
              {isSelectedVideo ? (
                <video
                  src={selectedItem.mediaUrl}
                  controls
                  className="gallery-modal-video"
                />
              ) : (
                <Image
                  src={selectedItem.mediaUrl}
                  alt={"Selected Media"}
                  width={800}
                  height={600}
                  className="gallery-modal-image"
                />
              )}
              {selectedItem?.title && (
                <div className="gallery-modal-title">{selectedItem?.title}</div>
              )}
            </div>
          </div>

          <button
            onClick={onNext}
            className="gallery-modal-arrow right desktop-arrow"
          >
            <Icon
              icon="mdi:chevron-right"
              width="28"
              height="28"
              color="#fff"
            />
          </button>
        </div>
        <div className="gallery-modal-arrows-mobile">
          <button onClick={onPrevious} className="gallery-modal-arrow left">
            <Icon icon="mdi:chevron-left" width="28" height="28" color="#fff" />
          </button>
          <button onClick={onNext} className="gallery-modal-arrow right">
            <Icon
              icon="mdi:chevron-right"
              width="28"
              height="28"
              color="#fff"
            />
          </button>
        </div>
        {/* Thumbnails */}
        <div className="gallery-modal-thumbnails" ref={thumbnailsRef}>
          {filteredGallerys?.map((galleryItem, index) => {
            const isVideo = galleryItem?.mediaUrl?.match(/\.(mp4|webm|ogg)$/i);

            return (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`gallery-modal-thumbnail ${
                  index === selectedIndex ? "active" : ""
                }`}
              >
                {isVideo ? (
                  <video
                    src={galleryItem.mediaUrl}
                    width={48}
                    height={48}
                    muted
                    playsInline
                    preload="metadata"
                    style={{
                      objectFit: "cover",
                      borderRadius: "4px",
                      backgroundColor: "#000",
                    }}
                    onLoadedMetadata={(e) => {
                      const video = e.currentTarget;
                      video.currentTime = 1; // Grab frame from 1 second in
                    }}
                  />
                ) : (
                  <Image
                    src={galleryItem?.mediaUrl}
                    alt={galleryItem?.title || "Thumbnail"}
                    width={48}
                    height={48}
                    style={{ objectFit: "cover", borderRadius: "4px" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
