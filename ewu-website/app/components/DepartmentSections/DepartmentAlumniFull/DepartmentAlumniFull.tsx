"use client";

import "./DepartmentAlumniFull.scss";
import Image from "next/image";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useState, useEffect } from "react";
import { renderSafeHTML } from "@lib/utils/html2text";
import Placeholder_Person from "public/male.png";
import { Icon } from "@iconify/react";

const DepartmentAlumniFull: React.FC = () => {
  const { department, departmentAlumni } = useDepartmentData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);
  const [selectedAlumni, setSelectedAlumni] = useState<any | null>(null);

  useEffect(() => {
    const html = document.documentElement;

    if (selectedAlumni) {
      // Modal open: block scroll
      document.body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    } else {
      // Modal closed: restore scroll
      document.body.style.overflow = "";
      html.style.overflow = "";
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = "";
      html.style.overflow = "";
    };
  }, [selectedAlumni]);

  return (
    <section className="department-alumni-full">
      <div className="container">
        <div
          className="department-alumni-full-title"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "48px",
          }}
        >
          <h3>Notable Alumni of {department?.name}</h3>
        </div>

        <div className="row g-3">
          {departmentAlumni?.map((da, index) => (
            <div
              {...(!isStatic
                ? {
                    "data-aos":
                      index % 3 === 0
                        ? "fade-right"
                        : index % 3 === 1
                        ? "zoom-in"
                        : "fade-left",
                  }
                : {})}
              key={da?.id}
              className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
              onClick={() => setSelectedAlumni(da)}
            >
              <div className="alumni-full-card">
                <div className="alumni-full-img">
                  <Image
                    src={da?.photoUrl || Placeholder_Person}
                    fill
                    alt={`${da?.name} Photo`}
                  />
                </div>
                <div className="alumni-full-info">
                  <h5>{da?.name}</h5>
                  <p>{da?.designation}</p>
                  <p>{`Class of ${da?.graduationYear}`}</p>
                  <p>{da?.programName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAlumni && (
        <div
          className="alumni-modal-overlay"
          onClick={() => setSelectedAlumni(null)}
        >
          <div className="alumni-modal" onClick={(e) => e.stopPropagation()}>
            <div className="alumni-modal-header">
              <h2>{selectedAlumni.name}</h2>

              <div
                className="close-btn"
                onClick={() => setSelectedAlumni(null)}
              >
                <Icon icon="maki:cross" />
              </div>
            </div>

            <div className="alumni-modal-body">
              <div className="alumni-modal-body-media">
                <Image
                  src={selectedAlumni?.photoUrl}
                  fill
                  sizes="100vw"
                  alt={selectedAlumni.name}
                />
              </div>
              <div className="alumni-modal-body-details">
                <h4>{selectedAlumni.name}</h4>
                <p>{selectedAlumni?.designation}</p>
                <p>at {selectedAlumni?.organization}</p>
                <p>Graduate at {selectedAlumni.graduationYear}</p>
              </div>
              {selectedAlumni.description && (
                <div className="alumni-modal-message-body">
                  {renderSafeHTML(selectedAlumni.description)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DepartmentAlumniFull;
