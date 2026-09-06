"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import "./PoE.scss";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";

const PoE: React.FC = () => {
  const { department, departmentPeos } = useDepartmentData();

  const [modalContent, setModalContent] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);

  const openModal = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
  };

  const closeModal = () => {
    setModalTitle(null);
    setModalContent(null);
  };

  // Truncate text by words
  const truncateWords = (text: string, limit: number) => {
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };

  const WORD_LIMIT = 20; // adjust as needed
  if (!departmentPeos || departmentPeos.length === 0) return null;

  return (
    <div className="poe-container">
      <div className="container">
        <div className="header-with-subtitle">
          <h2>Program Educational Objectives (PEOs) Of {department?.name}</h2>
          <p>
            Graduates Of {department?.name} Are Expected To Attain The Following
            Program Educational Objectives (PEO) Within Few Years, Such As 3-5
            Years, Of Graduation.
          </p>
        </div>

        <div className="row g-3">
          {departmentPeos
            ?.slice()
            .reverse()
            .map((poe) => {
              const isLong = poe.description.split(" ").length > WORD_LIMIT;
              const displayText = isLong
                ? truncateWords(poe.description, WORD_LIMIT)
                : poe.description;

              return (
                <div
                  className="col-12 col-sm-12 col-md-4 col-lg-4"
                  key={poe.id}
                >
                  <div className="poe-card">
                    <div className="poe-title-body">
                      <h4>{poe.title}</h4>
                    </div>
                    <div className="poe-content-body">
                      <p>
                        {displayText}{" "}
                        {isLong && (
                          <span
                            className="read-more"
                            onClick={() =>
                              openModal(poe.title, poe.description)
                            }
                          >
                            Read More
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Modal */}
      {modalContent && (
        <div className="poe-modal-overlay" onClick={closeModal}>
          <div
            className="poe-modal-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="poe-modal-header">
              <h5>{modalTitle}</h5>
              <button className="poe-modal-close" onClick={closeModal}>
                <Icon icon="material-symbols:close" width="20" height="20" />
              </button>
            </div>
            <div className="poe-modal-body">
              <p>{modalContent}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoE;
