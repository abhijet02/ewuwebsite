"use client";

import "./OfficeMemberTab.scss";
import { renderSafeHTML, stripHTMLAndLimitWords } from "@lib/utils/html2text";
import { useOfficeMemberData } from "@lib/hooks/useOfficeMemberData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import { YesOrNo } from "@lib/services/officeMemberDocument/officeMemberDocument.service.type";
import PdfViewer from "../PdfViewer/PdfViewer";

const OfficeMemberTab: React.FC = () => {
  const { officeMember, document } = useOfficeMemberData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  // --- PDF Modal State ---
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const handlePreview = (url: string) => {
    setPdfUrl(url);
    setPdfOpen(true);
  };

  const certificateDocuments = document?.filter(
    (doc) => doc.isCertificate === YesOrNo.YES
  );

  const facultyDetails = useMemo(() => {
    return [
      {
        id: 1,
        name: "Message",
        description:
          officeMember?.message?.trim() &&
          stripHTMLAndLimitWords(officeMember.message, 5).trim()
            ? renderSafeHTML(officeMember.message)
            : null,
      },
      {
        id: 2,
        name: "Previous Work Experience",
        description:
          officeMember?.previousWorkExperience?.trim() &&
          stripHTMLAndLimitWords(officeMember.previousWorkExperience, 5).trim()
            ? renderSafeHTML(officeMember.previousWorkExperience)
            : null,
      },
      {
        id: 3,
        name: "Education Description",
        description:
          officeMember?.educationDescription?.trim() &&
          stripHTMLAndLimitWords(officeMember.educationDescription, 5).trim()
            ? renderSafeHTML(officeMember.educationDescription)
            : null,
      },
      {
        id: 4,
        name: "Career Description",
        description:
          officeMember?.careerDescription?.trim() &&
          stripHTMLAndLimitWords(officeMember.careerDescription, 5).trim()
            ? renderSafeHTML(officeMember.careerDescription)
            : null,
      },
    ].filter((item) => item?.description);
  }, [officeMember]);

  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    if (facultyDetails.length === 0) {
      setActiveTab(0);
      return;
    }
    const ids = facultyDetails.map((f) => f.id);
    setActiveTab((prev) => (ids.includes(prev) ? prev : facultyDetails[0].id));
  }, [facultyDetails]);

  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleAccordion = (id: number) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <section
      className="office-member-details-tabs-part"
      {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
    >
      <div className="office-member-details-tabs">
        <div className="details-tabs">
          {/* Desktop Tabs */}
          {!isMobile && (
            <>
              {facultyDetails?.length > 0 && (
                <>
                  <div className="bot-tabs">
                    {facultyDetails.map((item) => (
                      <button
                        key={item.id}
                        className={`bot-tab ${
                          activeTab === item.id ? "active" : ""
                        }`}
                        onClick={() => setActiveTab(item.id)}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                  <div className="bot-tab-content">
                    {facultyDetails.map(
                      (item) =>
                        activeTab === item?.id && (
                          <div key={item?.id} className="bot-tab-pane">
                            <p>{item?.description}</p>
                          </div>
                        )
                    )}
                  </div>
                </>
              )}

              {certificateDocuments?.length > 0 && (
                <div className="certificate-documents-grid-wrapper">
                  <div className="certificate-detail-title-line">
                    <h3 className="certificate-detail-title">Certificates</h3>
                    <div className="certificate-line" />
                  </div>
                  {/* Applied row g-3 for the grid wrapper */}
                  <div className="row g-3">
                    {certificateDocuments.map((doc) => {
                      const fileExt = doc?.filePath
                        ?.split(".")
                        .pop()
                        ?.toLowerCase();
                      const isPDF = fileExt === "pdf";
                      const isImage = [
                        "jpg",
                        "jpeg",
                        "png",
                        "gif",
                        "webp",
                      ].includes(fileExt);

                      return (
                        <div
                          key={doc?.id}
                          className="col-12 col-sm-12 col-md-6 col-lg-4"
                        >
                          <div
                            className="certificate-card"
                            onClick={() => handlePreview(doc?.filePath)}
                          >
                            <div className="certificate-icon">
                              {isPDF && (
                                <div className="certificate-icon pdf-thumbnail">
                                  <object
                                    data={doc?.filePath}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  ></object>
                                </div>
                              )}

                              {isImage && (
                                <img
                                  src={doc?.filePath}
                                  alt={doc?.fileName}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    borderRadius: "4px",
                                  }}
                                />
                              )}

                              {!isPDF && !isImage && (
                                <Icon
                                  icon="mdi:file-remove-outline"
                                  width={48}
                                  height={48}
                                />
                              )}
                            </div>
                            <p>{doc?.fileName}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Mobile Accordion */}
          {isMobile && (
            <>
              <div className="bot-accordion">
                {facultyDetails.map((item) => (
                  <div key={item?.id} className="accordion-item">
                    <div
                      className={`accordion-header ${
                        activeAccordion === item?.id ? "active" : ""
                      }`}
                      onClick={() => toggleAccordion(item?.id)}
                    >
                      <span>{item?.name}</span>
                      <Icon
                        icon="mdi:chevron-right"
                        className={`arrow ${
                          activeAccordion === item?.id ? "rotated" : ""
                        }`}
                      />
                    </div>
                    <div
                      className={`accordion-content ${
                        activeAccordion === item?.id ? "open" : ""
                      }`}
                    >
                      {item?.id === 5 ? (
                        <div className="row certificate-row">
                          {certificateDocuments?.map((doc) => (
                            <div
                              key={doc?.id}
                              className="col-12 col-sm-6 col-md-2 col-lg-2 mb-2"
                            >
                              <div
                                className="certificate-card"
                                onClick={() => handlePreview(doc?.filePath)}
                              >
                                <div className="certificate-icon">
                                  <Icon
                                    icon="fluent:certificate-24-regular"
                                    width={48}
                                    height={48}
                                  />
                                </div>
                                <p>{doc?.fileName}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {certificateDocuments?.length > 0 && (
                <div className="certificate-documents-grid-wrapper">
                  <div className="certificate-detail-title-line">
                    <h3 className="certificate-detail-title">Certificates</h3>
                    <div className="certificate-line" />
                  </div>
                  {/* Applied row g-3 for the grid wrapper */}
                  <div className="row g-3">
                    {certificateDocuments.map((doc) => {
                      const fileExt = doc?.filePath
                        ?.split(".")
                        .pop()
                        ?.toLowerCase();
                      const isPDF = fileExt === "pdf";
                      const isImage = [
                        "jpg",
                        "jpeg",
                        "png",
                        "gif",
                        "webp",
                      ].includes(fileExt);

                      return (
                        <div
                          key={doc?.id}
                          className="col-12 col-sm-12 col-md-6 col-lg-4"
                        >
                          <div
                            className="certificate-card"
                            onClick={() => handlePreview(doc?.filePath)}
                          >
                            <div className="certificate-icon">
                              {isPDF && (
                                <div className="certificate-icon pdf-thumbnail">
                                  <object
                                    data={doc?.filePath}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  ></object>
                                </div>
                              )}

                              {isImage && (
                                <img
                                  src={doc?.filePath}
                                  alt={doc?.fileName}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    borderRadius: "4px",
                                  }}
                                />
                              )}

                              {!isPDF && !isImage && (
                                <Icon
                                  icon="mdi:file-remove-outline"
                                  width={48}
                                  height={48}
                                />
                              )}
                            </div>
                            <p>{doc?.fileName}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Pdf Viewer Modal */}
      <PdfViewer
        url={pdfUrl}
        title="PDF Preview"
        open={pdfOpen}
        onClose={() => setPdfOpen(false)}
      />
    </section>
  );
};

export default OfficeMemberTab;
