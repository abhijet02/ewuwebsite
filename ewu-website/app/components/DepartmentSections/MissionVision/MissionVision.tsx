"use client";

import { useState } from "react";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import { Icon } from "@iconify/react";
import "./MissionVision.scss";

// Helper to strip HTML tags to plain text
const stripHTML = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

// Helper to truncate text to N characters
const truncateTextByChar = (text: string, limit: number) => {
  if (!text) return "";
  if (text.length <= limit) return text;
  return text.slice(0, limit) + "...";
};

// Helper to check if text exceeds N characters
const exceedsCharLimit = (text: string, limit: number) => {
  if (!text) return false;
  return text.length > limit;
};

const MissionVision: React.FC = () => {
  const { department } = useDepartmentData();
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);

  const openModal = (content: React.ReactNode, title: string) => {
    setModalContent(content);
    setModalTitle(title);
  };

  const closeModal = () => {
    setModalContent(null);
    setModalTitle(null);
  };

  // If no mission and no vision, don't render
  if (!department?.mission && !department?.vision) return null;

  const renderCard = (title: string, htmlContent?: string) => {
    const plainText = stripHTML(htmlContent || "");
    const showReadMore = exceedsCharLimit(plainText, 200); // 200-character limit

    return (
      <div className={`mission-vision-card ${title.toLowerCase()}-card`}>
        <div className="card-bg" />
        <div className="card-content">
          <h4>{title}</h4>
          <p>{truncateTextByChar(plainText, 200)}</p>
        </div>
        {showReadMore && (
          <button
            className="read-more-btn"
            style={{ zIndex: 999 }}
            onClick={() =>
              openModal(
                <div dangerouslySetInnerHTML={{ __html: htmlContent || "" }} />,
                title
              )
            }
          >
            Read More
          </button>
        )}
      </div>
    );
  };

  return (
    <div style={{ margin: "40px 0px" }}>
      <div className="container">
        <div className="row g-3">
          {department?.vision && (
            <div className="col-12 col-md-6">
              {renderCard("Vision", department.vision)}
            </div>
          )}
          {department?.mission && (
            <div className="col-12 col-md-6">
              {renderCard("Mission", department.mission)}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5>{modalTitle}</h5>
              <button className="modal-close" onClick={closeModal}>
                <Icon icon="material-symbols:close" width="20" height="20" />
              </button>
            </div>
            <div className="modal-body">{modalContent}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionVision;
