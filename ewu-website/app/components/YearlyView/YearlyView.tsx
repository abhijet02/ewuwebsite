"use client";

import React, { useEffect, useState } from "react";
import "./YearlyView.scss";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { yearlyViewActions } from "@lib/slices/yearlyView/yearlyView.slice";
import { usePathname } from "next/navigation";
import { pageActions } from "@lib/slices/page/page.slice";
import Image from "next/image";
import PdfViewer from "@/app/components/PdfViewer/PdfViewer";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { Publish } from "@lib/services/yearlyView/yearlyView.service.type";
import { useGalleryData } from "@lib/hooks/useGalleryData";
import Link from "next/link";
import GalleryModal from "../Gallery/GalleryModal";
import { Icon } from "@iconify/react";
import ConvocationQuote from "../ConvocationQuote/ConvocationQuote";
import { createPortal } from "react-dom";

const YearlyView: React.FC = () => {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);
  const pageId = pages?.find((page) => page.link === pathName)?.id;

  const yearlyViews = useAppSelector(
    (state) => state.yearlyView.getYearlyViewsResponse?.yearlyViews
  )
    ?.filter((d) => d?.isPublished === Publish.YES)
    ?.sort(
      (a, b) =>
        new Date(b.date.toString()).getTime() -
        new Date(a.date.toString()).getTime()
    );

  const [yearSearch, setYearSearch] = useState<string>("");

  useEffect(() => {
    dispatch(
      yearlyViewActions.getYearlyViews({
        request: { page: 1, limit: 500 },
      })
    );

    dispatch(
      pageActions.getPages({
        request: { page: 0, limit: 500 },
      })
    );
  }, [dispatch]);

  const yearlyViewByPage = yearlyViews?.filter(
    (item) => item.pageId === pageId
  );

  const yearlyViewByYear = yearlyViewByPage?.reduce((acc, item) => {
    const year = parseInt(item.year);
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {} as Record<number, typeof yearlyViewByPage>);

  const filteredYearlyViewByYear = yearSearch
    ? Object.keys(yearlyViewByYear || {})
        .filter((yearStr) => yearStr.includes(yearSearch))
        .reduce((acc, yearStr) => {
          acc[Number(yearStr)] = yearlyViewByYear![Number(yearStr)];
          return acc;
        }, {} as Record<number, typeof yearlyViewByPage>)
    : yearlyViewByYear;

  const filteredYearsDesc = filteredYearlyViewByYear
    ? Object.keys(filteredYearlyViewByYear).sort(
        (a, b) => Number(b) - Number(a)
      )
    : [];

  const initialTabYear = filteredYearsDesc.length
    ? Number(filteredYearsDesc[0])
    : 0;

  const [activeTab, setActiveTab] = useState<number>(initialTabYear);
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);
  const [pdfModal, setPdfModal] = useState<{
    url: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    if (
      filteredYearsDesc.length > 0 &&
      !filteredYearsDesc.includes(String(activeTab))
    ) {
      setActiveTab(Number(filteredYearsDesc[0]));
    }
  }, [filteredYearsDesc, activeTab]);

  // Unified download function
  const handleDownload = async (url: string, filename: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const { convocationGallery } = useGalleryData();

  // Filter convocation gallery by selected year
  const filteredConvocationGallery =
    convocationGallery?.filter((gallery) => {
      const galleryYear = parseInt(gallery.year);
      return galleryYear === activeTab;
    }) || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Get all gallery photos from filtered convocation galleries
  const allGalleryPhotos =
    filteredConvocationGallery?.flatMap(
      (gallery) =>
        gallery?.galleryPhoto?.map((photo) => ({
          ...photo,
          galleryTitle: gallery?.title,
          galleryYear: gallery?.year,
        })) || []
    ) || [];

  // Modal handlers - SIMPLIFIED like GalleryDetails
  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const goToPrevious = () => {
    setSelectedIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToNext = () => {
    setSelectedIndex((prev) => Math.min(prev + 1, allGalleryPhotos.length - 1));
  };

  // helper: detect video by extension
  const isVideo = (url: string) => {
    if (!url) return false;
    const videoExtensions = [".mp4", ".mov", ".avi", ".mkv", ".webm"];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  // Calculate global index for opening modal from gallery grid
  const getGlobalIndex = (galleryIndex: number, photoIndex: number) => {
    let globalIndex = 0;
    for (let i = 0; i < galleryIndex; i++) {
      globalIndex += filteredConvocationGallery[i]?.galleryPhoto?.length || 0;
    }
    return globalIndex + photoIndex;
  };

  // console.log('activeTab',activeTab)

  return (
    <section className="yearly-view-part">
      <div {...(!isStatic ? { "data-aos": "zoom-in" } : {})}>
        <div>
          <div className="yearly-view-tabs">
            <div className="yearly-view-filters">
              <div className="form-group">
                <label>Search by Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter title..."
                  value={yearSearch}
                  onChange={(e) => setYearSearch(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Select by Year</label>
                <select
                  className="form-select"
                  value={activeTab}
                  onChange={(e) => setActiveTab(Number(e.target.value))}
                >
                  {filteredYearsDesc.map((yearStr) => {
                    const year = Number(yearStr);
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Tab content */}
            <div className="tab-content">
              <div className="row">
                {filteredYearlyViewByYear?.[activeTab]
                  ?.filter((item) => item.pageId === pageId)
                  ?.map((item, index) => (
                    <div key={index}>
                      {item.title && (
                        <h3 className="card-title mb-3 mt-3">{item.title}</h3>
                      )}

                      <div>
                        {/* Image */}
                        {item?.photoUrl && (
                          <Image
                            src={item?.photoUrl}
                            alt={item?.title || "Yearly View"}
                            width={1000}
                            height={800}
                            style={{
                              width: "100%",
                              height: "auto",
                              objectFit: "contain",
                            }}
                          />
                        )}

                        <div style={{ padding: "16px 8px" }}>
                          {/* Attachments Table */}
                          <table className="table table-bordered mt-3">
                            <thead>
                              <tr>
                                <th colSpan={2}>{item.title}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                {
                                  name: item?.attachment1Name,
                                  url: item?.attachment1Url,
                                },
                                {
                                  name: item?.attachment2Name,
                                  url: item?.attachment2Url,
                                },
                                ...(item.yearlyViewAttachment?.map(
                                  (attachment) => ({
                                    name:
                                      attachment?.attachmentName || "Unknown",
                                    url: attachment?.attachmentUrl,
                                  })
                                ) || []),
                              ]
                                .filter((att) => att.name && att.url)
                                .map((att, idx) => (
                                  <tr
                                    key={idx}
                                    style={{
                                      display: "flex",
                                      alignItems: "stretch",
                                    }}
                                  >
                                    <td
                                      style={{
                                        flex: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "8px 12px",
                                      }}
                                    >
                                      {att.name}
                                    </td>
                                    <td
                                      className="d-flex gap-2"
                                      style={{
                                        flex: 1,
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        padding: "8px 12px",
                                      }}
                                    >
                                      <button
                                        className="yearly-view-preview-button"
                                        onClick={() =>
                                          setPdfModal({
                                            url: att.url,
                                            title: att.name,
                                          })
                                        }
                                      >
                                        Preview
                                      </button>
                                      <button
                                        className="yearly-view-download-button"
                                        onClick={() =>
                                          handleDownload(att.url, att.name)
                                        }
                                      >
                                        Download
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeTab && (
        <div className="mt-3 mb-3">
          <ConvocationQuote year={activeTab.toString()} />
        </div>
      )}

      {/* Convocation Gallery - Filtered by Year */}
      <div>
        {filteredConvocationGallery?.length > 0 ? (
          <div style={{ marginTop: "40px" }}>
            {filteredConvocationGallery?.map((gallery, galleryIndex) => (
              <div
                key={gallery?.id || galleryIndex}
                style={{ marginBottom: "40px" }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <h3 style={{ fontWeight: 600, fontSize: "1.5rem" }}>
                    {gallery?.title || "Convocation Gallery"}
                  </h3>

                  <Link
                    href={`gallery-details/${gallery?.id}`}
                    className="button-contain primary-button-contain"
                  >
                    View All
                  </Link>
                </div>

                {/* Gallery Grid - Updated to match GalleryDetails styling */}
                <div className="row g-3">
                  {gallery?.galleryPhoto?.slice(0, 8).map((img, photoIndex) => (
                    <div
                      className="col-12 col-sm-6 col-md-3 col-lg-3"
                      key={`${gallery.id}-${photoIndex}`}
                    >
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
                        onClick={() =>
                          openModal(getGlobalIndex(galleryIndex, photoIndex))
                        }
                      >
                        {isVideo(img?.mediaUrl) ? (
                          <div
                            style={{
                              position: "relative",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <video
                              src={img?.mediaUrl}
                              width="100%"
                              height="100%"
                              muted
                              playsInline
                              preload="metadata"
                              style={{
                                objectFit: "cover",
                                borderRadius: "4px",
                                backgroundColor: "#000",
                                display: "block",
                              }}
                              onLoadedMetadata={(e) => {
                                const video = e.currentTarget;
                                video.currentTime = 1;
                              }}
                            />
                            {/* Play Icon Overlay - Fixed positioning */}
                            <div
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                                borderRadius: "4px",
                                zIndex: 1,
                                pointerEvents: "none",
                              }}
                            >
                              <Icon
                                icon="mdi:play"
                                style={{
                                  fontSize: "4rem",
                                  color: "rgba(255, 255, 255, 0.9)",
                                  border: "2px solid rgba(255, 255, 255, 0.8)",
                                  borderRadius: "50%",
                                  padding: "8px",
                                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          <Image
                            src={img?.mediaUrl}
                            alt={gallery?.title || "Convocation Image"}
                            fill
                            sizes="100vw"
                            style={{
                              objectFit: "cover",
                              objectPosition: "top",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Show "No data found" when no galleries match the selected year
          filteredYearsDesc?.length > 0 && (
            <div
              style={{
                marginTop: "40px",
                textAlign: "center",
                padding: "40px",
                borderRadius: "8px",
              }}
            >
              <h3
                style={{
                  color: "#6c757d",
                  fontWeight: 500,
                  marginBottom: "16px",
                }}
              >
                No Convocation Gallery Found for Year - {activeTab}
              </h3>
            </div>
          )
        )}
      </div>

      {/* Gallery Modal - Use exactly like GalleryDetails */}
      {modalOpen &&
        createPortal(
          <GalleryModal
            isOpen={modalOpen}
            onClose={closeModal}
            items={allGalleryPhotos}
            filteredGallerys={allGalleryPhotos}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            onPrevious={goToPrevious}
            onNext={goToNext}
          />,
          document.body
        )}

      {pdfModal && (
        <PdfViewer
          url={pdfModal.url}
          title={pdfModal.title}
          open={!!pdfModal}
          onClose={() => setPdfModal(null)}
        />
      )}
    </section>
  );
};

export default YearlyView;
