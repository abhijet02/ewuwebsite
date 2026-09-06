"use client";

import React, { useState } from "react";
import PdfViewer from "@/app/components/PdfViewer/PdfViewer";

interface PdfLinkProps {
  title: string;
  url: string;
  isPdf: boolean;
  children: React.ReactNode;
  href?: string;
  insideTable?: boolean;
}

const PdfLink: React.FC<PdfLinkProps> = ({
  title,
  url,
  isPdf,
  children,
  href,
  insideTable,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (insideTable) {
    return (
      <>
        <button
          onClick={(e) => {
            e.preventDefault();
            isPdf ? handleOpen() : href && window.open(href, "_blank");
          }}
          style={{
            padding: "4px 12px",
            borderRadius: "4px",
            backgroundColor: "#aa4a44",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            textDecoration: "none",
            width: "max-content",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          {children}
        </button>
        {isPdf && open && (
          <PdfViewer
            title={title}
            url={url}
            open={open}
            onClose={handleClose}
          />
        )}
      </>
    );
  }

  return (
    <>
      <a
        href={isPdf ? undefined : href}
        target={isPdf ? undefined : "_blank"}
        className={`underline cursor-pointer ${
          isPdf ? "html-parser-a-tag-pdf" : "html-parser-a-tag-link"
        }`}
        onClick={(e) => {
          if (isPdf) {
            e.preventDefault();
            handleOpen();
          }
        }}
      >
        {children}
      </a>
      {isPdf && open && (
        <PdfViewer title={title} url={url} open={open} onClose={handleClose} />
      )}
    </>
  );
};

export default PdfLink;
