"use client";

import "./NoticeDetails.scss";
import { renderSafeHTML } from "@lib/utils/html2text";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useNewsData } from "@lib/hooks/useAnnouncementData";
import { Icon } from "@iconify/react";
import moment from "moment";
import AttachmentViewer from "../AttachmentViewer/AttachmentViewer";
import PdfViewer from "../PdfViewer/PdfViewer";
import { usePathname } from "next/navigation";
import ArticlePageLayout from "../Share/ArticlePageLayout";
import ShareButtons from "../Share/ShareButtons";

const NoticeDetails: React.FC = () => {
  const { filteredNotice } = useNewsData();
  const path = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_LOCAL_FILE_PATH;
  const fullUrl = `${baseUrl}${path}`;
  const files = [
    filteredNotice?.attachmentUrl,
    ...(filteredNotice?.photos?.map((p) => p.url) || []),
  ].filter(Boolean);
  const renderOnlyParagraphs = (html?: string) => {
    if (!html) return null;

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const paragraphs = Array.from(doc.querySelectorAll("p"));

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {paragraphs.map((p, index) => (
            <p key={index} style={{ margin: 0 }}>
              {p.textContent}
            </p>
          ))}
        </div>
      );
    } catch (error) {
      console.error("Failed to parse HTML:", error);
      return null;
    }
  };

  const isLoading = !filteredNotice;
  // --- PDF Modal State ---
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const handlePreview = (url: string) => {
    setPdfUrl(url);
    setPdfOpen(true);
  };

  return (
    <ArticlePageLayout>
      <div className="news-details-wrapper">
        <h4>
          {isLoading ? (
            <span className="skeleton skeleton-text" />
          ) : (
            filteredNotice?.label
          )}
        </h4>

        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-1">
            <div className="notice-headline">
              <p className="notice">
                {isLoading ? (
                  <span className="skeleton skeleton-text short" />
                ) : (
                  "Notice"
                )}
              </p>
            </div>
          </div>
          <div className="notice-info-print">
            {/* Date */}
            {filteredNotice?.date && (
              <p style={{ margin: 0, textAlign: "left" }}>
                  {moment(filteredNotice?.date).format("ddd, D MMM, YYYY")}
                </p>
            )}

            {/* Location */}
            {filteredNotice?.location && (
              <p style={{ margin: 0, textAlign: "left" }}>
                  {filteredNotice?.location}
                </p>
            )}

            {/* Author */}
            {filteredNotice?.author === null && (
              <p>{renderOnlyParagraphs(filteredNotice?.author)}</p>
            )}
          </div>
          <div className="col-12 col-sm-12 col-md-8 col-lg-8">
            <div className="content-body notice-content-body-print">
              {isLoading ? (
                <>
                  <div className="skeleton skeleton-line" />
                  <div className="skeleton skeleton-line" />
                  <div className="skeleton skeleton-line" />
                  <div className="skeleton skeleton-line" />
                </>
              ) : (
                renderSafeHTML(filteredNotice?.description)
              )}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-3">
            <div className="notice-details-card">
              {isLoading ? (
                <>
                  <div className="skeleton skeleton-line short" />
                  <div className="skeleton skeleton-line short" />
                  <div className="skeleton skeleton-btn" />
                </>
              ) : (
                <>
                  <div className="notice-info-part">
                    {/* Date */}
                    {filteredNotice?.date && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "4px",
                        }}
                      >
                        <div style={{ height: "20px", width: "20px" }}>
                          <Icon icon="uis:calender" width="20" height="20" />
                        </div>
                        <p style={{ margin: 0, textAlign: "left" }}>
                          {moment(filteredNotice?.date).format(
                            "ddd, D MMM, YYYY"
                          )}
                        </p>
                      </div>
                    )}

                    {/* Location */}
                    {filteredNotice?.location && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "4px",
                        }}
                      >
                        <div style={{ height: "20px", width: "20px" }}>
                          <Icon
                            icon="basil:location-solid"
                            width="20"
                            height="20"
                          />
                        </div>
                        <p style={{ margin: 0, textAlign: "left" }}>
                          {filteredNotice?.location}
                        </p>
                      </div>
                    )}

                    {/* Author */}
                    {filteredNotice?.author === null && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "4px",
                        }}
                      >
                        <div style={{ height: "20px", width: "20px" }}>
                          <Icon
                            icon="basil:user-solid"
                            width="20"
                            height="20"
                          />
                        </div>
                        {renderOnlyParagraphs(filteredNotice?.author)}
                      </div>
                    )}
                  </div>

                  {files.length > 0 && (
                    <div className="attachments-wrapper">
                      <button className="download-btn">Preview</button>
                      <div className="attachments-list">
                        {[
                          filteredNotice.attachmentUrl,
                          ...(filteredNotice.photos?.map(
                            (photo) => photo.url
                          ) || []),
                        ].map(
                          (url, index) =>
                            url && (
                              <a
                                key={index}
                                onClick={() => handlePreview(url)}
                                // href={url} // optional if you want direct download
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Document {index + 1}
                              </a>
                            )
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <PdfViewer
            url={pdfUrl}
            title="Preview"
            open={pdfOpen}
            onClose={() => setPdfOpen(false)}
          />
          <ShareButtons
            url={fullUrl}
            platforms={["facebook", "twitter", "linkedin", "print"]}
          />
        </div>
      </div>
    </ArticlePageLayout>
  );
};

export default NoticeDetails;
