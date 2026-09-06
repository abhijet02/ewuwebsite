"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import "./PdfViewer.scss";
import Image from "next/image";

interface PdfViewerProps {
  url: string;
  title?: string;
  open: boolean; // <-- parent controls modal visibility
  onClose: () => void; // <-- parent handles close
}

// helper: check if URL looks like PDF
const isPdfFile = (url: string): boolean => {
  return /\.pdf($|\?)/i.test(url);
};

// helper: check if URL looks like an image
const isImageFile = (url: string): boolean => {
  return /\.(png|jpe?g|gif|webp|bmp|svg)($|\?)/i.test(url);
};

// helper: check if URL looks like a "doc type" we should download
const isDocLikeFile = (url: string): boolean => {
  return /\.(docx?|txt|rtf|odt|xls[xm]?|csv|pptx?|zip|rar)($|\?)/i.test(url);
};

const PdfViewer: React.FC<PdfViewerProps> = ({
  url,
  title = "File Preview",
  open,
  onClose,
}) => {
  const [scale, setScale] = useState(1);
  // Prevent background scroll
  useEffect(() => {
    const html = document.documentElement;
    if (open) {
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
  }, [open]);
  useEffect(() => {
    if (!open || !url) return;

    // Case: DOC or other unsupported → force download
    if (isDocLikeFile(url)) {
      const link = document.createElement("a");
      link.href = url;
      link.download = url.split("/").pop() || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onClose();
      return;
    }

    // Case: PDF on mobile → open in new tab
    if (window.innerWidth < 768 && isPdfFile(url)) {
      window.open(url, "_blank");
      onClose();
      return;
    }

    // Case: Image on mobile → open in new tab
    if (window.innerWidth < 768 && isImageFile(url)) {
      window.open(url, "_blank");
      onClose();
      return;
    }

    // Disable background scroll only if modal is shown
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open, url, onClose]);

  // Nothing to render if not open
  if (!open) return null;

  // Only render modal if it's a PDF or image and desktop
  if ((!isPdfFile(url) && !isImageFile(url)) || window.innerWidth < 768) {
    return null;
  }

  return createPortal(
    <div className="pdf-viewer-overlay">
      <div className="pdf-viewer-container">
        {/* Header */}
        <div className="pdf-viewer-header">
          <h5 className="pdf-viewer-title">{title}</h5>
          {isImageFile(url) && (
            <div className="pdf-viewer-zoom-controls">
              <button
                onClick={() => setScale((s) => s + 0.2)}
                className="image-button-controller"
              >
                +
              </button>
              <button
                onClick={() => setScale((s) => Math.max(1, s - 0.2))}
                className="image-button-controller"
              >
                –
              </button>
              <button
                onClick={() => setScale(1)}
                className="image-button-controller"
              >
                <Icon icon="mdi:refresh" width="18" height="18" />
              </button>
            </div>
          )}
          <button className="pdf-viewer-close" onClick={onClose}>
            <Icon icon="charm:cross" width="22" height="22" />
          </button>
        </div>

        {/* Body */}
        <div className="pdf-viewer-body">
          {isPdfFile(url) ? (
            <iframe src={url} className="pdf-viewer-iframe" title={title} />
          ) : isImageFile(url) ? (
            <div className="zoom-container">
              <Image
                src={url}
                alt={title}
                fill
                className="pdf-viewer-image"
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "top center",
                  maxWidth: "100%",
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PdfViewer;
