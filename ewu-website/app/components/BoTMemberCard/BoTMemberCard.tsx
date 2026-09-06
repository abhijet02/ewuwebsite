"use client";

import "./BoTMemberCard.scss";
import Image from "next/image";
import { useOfficeMemberData } from "@lib/hooks/useOfficeMemberData";
import { Icon } from "@iconify/react";
import { useState } from "react";
import PdfViewer from "../PdfViewer/PdfViewer";
import Placeholder_Person from "public/male.png";
import { renderSafeHTML } from "@lib/utils/html2text";
import { BoTHtmlParse } from "./BoTHtmlParse";
import { useParams } from "next/navigation";

const BoTMemberCard: React.FC = () => {
  const { offices, officeMember, document } = useOfficeMemberData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<{
    fileName: string;
    filePath: string;
  } | null>(null);
  const params = useParams();
  // console.log("officeMember",officeMember);

  // Determine if PdfViewer should be open
  const pdfOpen = Boolean(selectedDoc);

  const handlePdfClose = () => setSelectedDoc(null);

  return (
    <section style={{ padding: "48px 0px" }}>
      <div className="row g-3">
        {/* Image */}
        <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-3">
          <div className="bot-details-page-card-media">
            <Image
              src={officeMember?.profilePhotoUrl || Placeholder_Person}
              alt="CProfile Photo"
              fill
              sizes="100vw"
            />
          </div>
        </div>

        {/* Details */}
        <div className="col-12 col-sm-12 col-md-8 col-lg-5 col-xl-6">
          <div style={{ height: "80%" }}>
            <div
              style={{
                marginTop: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                height: "100%",
              }}
            >
              <div>
                <h3>{officeMember?.name}</h3>
                <p className="degnation">
                  {renderSafeHTML(officeMember?.educationDescription)}
                </p>
                {params.label == "chancellor" && (
                  <h6>Hon’ble President, People’s Republic of Bangladesh</h6>
                )}
                <h6>
                  {params.label === "chancellor" && " & "}
                  {officeMember?.designation}
                </h6>
                <h6>
                  {/* {offices?.find((o) => o.id === officeMember?.officeId)?.title} */}
                  East West University
                </h6>
              </div>

              {officeMember?.isBoT === "YES" &&
                officeMember?.isheadOfOffice === "YES" && (
                  <div className="botmember-content-pharser">
                    {BoTHtmlParse(officeMember?.previousWorkExperience)}
                  </div>
                )}

              {/* PDF Viewer */}
              {selectedDoc && (
                <PdfViewer
                  title={selectedDoc?.fileName}
                  url={selectedDoc?.filePath}
                  open={pdfOpen}
                  onClose={handlePdfClose}
                />
              )}
            </div>
          </div>
        </div>
        {params.label !== "chancellor" && (
          <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3">
            <div className="bot-profile-card-address-deck">
              <div
                style={{
                  padding: "16px",
                  color: "#fff",
                  background: "#aa4a44",
                  borderRadius: "8px 8px 0px 0px",
                }}
              >
                <h6 style={{ margin: 0, textAlign: "left" }}>
                  {offices?.find((o) => o.id === officeMember?.officeId)
                    ?.title || "Board of Trustees"}
                </h6>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexDirection: "column",
                  padding: "8px 16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    marginBottom: "40px",
                  }}
                >
                  <div className="bot-profile-address-info">
                    <div style={{ width: "24px", height: "24px" }}>
                      <Icon icon="solar:phone-outline" width="20" height="20" />
                    </div>
                    <p
                      style={{ margin: 0, fontSize: "14px", textAlign: "left" }}
                    >
                      09666775577{" "}
                      {officeMember?.ext && `Ext:${officeMember?.ext}`}
                    </p>
                  </div>
                  {officeMember?.location && (
                    <div className="bot-profile-address-info">
                      <div style={{ width: "24px", height: "24px" }}>
                        <Icon icon="solar:home-linear" width="20" height="20" />
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          textAlign: "left",
                        }}
                      >
                        {officeMember?.location}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: "100%",
                  padding: "12px",
                }}
              >
                {document?.length > 0 && (
                  <>
                    <button
                      className="bot-profile-document-preview"
                      onMouseEnter={() => setMenuOpen(true)}
                      onMouseLeave={() => setMenuOpen(false)}
                    >
                      Preview Documents
                    </button>

                    <ul
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "12px", // 👈 shift to align with button text
                        margin: 0,
                        padding: "8px 0",
                        listStyle: "none",
                        background: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        minWidth: "calc(100% - 24px)", // 👈 match button width minus padding
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        opacity: menuOpen ? 1 : 0,
                        visibility: menuOpen ? "visible" : "hidden",
                        transform: menuOpen
                          ? "translateY(0)"
                          : "translateY(10px)",
                        transition: "all 0.2s ease-in-out",
                        zIndex: 1000,
                      }}
                      onMouseEnter={() => setMenuOpen(true)}
                      onMouseLeave={() => setMenuOpen(false)}
                    >
                      {document?.map((doc, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              const isMobile = window.innerWidth <= 768;

                              if (isMobile) {
                                window.open(doc?.filePath, "_blank");
                              } else {
                                setSelectedDoc(doc as any);
                              }
                            }}
                            style={{
                              display: "block",
                              padding: "8px 16px",
                              color: "#0f2a55",
                              textDecoration: "none",
                              fontSize: "14px",
                            }}
                          >
                            {doc?.fileName}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BoTMemberCard;
