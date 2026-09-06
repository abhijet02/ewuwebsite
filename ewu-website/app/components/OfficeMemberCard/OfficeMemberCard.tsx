"use client";

import "./OfficeMemberCard.scss";
import Image from "next/image";
import { useOfficeMemberData } from "@lib/hooks/useOfficeMemberData";
import { Icon } from "@iconify/react";
import DocumentList from "./DocumentList";
import { useState } from "react";
import PdfViewer from "../PdfViewer/PdfViewer";
import Placeholder from "public/male.png";
import { YesOrNo } from "@lib/services/slider/slider.service.type";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";

const OfficeMemberCard: React.FC = () => {
  const { offices, officeMember, document } = useOfficeMemberData();
  const { departments } = useDepartmentData();

  const [selectedDoc, setSelectedDoc] = useState(null);

  const pdfOpen = Boolean(selectedDoc);

  const handlePdfClose = () => setSelectedDoc(null);

  const filteredDocuments = document?.filter(
    (doc) => doc.isCertificate === YesOrNo.NO
  );

  return (
    <>
      <div className="office-member-section">
        <div className="office-member-card">
          <div className="image-wrapper">
            <Image
              src={officeMember?.profilePhotoUrl || Placeholder}
              fill
              alt="office-member-img"
              style={{
                objectFit: "cover",
                objectPosition: "top",
                filter:
                  officeMember?.onLeave === YesOrNo.YES
                    ? "grayscale(100%)"
                    : "none",
              }}
            />
            {officeMember?.onLeave === YesOrNo.YES && (
              <div className="office-member-badge">
                {officeMember?.onLeaveText === null
                  ? "On Leave"
                  : officeMember?.onLeaveText}
              </div>
            )}
          </div>
          <div className="member-info">
            <h3>{officeMember?.name}</h3>
            <h6>{officeMember?.designation}</h6>
            <h6 className="mt-3" style={{ fontWeight: 600 }}>
              {
                departments?.find(
                  (d) =>
                    d.id ==
                    offices?.find((o) => o.id === officeMember?.officeId)
                      ?.departmentId
                )?.name
              }
            </h6>

            <div style={{ padding: "12px 0px" }}>
              {officeMember?.email && officeMember?.isBoT !== "YES" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                    alignItems: "center",
                  }}
                  className="mb-3"
                >
                  <div style={{ width: "20px", height: "20px" }}>
                    <Icon
                      icon="material-symbols:mail-outline-rounded"
                      width="18"
                      height="18"
                    />
                  </div>
                  <p>{officeMember.email}</p>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  alignItems: "center",
                }}
                className="mb-3"
              >
                <div style={{ width: "20px", height: "20px" }}>
                  <Icon icon="bx:phone" width="18" height="18" />
                </div>
                <p>
                  09666775577{" "}
                  {officeMember?.ext && `(Ext:${" "}${officeMember?.ext})`}
                </p>
              </div>
              {officeMember?.location && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                    alignItems: "center",
                  }}
                  className="mb-3"
                >
                  <div style={{ width: "20px", height: "20px" }}>
                    <Icon icon="mynaui:location" width="18" height="18" />
                  </div>
                  <p>Room No: {officeMember.location}</p>
                </div>
              )}
            </div>
            <div className="social-links">
              {officeMember?.fbLink && (
                <a href={officeMember?.fbLink} target="_blank">
                  <Icon icon="ri:facebook-fill" width="24" height="24" />
                </a>
              )}
              {officeMember?.xLink && (
                <a href={officeMember?.xLink} target="_blank">
                  <Icon icon="prime:twitter" width="24" height="24" />
                </a>
              )}
              {officeMember?.youtubeLink && (
                <a href={officeMember?.youtubeLink} target="_blank">
                  <Icon icon="ri:youtube-fill" width="24" height="24" />
                </a>
              )}
              {officeMember?.linkedInLink && (
                <a href={officeMember?.linkedInLink} target="_blank">
                  <Icon icon="flowbite:linkedin-solid" width="24" height="24" />
                </a>
              )}
              {officeMember?.githubLink && (
                <a href={officeMember?.githubLink} target="_blank">
                  <Icon icon="simple-icons:github" width="24" height="24" />
                </a>
              )}
              {officeMember?.portfolioLink && (
                <a href={officeMember?.portfolioLink} target="_blank">
                  <Icon icon="mage:globe-fill" width="24" height="24" />
                </a>
              )}
              {officeMember?.pinterestLink && (
                <a href={officeMember?.pinterestLink} target="_blank">
                  <Icon icon="ri:pinterest-fill" width="24" height="24" />
                </a>
              )}
              {officeMember?.instagramLink && (
                <a href={officeMember?.instagramLink} target="_blank">
                  <Icon icon="ri:instagram-fill" width="24" height="24" />
                </a>
              )}
            </div>
            {filteredDocuments?.length > 0 && (
              <DocumentList
                documents={filteredDocuments}
                setSelectedDoc={setSelectedDoc}
              />
            )}
          </div>
        </div>
      </div>
      {selectedDoc && (
        <PdfViewer
          title={selectedDoc.fileName}
          url={selectedDoc.filePath}
          open={pdfOpen}
          onClose={handlePdfClose}
        />
      )}
    </>
  );
};

export default OfficeMemberCard;
