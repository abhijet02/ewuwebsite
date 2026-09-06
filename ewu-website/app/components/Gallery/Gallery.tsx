"use client";

import "./Gallery.scss";
import Image from "next/image";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useGalleryData } from "@lib/hooks/useGalleryData";
import { useSearchParams, usePathname } from "next/navigation";
import { useAppSelector } from "@lib/hooks";
import { Publish } from "@lib/services/gallery/gallery.service.type";

const ITEMS_PER_PAGE = 12;

const Gallery: React.FC = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);
  const { gallerys } = useGalleryData();

  const pageParams = searchParams.get("pageId");
  const pageIdFromQuery = pageParams ? Number(pageParams) : null;

  const pageIdFromPath =
    pages?.find((page) => page.link === pathName)?.id ||
    pages?.find((page) => page.link.split("?")[0] === pathName)?.id ||
    null;

  const pageId = pageIdFromQuery ?? pageIdFromPath;

  const [searchQuery, setSearchQuery] = useState("");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  // ✅ ORDERED + FILTERED SOURCE OF TRUTH
  const orderedGalleries = useMemo(() => {
    if (!gallerys || !pageId) return [];

    return gallerys
      .filter(
        (gallery) =>
          gallery?.isPublished === Publish.YES && gallery?.pageId === pageId
      )
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [gallerys, pageId]);

  // 🔍 Search (order preserved)
  const searchedGalleries = useMemo(() => {
    return orderedGalleries.filter((gallery) =>
      gallery.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [orderedGalleries, searchQuery]);

  // 📄 Pagination (order preserved)
  const visibleGalleries = useMemo(() => {
    return searchedGalleries.slice(0, visibleItems);
  }, [searchedGalleries, visibleItems]);

  const loadMore = () => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <section style={{ margin: "40px 0px" }}>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search media by title..."
          className="gallery-form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="row g-3">
        {visibleGalleries.map((gallery) => (
          <div key={gallery.id} className="col-12 col-sm-6 col-md-3 col-lg-3">
            <Link
              href={`gallery-details/${gallery.id}`}
              className="gallery-card"
            >
              <div className="gallery-image-wrapper">
                <Image
                  src={gallery.mediaUrl}
                  fill
                  sizes="100vw"
                  alt={gallery.title || "Gallery item"}
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="gallery-content">
                <p className="gallery-title">{gallery.title}</p>
                <div className="gallery-count">
                  <Icon icon="mdi-light:image" width="20" height="20" />
                  <p>{gallery.galleryPhoto?.length} files</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {visibleItems < searchedGalleries.length && (
        <div className="text-center my-4">
          <button className="load-more-button-campus-life" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
