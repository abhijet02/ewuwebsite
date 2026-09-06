"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useFacultyMemberData } from "@lib/hooks/useFacultyMemberData";
import { renderSafeHTML } from "@lib/utils/html2text";
import "../FacultyMemberTab.scss";

type SidebarItem = {
  id: number | string;
  name: string;
  value?: string | null;
  content?: any | null;
};

const FacultyMemberTabDesktop: React.FC = () => {
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

  const allSections: SidebarItem[] = [
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

  const uniqueTitles = publication
    ? [...new Set(publication.map((p) => p.title).filter(Boolean))]
    : [];

  const getPublicationsByTitle = (title: string) =>
    publication?.filter((pub) => pub.title === title);

  const sidebarItems: SidebarItem[] = useMemo(() => {
    const items: SidebarItem[] = [];

    for (const section of allSections) {
      if (!hasContent(section.value)) continue;

      items.push({
        ...section,
        content: renderSafeHTML(section.value || ""),
      });
    }

    if (uniqueTitles.length > 0) {
      const publicationsItem: SidebarItem = {
        id: "publications",
        name: "Publications",
      };

      // If items already exceed 3 positions → insert at index 3
      if (items.length >= 3) {
        items.splice(3, 0, publicationsItem);
      } else {
        // If fewer items exist, just push at end
        items.push(publicationsItem);
      }
    }

    return items;
  }, [facultyPerson, uniqueTitles.length]);

  // ✅ Default active section
  // - If "Message" exists, make it active.
  // - Else, use the first available section.
  useEffect(() => {
    if (!sidebarItems || sidebarItems.length === 0) return;

    const messageSection = sidebarItems.find((item) => item.name === "Message");

    if (messageSection) {
      setActiveSectionId(messageSection.id);
    } else {
      setActiveSectionId(sidebarItems[0].id);
    }
  }, [sidebarItems]);

  if (!facultyPerson) return <p>Loading Faculty Member Data...</p>;

  return (
    <section className="faculty-member-description-container">
      <div className="row g-3" style={{ display: "flex" }}>
        {/* Sidebar */}
        <div className="col-12 col-md-5 col-lg-3">
          <div className="faculty-member-details-sidebar">
            {sidebarItems.map((item, index) => (
              <>
                <button
                  key={String(item.id)}
                  onClick={() => {
                    setActiveSectionId(item.id);
                    setActivePublicationId(null);
                  }}
                  className={
                    activeSectionId === item.id
                      ? "sidebar-button-active"
                      : "sidebar-button"
                  }
                >
                  {item.name}
                </button>
                {index !== sidebarItems.length - 1 && (
                  <hr className="faculty-profile-sidebar-divider" />
                )}
              </>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="col-12 col-md-7 col-lg-9">
          <div className="faculty-member-content-body">
            {activeSectionId && activeSectionId !== "publications" ? (
              sidebarItems
                .filter((item) => item.id === activeSectionId)
                .map((faculty) => (
                  <div key={String(faculty.id)}>
                    <h3 style={{ marginBottom: "16px" }}>{faculty.name}</h3>
                    <div>{faculty.content}</div>
                  </div>
                ))
            ) : activeSectionId === "publications" ? (
              <div
                className="faculty-member-accordion"
                id="publicationsAccordion"
              >
                {uniqueTitles.length > 0 ? (
                  uniqueTitles.map((title, idx) => (
                    <div key={idx} className="faculty-member-accordion-item">
                      <div className="faculty-member-accordion-header">
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
                          <span className="accordion-arrow" />
                        </button>
                      </div>

                      <div
                        className={`faculty-member-accordion-collapse ${
                          activePublicationId === title ? "show" : ""
                        }`}
                      >
                        <div className="faculty-member-accordion-body">
                          {getPublicationsByTitle(title)?.map((pub, pIdx) => (
                            <div key={pIdx} className="publication-detail">
                              {renderSafeHTML(pub.details)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-content">No Publications Available</p>
                )}
              </div>
            ) : (
              <p style={{ opacity: 0.6 }}>Select a section to view details.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacultyMemberTabDesktop;
