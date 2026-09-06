"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import CommonSubBanner from "@/app/components/CommonSubBanner/CommonSubBanner";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import { renderSafeHTML } from "@lib/utils/html2text";
import moment from "moment";
import Image from "next/image";
import PdfViewer from "@/app/components/PdfViewer/PdfViewer";
import Placeholder from "public/placeholder.png";
import { useNewsMediaData } from "@lib/hooks/useNewsMediaData";
import "./NewsMediaDetails.scss";
import { Icon } from "@iconify/react";
import { detectLinkType } from "@lib/utils/detectLinkType";
import { getYouTubeEmbedUrl } from "@lib/utils/getYouTubeEmbedUrl";

const NewsMediaDetails: React.FC = () => {
  const { newsMediaData } = useNewsMediaData();

  const params = useParams();

  const id = params?.id;

  const newsMediaItem = newsMediaData?.find((n) => n.id.toString() === id);

  const allFilesFromNewsMedia = newsMediaItem?.files || [];

  // --- PDF Modal State ---
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const handlePreview = (url: string) => {
    setPdfUrl(url);
    setPdfOpen(true);
  };

  if (!newsMediaItem) {
    return (
      <div className="news-details-page">
        <Navbar />
        <CommonSubBanner
          link={["News Media Details"]}
          title="News Media Details"
        />
        <div className="container">
          <p>Item not found!</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="news-details-page">
      <Navbar />
      <CommonSubBanner
        link={["News Media Details"]}
        title={newsMediaItem?.label}
      />

      <div className="container news-details-container">
        <h2 className="news-title">{newsMediaItem?.label}</h2>
        {newsMediaItem?.date && (
          <div className="news-media-details-date-time">
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
              {moment(newsMediaItem?.date).format("ddd, D MMM, YYYY")}
            </p>
          </div>
        )}
        <div className="news-description">
          {renderSafeHTML(newsMediaItem?.description)}
        </div>

        {/* Electronics media embedded video */}
        {newsMediaItem?.link && detectLinkType(newsMediaItem?.link) && (
          <div className="video-wrapper">
            <iframe
              src={getYouTubeEmbedUrl(newsMediaItem.link)}
              title={newsMediaItem.label}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="row g-3">
          {allFilesFromNewsMedia.length > 0 &&
            // CORRECTED: Map directly over the data. Each mapped item needs the column class.
            allFilesFromNewsMedia.map((org, index) => (
              <div
                key={index}
                // This class now controls the grid: 1 column on small, 2 on medium, 4 on large
                className="col-12 col-sm-6 col-md-4 col-lg-4"
              >
                <div className="media-card">
                  <div className="media-card-thumb">
                    <Image
                      src={org?.thumbNailUrl || Placeholder}
                      alt={org?.orgName || "thumbnail"}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="media-card-body">
                    <h6>{org?.orgName}</h6>
                    <div className="media-card-actions">
                      {org?.link && org.link !== "#" && (
                        <a
                          href={org?.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button-text primary-button-text"
                        >
                          Visit Link
                        </a>
                      )}
                      {org?.fileUrl && (
                        <button
                          className="media-preview-btn"
                          onClick={() => handlePreview(org.fileUrl)}
                        >
                          Preview
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Footer />

      {/* Pdf Viewer Modal */}
      <PdfViewer
        url={pdfUrl}
        title="Preview"
        open={pdfOpen}
        onClose={() => setPdfOpen(false)}
      />
    </div>
  );
};

export default NewsMediaDetails;
