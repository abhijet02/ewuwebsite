"use client";

import "./FacultyMemberCard.scss";
import Image from "next/image";
import dynamic from "next/dynamic";
import LazyLoader from "@/app/components/LayLoader";
import { useFacultyMemberData } from "@lib/hooks/useFacultyMemberData";
import { YesOrNo } from "@lib/services/slider/slider.service.type";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useState } from "react";
import PdfViewer from "../PdfViewer/PdfViewer";
import ShapeForFaculty from "./ShapeForFaculty";
const LazyFacutlyMemberContactInfo = dynamic(() => import("@/app/components/FacultyMemberCard/FacutlyMemberContactInfo"));
// import FacutlyMemberContactInfo from "./FacutlyMemberContactInfo";
import FacultyMemberSocial from "./FacultyMemberSocial";
const LazyFacultyMemberSocial = dynamic(() => import("@/app/components/FacultyMemberCard/FacultyMemberSocial"));

import DocumentList from "./DocumentList";
const LazyDocumentList = dynamic(() => import("@/app/components/FacultyMemberCard/DocumentList"));

import Placeholder_Person from "@/app/assets/Placeholder_Person.jpg";
import Link from "next/link";
import { Icon } from "@iconify/react";

const FacultyMemberCard: React.FC = () => {
  const { facultyPerson, faculty, department, designation, document } =
    useFacultyMemberData();

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const pdfOpen = Boolean(selectedDoc);
  const handlePdfClose = () => setSelectedDoc(null);

  const loading = !facultyPerson || !designation || !department || !faculty;

  return (
    <section className="faculty-member-card-deck">
      {/* Dean shape */}
      {!loading && facultyPerson?.isDean === YesOrNo.YES && (
        <ShapeForFaculty department={faculty?.name || "Unknown Department"} />
      )}

      <div className="facutly-chairperson-card-body">
        <div className="row g-3">
          {/* Chairperson shape */}
          {!loading && facultyPerson?.isChairperson === YesOrNo.YES && (
            <div className="col-12 col-md-12 col-lg-2">
              <div className="chairperson-shape">
                <h5>Chairperson</h5>
                <p style={{ fontSize: "14px", margin: 0, textAlign: "left" }}>
                  {department?.name}
                </p>
              </div>
            </div>
          )}

          {!loading && facultyPerson?.isCoordinator === YesOrNo.YES && (
            <div className="col-12 col-md-12 col-lg-2">
              <div className="chairperson-shape">
                <h5>Coordinator</h5>
                <p style={{ fontSize: "14px", margin: 0, textAlign: "left" }}>
                  {department?.name}
                </p>
              </div>
            </div>
          )}
          {/* Image */}
          <div className="col-12 col-sm-8 col-md-5 col-lg-3">
            <div className="facutly-chairperson-img">
              {loading ? (
                <div className="skeleton skeleton-image"></div>
              ) : (
                <>
                  <Image
                    src={facultyPerson?.photo || Placeholder_Person}
                    fill
                    alt="chairperson-message-img"
                    style={{
                      objectFit: "cover",
                      objectPosition: "top",
                      filter:
                        facultyPerson?.onLeave === YesOrNo.YES
                          ? "grayscale(100%)"
                          : "none",
                    }}
                  />

                  {/* Transparent overlay to block "open image in new tab" */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 2,
                    }}
                  />
                </>
              )}
              {facultyPerson?.onLeave === YesOrNo.YES && (
                <div className="faculty-member-badge-details">
                  {facultyPerson?.onLeaveText === null
                    ? "On Leave"
                    : facultyPerson?.onLeaveText}
                </div>
              )}
            </div>
          </div>

          {/* ===== SM layout ===== */}
          <div className="d-none d-sm-block d-md-none col-sm-12">
            {loading ? (
              <div>
                <div className="skeleton skeleton-text large"></div>
                <div>
                  <div className="skeleton skeleton-text medium"></div>
                </div>
                <div>
                  <div className="skeleton skeleton-text medium"></div>
                </div>
                <div>
                  <div className="skeleton skeleton-text medium"></div>
                </div>
                <div className="skeleton skeleton-box wide"></div>
              </div>
            ) : (
              <>
                <div className="facutly-chairperson-basic-info">
                  <h4>{facultyPerson?.name}</h4>
                  <h5>{designation?.designation}</h5>
                  {facultyPerson?.isProctor === YesOrNo.YES && (
                    <p className="extra-designation-profile">& Proctor</p>
                  )}
                  {facultyPerson?.isAssProctor === YesOrNo.YES && (
                    <p className="extra-designation-profile">& Asst. Proctor</p>
                  )}
                  <p>{department?.name}</p>
                  <p>{faculty?.name}</p>
                </div>
                <LazyLoader height="100px" threshold={0.1}>
                <LazyFacutlyMemberContactInfo facultyPerson={facultyPerson} />
                </LazyLoader>
                {/* <FacutlyMemberContactInfo facultyPerson={facultyPerson} /> */}
                {document?.length > 0 && (
                  <LazyLoader height="100px" threshold={0.1}>
                  <LazyDocumentList
                    documents={document}
                    setSelectedDoc={setSelectedDoc} />
                  </LazyLoader>
                )}
                {/* {document?.length > 0 && (
                  <DocumentList
                    documents={document}
                    setSelectedDoc={setSelectedDoc}
                  />
                )} */}
                <LazyLoader height="100px" threshold={0.1}>
                <LazyFacultyMemberSocial facultyPerson={facultyPerson} />
                </LazyLoader>
                
                {/* <FacultyMemberSocial facultyPerson={facultyPerson} /> */}
              </>
            )}
          </div>

          {/* ===== MD+ layout ===== */}
          <div
            className={`col-12 col-sm-12 ${
              facultyPerson?.isChairperson === YesOrNo.YES &&
              facultyPerson?.isCoordinator !== YesOrNo.YES
                ? "col-md-9"
                : "col-md-7"
            } ${
              facultyPerson?.isChairperson !== YesOrNo.YES &&
              facultyPerson?.isCoordinator !== YesOrNo.YES
                ? "col-lg-9"
                : "col-lg-7"
            } d-block d-sm-none d-md-block`}
          >
            {loading ? (
              <div>
                <div className="skeleton skeleton-text large"></div>
                <div>
                  <div className="skeleton skeleton-text medium"></div>
                </div>
                <div>
                  <div className="skeleton skeleton-text medium"></div>
                </div>
                <div>
                  <div className="skeleton skeleton-text medium"></div>
                </div>
                <div className="skeleton skeleton-box wide"></div>
              </div>
            ) : (
              <>
                <div className="facutly-chairperson-basic-info">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h4>{facultyPerson?.name}</h4>
                    <Link
                      href={`/pages/cv/${facultyPerson?.slug}`}
                      className="preview-cv-button"
                    >
                      <div>
                        <Icon
                          icon="solar:document-outline"
                          width="20"
                          height="20"
                        />
                      </div>
                      Preview CV
                    </Link>
                  </div>
                  <h5>{designation?.designation}</h5>
                  {facultyPerson?.isProctor === YesOrNo.YES && (
                    <p className="extra-designation-profile">& Proctor</p>
                  )}
                  {facultyPerson?.isAssProctor === YesOrNo.YES && (
                    <p className="extra-designation-profile">& Asst. Proctor</p>
                  )}
                  <p>{department?.name}</p>
                  <p>{faculty?.name}</p>
                </div>
                 <LazyLoader height="100px" threshold={0.1}>
                <LazyFacutlyMemberContactInfo facultyPerson={facultyPerson} />
                </LazyLoader>
                {/* <FacutlyMemberContactInfo facultyPerson={facultyPerson} /> */}
                  <LazyLoader height="100px" threshold={0.1}>
                <LazyFacultyMemberSocial facultyPerson={facultyPerson} />
                </LazyLoader>
                {/* <FacultyMemberSocial facultyPerson={facultyPerson} /> */}
                {document?.length > 0 && (
                  <LazyLoader height="100px" threshold={0.1}>
                  <LazyDocumentList
                    documents={document}
                    setSelectedDoc={setSelectedDoc} />
                  </LazyLoader>
                )}
                {/* {document?.length > 0 && (
                  <DocumentList
                    documents={document}
                    setSelectedDoc={setSelectedDoc}
                  />
                )}*/}
              </>
            )}
          </div>
        </div>
      </div>

      {/* PDF viewer */}
      {selectedDoc && (
        <PdfViewer
          title={selectedDoc.fileName}
          url={selectedDoc.filePath}
          open={pdfOpen}
          onClose={handlePdfClose}
        />
      )}
    </section>
  );
};

export default FacultyMemberCard;
