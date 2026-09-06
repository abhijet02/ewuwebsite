"use client";

import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import "./DeptAboutUs.scss";
import { renderSafeHTML } from "@lib/utils/html2text";
import DepartmentBGImage from "../../DepartmentBGImage/DepartmentBGImage";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { YesOrNo } from "@lib/services/department/department.service.type";

const DeptAboutUs = () => {
  const { department } = useDepartmentData();

  const cleanTitle = department?.name.replace(/^Department of\s*/i, "");
  const description = renderSafeHTML(department?.description) || "";

  const [modalContent, setModalContent] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [showReadMore, setShowReadMore] = useState(false);

  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const el = textRef.current;
      // If scrollHeight is greater than clientHeight, content overflows
      setShowReadMore(el.scrollHeight > el.clientHeight);
    }
  }, [description]);

  const openModal = (content: any, title: string) => {
    setModalContent(content);
    setModalTitle(title);
  };

  const closeModal = () => {
    setModalContent(null);
    setModalTitle(null);
  };

  return (
    <div className="dept-about-us">
      <div className="container">
        <div style={{ marginBottom: "32px" }}>
          <h1 className="dept-title-stroke">
            {department?.isSubDepartment === YesOrNo.YES ? "" : "Department of"}{" "}
            <span className="dept-title">{cleanTitle}</span>{" "}
          </h1>
        </div>

        <div className="row g-3">
          <div className="col-12 col-sm-12 col-md-12 col-lg-5">
            <div className="dept-description-wrapper">
              <div className="dept-description">
                <p className="truncate" ref={textRef}>
                  {description}
                </p>
                {showReadMore && (
                  <div
                    className="read-more-span-button"
                    onClick={() => openModal(description, cleanTitle)}
                  >
                    <p>
                      Read more{" "}
                      <Icon
                        icon="cuida:arrow-right-outline"
                        width="22"
                        height="22"
                      />
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-7">
            <DepartmentBGImage />
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5>About us</h5>
              <button className="modal-close" onClick={closeModal}>
                <Icon icon="material-symbols:close" width="20" height="20" />
              </button>
            </div>
            <div className="modal-body">
              <p>{modalContent}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeptAboutUs;
