"use client";

import React, { useMemo, useState } from "react";
import { useFacultyMemberData } from "@lib/hooks/useFacultyMemberData";
import { renderSafeHTML } from "@lib/utils/html2text";
import "../FacultyMemberTab.scss";

type SectionItem = {
  id: number | string;
  name: string;
  value?: string | null;
};

const FacultyMemberTabMobile: React.FC = () => {
  const { facultyPerson, publication } = useFacultyMemberData();

  const [activeSectionId, setActiveSectionId] = useState<
    number | string | null
  >(null);
  const [activePublicationId, setActivePublicationId] = useState<string | null>(
    null
  );

  const hasContent = (value?: string | null) => {
    if (!value) return false;
    const clean = value.replace(/<[^>]+>/g, "").trim();
    return clean.length > 0;
  };

  // Filter "Message" if no content
  const baseSections: SectionItem[] = useMemo(() => {
    const sections: SectionItem[] = [
      { id: 1, name: "Message", value: facultyPerson?.message },
      { id: 2, name: "Academic Background", value: facultyPerson?.eduDetails },
      { id: 3, name: "Short Biography", value: facultyPerson?.biography },
      { id: 4, name: "Research", value: facultyPerson?.researchInterest },
      {
        id: 5,
        name: "Projects & Fundings",
        value: facultyPerson?.onGoingResearch,
      },
      {
        id: 6,
        name: "Teaching & Learning",
        value: facultyPerson?.teachingMaterials,
      },
      { id: 7, name: "Experience", value: facultyPerson?.profDev },
      {
        id: 8,
        name: "Awards & Achievements",
        value: facultyPerson?.achievements,
      },
      { id: 9, name: "Collaborations", value: facultyPerson?.participations },
      { id: 10, name: "Membership", value: facultyPerson?.affiliation },
      { id: 11, name: "Social Service", value: facultyPerson?.others },
    ];

    return sections.filter((section) => hasContent(section.value));
  }, [facultyPerson]);

  const uniqueTitles = useMemo(() => {
    if (!publication) return [];
    return [...new Set(publication.map((p) => p.title).filter(Boolean))];
  }, [publication]);

  const getPublicationsByTitle = (title: string) =>
    publication?.filter((pub) => pub.title === title);

  if (!facultyPerson) return <p>Loading Faculty Member Data...</p>;

  return (
    <section className="faculty-member-description-container">
      <h5 style={{ marginBottom: "16px" }}>Faculty Member Details</h5>

      <div className="faculty-member-accordion">
        {baseSections.map((section, index) => (
          <React.Fragment key={section.id}>
            {/* Section Accordion */}
            <div className="faculty-member-accordion-item">
              <h2 className="faculty-member-accordion-header">
                <button
                  className={`faculty-member-accordion-button ${
                    activeSectionId === section.id ? "active" : "collapsed"
                  }`}
                  type="button"
                  onClick={() =>
                    setActiveSectionId(
                      activeSectionId === section.id ? null : section.id
                    )
                  }
                >
                  {section.name}
                  <span className="accordion-arrow"></span>
                </button>
              </h2>

              <div
                className={`faculty-member-accordion-collapse ${
                  activeSectionId === section.id ? "show" : ""
                }`}
              >
                <div className="faculty-member-accordion-body">
                  {hasContent(section.value) ? (
                    renderSafeHTML(section.value || "")
                  ) : (
                    <p className="no-content">No content here.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Insert Publications after the 3rd section */}
            {index === 1 && uniqueTitles.length > 0 && (
              <div className="faculty-member-accordion-item">
                <h2 className="faculty-member-accordion-header">
                  <button
                    className={`faculty-member-accordion-button ${
                      activeSectionId === "publications"
                        ? "active"
                        : "collapsed"
                    }`}
                    type="button"
                    onClick={() =>
                      setActiveSectionId(
                        activeSectionId === "publications"
                          ? null
                          : "publications"
                      )
                    }
                  >
                    Publications
                    <span className="accordion-arrow"></span>
                  </button>
                </h2>

                <div
                  className={`faculty-member-accordion-collapse ${
                    activeSectionId === "publications" ? "show" : ""
                  }`}
                >
                  <div className="faculty-member-accordion-body">
                    {uniqueTitles.length > 0 ? (
                      uniqueTitles.map((title, idx) => (
                        <div
                          key={idx}
                          className="faculty-member-accordion-item"
                        >
                          <h2 className="faculty-member-accordion-header">
                            <button
                              className={`faculty-member-accordion-button ${
                                activePublicationId === title
                                  ? "active"
                                  : "collapsed"
                              }`}
                              type="button"
                              onClick={() =>
                                setActivePublicationId(
                                  activePublicationId === title ? null : title
                                )
                              }
                            >
                              {title}
                              <span className="accordion-arrow"></span>
                            </button>
                          </h2>
                          <div
                            className={`faculty-member-accordion-collapse ${
                              activePublicationId === title ? "show" : ""
                            }`}
                          >
                            <div className="faculty-member-accordion-body">
                              {getPublicationsByTitle(title)?.map(
                                (pub, pIdx) => (
                                  <div
                                    key={pIdx}
                                    className="publication-detail"
                                  >
                                    {renderSafeHTML(pub.details)}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="no-content">No Publications Available</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default FacultyMemberTabMobile;
