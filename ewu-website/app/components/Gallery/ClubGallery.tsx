"use client";

import "./Gallery.scss";
import Image from "next/image";
import { useState } from "react";
// import GalleryModal from "./GalleryModal";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useGalleryData } from "@lib/hooks/useGalleryData";
import { useSearchParams, usePathname } from "next/navigation";
import { useAppSelector } from "@lib/hooks";
import { Publish } from "@lib/services/gallery/gallery.service.type";

const ClubGallery: React.FC = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();

  // get all pages
  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);

  // get all gallery data
  const { gallerys } = useGalleryData();

  // get page params
  const pageParams = searchParams.get("pageId");

  // fetch page id
  const page =
    pages?.find((page) => page.link === pathName) ||
    pages?.find((page) => page.link.split("?")[0] === pathName);

  const [searchQuery, setSearchQuery] = useState("");

  const [visibleItems, setVisibleItems] = useState(12); // initial items to show

  const itemsPerPage = 12;

  // Get pagewise gallery
  const pagesGallery = gallerys?.filter(
    (gallery) =>
      gallery?.isPublished === Publish.YES &&
      (gallery?.pageId === parseInt(pageParams || "") ||
        gallery?.pageId === page?.id || gallery?.pageId === page?.contentOf)
  );

  // Filter logic
  const filteredPageGallerys = pagesGallery?.filter((gallery) =>
    gallery.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentData = filteredPageGallerys?.slice(0, visibleItems);

  const loadMore = () => {
    setVisibleItems((prev) => prev + itemsPerPage);
  };

  return (
    <section style={{ margin: "40px 0px" }}>
      <div className="my-4" style={{ width: "100%" }}>
        <input
          type="text"
          placeholder="Search media by title..."
          className="gallery-form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="row g-3">
        {currentData?.map((gallery, index) => {
          return (
            <div
              key={gallery?.id}
              className="col-12 col-sm-6 col-md-3 col-lg-3"
            >
              <Link
                href={`/pages/club-photo-gallery-details/${
                  gallery?.slug
                }?pageId=${page?.contentOf || pageParams || page?.id  }`}
                className="gallery-card"
              >
                <div className="gallery-image-wrapper">
                  <Image
                    src={gallery?.mediaUrl}
                    fill
                    sizes="100vw"
                    alt={gallery?.title || "Gallery item"}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="gallery-content">
                  <p className="gallery-title">{gallery?.title}</p>
                  <div className="gallery-count">
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon icon="mdi-light:image" width="20" height="20" />
                    </div>
                    <p>{gallery?.galleryPhoto?.length} Images</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {visibleItems < (filteredPageGallerys?.length || 0) && (
        <div className="text-center my-4">
          <button className="load-more-button-campus-life" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
      {/* <GalleryModal
        isOpen={modalOpen}
        onClose={closeModal}
        items={filteredGallerys || []}
        selectedIndex={selectedItemIndex}
        onPrevious={goToPrevious}
        onNext={goToNext}
        filteredGallerys={filteredGallerys}
        setSelectedIndex={setSelectedItemIndex}
      /> */}
    </section>
  );
};

export default ClubGallery;
