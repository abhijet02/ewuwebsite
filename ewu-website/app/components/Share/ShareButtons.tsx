"use client";

import "./Share.scss";
import React from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

interface ShareButtonsProps {
  url: string;
  title?: string;
  platforms?: Array<
    "facebook" | "twitter" | "linkedin" | "print" | "copy" | "mail"
  >;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  url,
  title = "",
  platforms = ["copy", "facebook", "twitter", "linkedin", "print", "mail"],
}) => {
  const shareLinks: Record<string, string> = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    mail: `mailto:?subject=${encodeURIComponent(
      title
    )}&body=${encodeURIComponent(`\n${url}\n\n.`)}`,
  };

  const iconMap: Record<
    string,
    { icon: string; width: number; height: number }
  > = {
    copy: { icon: "mdi:link-variant", width: 20, height: 20 },
    facebook: { icon: "mage:facebook", width: 20, height: 20 },
    twitter: { icon: "prime:twitter", width: 20, height: 20 },
    linkedin: { icon: "ri:linkedin-fill", width: 20, height: 20 },
    print: { icon: "mage:printer", width: 20, height: 20 },
    mail: { icon: "proicons:mail", width: 20, height: 20 }, // ✅ NEW
  };

  const handlePrint = () => {
    window.print();
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link.");
      });
  };

  return (
    <section className="news-details-share">
      <p>Share this page</p>
      <ul>
        {platforms.map((platform) => (
          <li key={platform}>
            {/* PRINT */}
            {platform === "print" ? (
              <button onClick={handlePrint} aria-label="Print this page">
                <Icon {...iconMap[platform]} />
              </button>
            ) : /* COPY */ platform === "copy" ? (
              <button onClick={copyToClipboard} aria-label="Copy link">
                <Icon {...iconMap[platform]} />
              </button>
            ) : /* MAIL */ platform === "mail" ? (
              <a href={shareLinks[platform]} aria-label="Send via email">
                <Icon {...iconMap[platform]} />
              </a>
            ) : (
              /* SOCIAL */
              <a
                href={shareLinks[platform]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share on ${platform}`}
              >
                <Icon {...iconMap[platform]} />
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ShareButtons;
