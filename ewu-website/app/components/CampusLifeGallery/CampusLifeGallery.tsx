"use client";

import "./CampusLifeGallery.scss";
import Image from "next/image";
import { usePageData } from "@lib/hooks/usePageData";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import GalleryModal from "../Gallery/GalleryModal";

const CampusLifeGallery = () => {
  const { pageGallerys: gallerys } = usePageData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(12); // initial items to show

  const itemsPerPage = 12;

  // Filter logic
  const filteredGallerys = gallerys?.filter((gallery) =>
    gallery.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentData = filteredGallerys?.slice(0, visibleItems);

  // Modal functions
  const openModal = (index: number) => {
    setSelectedItemIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const goToPrevious = () => {
    if (filteredGallerys && selectedItemIndex > 0) {
      setSelectedItemIndex(selectedItemIndex - 1);
    }
  };

  const goToNext = () => {
    if (filteredGallerys && selectedItemIndex < filteredGallerys.length - 1) {
      setSelectedItemIndex(selectedItemIndex + 1);
    }
  };

  const loadMore = () => {
    setVisibleItems((prev) => prev + itemsPerPage);
  };

  return (
    <>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search media by title..."
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="campus-life-wrapper">
        <div className="container">
          <div className="campus-life-items">
            <div className="row g-3">
              {currentData?.map((gallery, index) => {
                const isVideo = gallery?.mediaUrl?.match(/\.(mp4|webm|ogg)$/i);
                const actualIndex = index; // now it's relative to currentData slice

                return (
                  <div key={gallery?.id} className="col-md-3">
                    <div
                      {...(!isStatic
                        ? {
                            "data-aos":
                              window.innerWidth < 800
                                ? "fade-up"
                                : "fade-right",
                          }
                        : {})}
                      className="item"
                    >
                      <div
                        className="gallery-item-clickable"
                        onClick={() => openModal(actualIndex)}
                      >
                        <div
                          style={{ borderRadius: "16px", overflow: "hidden" }}
                        >
                          {isVideo ? (
                            <div className="campus-life-image video-wrapper">
                              <video width={300} height={400}>
                                <source
                                  src={gallery?.mediaUrl}
                                  type="video/mp4"
                                />
                                Your browser does not support the video tag.
                              </video>

                              {/* ▶ Play Button Overlay */}
                              <div className="video-play-overlay">
                                <span className="play-icon">▶</span>
                              </div>
                            </div>
                          ) : (
                            <div className="campus-life-image">
                              <Image
                                src={gallery?.mediaUrl}
                                fill
                                sizes="100vw"
                                alt={gallery?.title || "Gallery item"}
                              />
                            </div>
                          )}
                        </div>
                        <div className="content-wrapper">
                          <p className="title">{gallery?.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            {visibleItems < (filteredGallerys?.length || 0) && (
              <div className="text-center my-4">
                <button
                  className="load-more-button-campus-life"
                  onClick={loadMore}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <GalleryModal
        isOpen={modalOpen}
        onClose={closeModal}
        items={filteredGallerys || []}
        selectedIndex={selectedItemIndex}
        onPrevious={goToPrevious}
        onNext={goToNext}
        filteredGallerys={filteredGallerys}
        setSelectedIndex={setSelectedItemIndex}
      />
    </>
  );
};

export default CampusLifeGallery;
