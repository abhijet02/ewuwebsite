"use client";

import React from "react";
import "./FacultyMemberResearchProfile.scss";
import { useFacultyMemberData } from "@lib/hooks/useFacultyMemberData";
import { Icon } from "@iconify/react";
import GoogleSch from "public/gs.png";
import Image from "next/image";

const FacultyMemberResearchProfile: React.FC = () => {
  const { facultyPerson, faculty, department, designation, document } =
    useFacultyMemberData();

  return (
    <section className="research-profile">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h4 className="text-xl font-semibold mb-4 ">Research profiles</h4>
        {facultyPerson?.gsLink && (
          <a
            className="research-porfile-item-body"
            href={facultyPerson.gsLink}
            title="Google Scholar"
            target="_blank"
          >
            <div className="research-porfile-item-body-title">
              <div className="research-porfile-item-body-icon">
                <Image
                  src={GoogleSch}
                  alt="Google Scholar"
                  width={20}
                  height={20}
                />
              </div>
              <h6>Google Scholar</h6>
            </div>
            <div className="research-porfile-item-body-arrow-icon">
              <Icon icon="akar-icons:arrow-right" width="20" height="20" />
            </div>
          </a>
        )}
        {facultyPerson?.orcidLink && <hr className="research-divider" />}

        {facultyPerson?.orcidLink && (
          <a
            className="research-porfile-item-body"
            href={facultyPerson.orcidLink}
            title="ORCID"
            target="_blank"
          >
            <div className="research-porfile-item-body-title">
              <div className="research-porfile-item-body-icon orchid-body">
                <Icon icon="academicons:orcid" />
              </div>
              <h6>Orchid</h6>
            </div>
            <div className="research-porfile-item-body-arrow-icon">
              <Icon icon="akar-icons:arrow-right" width="20" height="20" />
            </div>
          </a>
        )}
        {facultyPerson?.researchGateLink && <hr className="research-divider" />}

        {facultyPerson?.researchGateLink && (
          <a
            className="research-porfile-item-body"
            href={facultyPerson.researchGateLink}
            title="ResearchGate"
            target="_blank"
          >
            <div className="research-porfile-item-body-title">
              <div className="research-porfile-item-body-icon researchgate-body">
                <Icon icon="academicons:researchgate" />
              </div>
              <h6>ResearchGate</h6>
            </div>
            <div className="research-porfile-item-body-arrow-icon">
              <Icon icon="akar-icons:arrow-right" width="20" height="20" />
            </div>
          </a>
        )}
        {facultyPerson?.scopusLink && <hr className="research-divider" />}
        {facultyPerson?.scopusLink && (
          <a
            className="research-porfile-item-body"
            href={facultyPerson.scopusLink}
            title="Scopus"
            target="_blank"
          >
            <div className="research-porfile-item-body-title">
              <div className="research-porfile-item-body-icon scopus-body">
                <Icon icon="simple-icons:scopus" />
              </div>
              <h6>Scopus</h6>
            </div>
            <div className="research-porfile-item-body-arrow-icon">
              <Icon icon="akar-icons:arrow-right" width="20" height="20" />
            </div>
          </a>
        )}
      </div>
    </section>
  );
};

export default FacultyMemberResearchProfile;
