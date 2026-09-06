"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { renderSafeHTML } from "@lib/utils/html2text";
import { useGalleryData } from "@lib/hooks/useGalleryData";
import { useState } from "react";
import GalleryModal from "../Gallery/GalleryModal";

const ClubGalleryDetails = () => {
  const { id } = useParams();
  const { gallerys } = useGalleryData();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Find the gallery item
  const selectedGalleryItem = gallerys?.find(
    (g) => String(g.slug) === String(id)
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

  return (
    <div className="container my-5">
      <h4 className="mb-3">{selectedGalleryItem?.title}</h4>

      <p>{renderSafeHTML(selectedGalleryItem?.description)}</p>

      <div className="row g-3">
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
              }}
              onClick={() => openModal(index)}
            >
              <Image
                src={item?.mediaUrl}
                alt={"thumb"}
                fill
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
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

export default ClubGalleryDetails;
