"use client";

import Image from "next/image";
import "./DepartmentAlumni.scss";
import { Icon } from "@iconify/react";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import { useEffect, useState } from "react";
import Placeholder_Person from "public/male.png";
import { renderSafeHTML } from "@lib/utils/html2text";
import Link from "next/link";
import { useViewAllLink } from "@lib/hooks/useViewAllLink";

const DepartmentAlumni: React.FC = () => {
  const { department, departmentAlumni } = useDepartmentData();
  const viewAllLink = useViewAllLink({ componentName: "DepartmentAlumni" });

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

  if (!departmentAlumni || departmentAlumni.length === 0) return null;

  return (
    <section className="faculty-alumni-section">
      <div className="container">
        <div className="header-with-view-all-button">
          <h2>Notable Alumni</h2>
          <Link href={viewAllLink || ""} className="for-all-view-all-button">
            View All
            <Icon icon="si:arrow-right-duotone" width="20" height="20" />
          </Link>
        </div>
        <div className="row g-3">
          {departmentAlumni?.slice(0, 4)?.map((alumni, index) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={index}
              onClick={() => setSelectedAlumni(alumni)}
            >
              <div className="alumni-card">
                <div className="alumni-image">
                  <Image
                    src={alumni?.photoUrl || Placeholder_Person}
                    alt={alumni?.name}
                    fill
                  />
                </div>
                <div className="alumni-info">
                  <h5>{alumni?.name}</h5>
                  <p>{alumni?.designation}</p>
                  <p>{`Class of ${alumni?.graduationYear}`} {alumni?.programName && "|"} {alumni?.programName}</p>
                  {/* <p>{alumni?.programName}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
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
                <p>
                  {selectedAlumni?.designation} at{" "}
                  {selectedAlumni?.organization}
                </p>
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

export default DepartmentAlumni;
