"use client";

import "./FacultyMemberListFull.scss";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import React, { useState, useEffect } from "react";
import { YesOrNo } from "@lib/services/facultyPerson/facultyPerson.service.type";
import Placeholder from "public/male.png";

const FacultyMemberListFull: React.FC = () => {
  const { designations, facultys, departmentFacultyPersons, department } =
    useDepartmentData();
  const [imgLoaded, setImgLoaded] = useState(false);

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);
  const [currentPage, setCurrentPage] = useState(1);
  const [showImages, setShowImages] = useState(false);

  const normalFaculty =
    departmentFacultyPersons
      ?.filter(
        (dfm) => dfm?.isAdjunct === YesOrNo.NO && dfm?.isAdvisor === YesOrNo.NO
      )
      ?.sort((a, b) => {
        // onLeave NO → first ; onLeave YES → last
        if (a.onLeave === YesOrNo.NO && b.onLeave === YesOrNo.YES) return -1;
        if (a.onLeave === YesOrNo.YES && b.onLeave === YesOrNo.NO) return 1;
        return 0;
      }) || [];
  const specialFaculty =
    departmentFacultyPersons?.filter((dfm) => dfm?.isAdjunct === YesOrNo.YES) ||
    [];
  const adviserFaculty =
    departmentFacultyPersons?.filter((dfm) => dfm?.isAdvisor === YesOrNo.YES) ||
    [];

  // Lazy-load images after info render
  useEffect(() => {
    const timer = setTimeout(() => setShowImages(true), 200); // 200ms delay
    return () => clearTimeout(timer);
  }, [currentPage]);

  const renderCard = (dfm: any, index: number, special = false) => {
    const facultyName = facultys?.find((f) => f.id === dfm?.facultyId)?.name;
    const compressedUrl = dfm?.photo?.replace("/raw/", "/compressed/");

    return (
      <div
        key={dfm?.id}
        {...(!isStatic
          ? {
              "data-aos":
                window.innerWidth < 800
                  ? "fade-up"
                  : index % 3 === 0
                  ? "fade-right"
                  : index % 3 === 1
                  ? "zoom-in"
                  : "fade-left",
            }
          : {})}
        className={
          special
            ? "col-12 col-sm-12 col-md-12 col-lg-6"
            : "col-lg-6 col-md-12 col-sm-12 col-12"
        }
      >
        <div className="faculty-member-card">
          <div className="faculty-member-img">
            {showImages ? (
              <>
                <Image
                  src={compressedUrl || Placeholder}
                  // src={Placeholder}
                  fill
                  sizes="100vw"
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgLoaded(true)}
                  quality={0}
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                    filter:
                      dfm?.onLeave === YesOrNo.YES ? "grayscale(100%)" : "none",
                    opacity: imgLoaded ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                  alt="Faculty Member Photo"
                />
                {!imgLoaded && (
                  <div className="image-placeholder">
                    <Icon icon="eos-icons:loading" width="24" height="24" />
                  </div>
                )}
              </>
            ) : (
              <div className="image-placeholder">
                <Icon icon="eos-icons:loading" width="24" height="24" />
              </div>
            )}
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
            {dfm?.onLeave === YesOrNo.YES && (
              <div className="faculty-member-badge">
                {dfm?.onLeaveText || "On Leave"}
              </div>
            )}
          </div>

          <div className="faculty-member-info">
            <div className="card-item-memb">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  width: "100%",
                  height: "100%",
                  marginTop: "12px",
                }}
              >
                <div>
                  <h2 style={{ textAlign: "left" }}>{dfm?.name}</h2>
                  <p style={{ margin: 0 }}>
                    {
                      designations?.find(
                        (designation) =>
                          designation.id ==
                          parseInt(dfm?.designation.toString())
                      )?.designation
                    }
                  </p>
                  {dfm?.isProctor === YesOrNo.YES && (
                    <p className="extra-designation">& Proctor</p>
                  )}
                  {dfm?.isAssProctor === YesOrNo.YES && (
                    <p className="extra-designation">& Asst. Proctor</p>
                  )}
                  {dfm?.isDean === YesOrNo.YES && (
                    <p className="extra-designation">& Dean</p>
                  )}
                  {dfm?.isChairperson === YesOrNo.YES && (
                    <p className="extra-designation">& Chairperson</p>
                  )}
                </div>

                <div>
                  {dfm?.email && dfm?.isBoT !== YesOrNo.YES && (
                    <div
                      className={`${
                        dfm?.onLeave === YesOrNo.YES
                          ? "on-leave-faculty-member-contact"
                          : "faculty-member-contact"
                      }`}
                    >
                      <Icon icon="quill:mail" width="18" height="18" />
                      <p
                        style={{
                          margin: 0,
                          fontSize: "12px",
                          textTransform: "lowercase",
                        }}
                      >
                        {dfm?.email}
                      </p>
                    </div>
                  )}
                  <div
                    className={`${
                      dfm?.onLeave === YesOrNo.YES
                        ? "on-leave-faculty-member-contact"
                        : "faculty-member-contact"
                    }`}
                  >
                    <Icon icon="bx:phone" width="18" height="18" />
                    <p style={{ margin: 0, fontSize: "12px" }}>
                      09666775577 {dfm?.ext && `(Ext: ${dfm?.ext})`}
                    </p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <div className="faculty-view-button">
                  <a href={`/pages/faculty-member/${dfm?.slug}`}>
                    View Profile{" "}
                    <Icon
                      icon="basil:arrow-right-solid"
                      width="20"
                      height="20"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const itemsPerPage = 10;

  const totalItems = normalFaculty.length + specialFaculty.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageItems = (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const combinedList = [
      ...normalFaculty,
      ...adviserFaculty,
      ...specialFaculty,
    ];
    return combinedList.slice(startIndex, endIndex);
  };
  const pageSlice = getPageItems(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="faculty-member-card-deck">
      <div className="container">
        <div
          className="faculty-member-card-deck-title"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Faculty Members of {department?.name}</h3>
        </div>

        <div className="row g-3">
          {/* Render page slice */}
          {pageSlice
            .filter(
              (dfm) =>
                dfm?.isAdvisor === YesOrNo.NO && dfm?.isAdjunct === YesOrNo.NO
            )
            .map((dfm, index) => renderCard(dfm, index))}

          {pageSlice.some((dfm) => dfm?.isAdvisor === YesOrNo.YES) && (
            <div className="col-12 header-title-line">
              <h5 className="mt-4 mb-4 adjucnt-title">Advisor</h5>
              <div className="line" />
            </div>
          )}
          {pageSlice
            .filter((dfm) => dfm?.isAdvisor === YesOrNo.YES)
            .map((dfm, index) => renderCard(dfm, index, false))}

          {pageSlice.some((dfm) => dfm?.isAdjunct === YesOrNo.YES) && (
            <div className="col-12 header-title-line">
              <h5 className="mt-4 mb-4 adjucnt-title">
                Adjunct Faculty Members
              </h5>
              <div className="line" />
            </div>
          )}
          {pageSlice
            .filter((dfm) => dfm?.isAdjunct === YesOrNo.YES)
            .map((dfm, index) => renderCard(dfm, index, true))}
        </div>

        <div className="custome-pagination text-center my-4">
          <button
            className="page-btn arrow-btn"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <Icon icon="ep:arrow-left" width="20" height="20" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            if (
              page === 1 ||
              page === 2 ||
              page === totalPages ||
              page === totalPages - 1 ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={i}
                  className={`page-btn ${currentPage === page ? "active" : ""}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              );
            } else if (
              (page === 3 && currentPage > 4) ||
              (page === totalPages - 2 && currentPage < totalPages - 3)
            ) {
              return (
                <span key={i} className="dots">
                  ...
                </span>
              );
            } else {
              return null;
            }
          })}

          <button
            className="page-btn arrow-btn"
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            <Icon icon="ep:arrow-right" width="20" height="20" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FacultyMemberListFull;
