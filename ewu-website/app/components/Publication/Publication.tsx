"use client";

import React, { useEffect, useState } from "react";
import { useFacultyData } from "@lib/hooks/useFacultyData";
import "./Publication.scss";
import { renderSafeHTML } from "@lib/utils/html2text";
import Pagination from "../Pagination/Pagination";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { generatePublicationPDF } from "@lib/utils/pdfUtils";

const Publication = () => {
  const { facultys, departments, designations, facultyPersons, publications } =
    useFacultyData();

  const pathName = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const isResearchPage = pathName.includes("research");

  const facultyId = searchParams.get("slug") || params.id;
  const departmentId = searchParams.get("slug") || params.id;

  const faculty = facultys?.find((f) => f.slug === facultyId);
  const department = departments?.find((d) => d.slug == departmentId);

  const facultyDepartments =
    facultyId && faculty
      ? departments?.filter((dept) => dept.facultyId === faculty.id)
      : departments;

  const facultyDesignations = [
    ...new Set(facultyPersons?.map((p) => p.designation).filter(Boolean)),
  ];

  const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
  const [selectedDesignation, setSelectedDesignation] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedTitles, setSelectedTitles] = useState({});
  const getDepartmentName = (departmentId) => {
    return (
      departments?.find((d) => Number(d.id) === Number(departmentId))?.name ||
      "N/A"
    );
  };
  useEffect(() => {
    if (department) {
      setSelectedDepartmentId(department.id);
    } else {
      setSelectedDepartmentId(0);
    }
  }, [department, departmentId]);

  let filteredPersons = facultyPersons;

  if (facultyId && faculty) {
    filteredPersons = facultyPersons?.filter(
      (member) => member.facultyId === faculty.id,
    );
  } else if (departmentId && department) {
    filteredPersons = facultyPersons?.filter(
      (member) => member.departmentId == department.id,
    );
  }

  if (selectedDepartmentId) {
    filteredPersons = facultyPersons?.filter(
      (member) => member.departmentId == selectedDepartmentId,
    );
  }

  if (selectedDesignation) {
    filteredPersons = filteredPersons?.filter(
      (member) => member.designation === selectedDesignation,
    );
  }

  // Pagination logic
  const dataLength = filteredPersons?.length || 0;
  const totalPages = Math.max(1, Math.ceil(dataLength / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredPersons?.slice(indexOfFirstItem, indexOfLastItem);

  // Helper function to get unique titles for a person
  const getUniqueTitles = (personId) => {
    const personPubs =
      publications?.filter((pub) => pub.facultyPersonId === personId) || [];
    const titles = [
      ...new Set(personPubs.map((pub) => pub.title).filter(Boolean)),
    ];
    return titles;
  };

  // Helper function to get publications by title for a person
  const getPublicationsByTitle = (personId, title) => {
    return (
      publications?.filter(
        (pub) => pub.facultyPersonId === personId && pub.title === title,
      ) || []
    );
  };

  const getDesignation = (des) => {
    return designations?.find((d) => d.id.toString() === des);
  };

  return (
    <>
      <section
        className="department-filter"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* Department Select */}
        <div style={{ flex: "1 1 200px" }}>
          <select
            id="departmentSelect"
            className="form-select"
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
            onChange={(e) => setSelectedDepartmentId(Number(e.target.value))}
            value={selectedDepartmentId}
          >
            <option disabled value={0}>
              All Departments
            </option>
            {facultyDepartments?.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        {/* Designation Select */}
        <div style={{ flex: "1 1 200px" }}>
          <select
            id="secondSelect"
            className="form-select"
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
            onChange={(e) => setSelectedDesignation(e.target.value)}
            value={selectedDesignation}
          >
            <option value="">All Designations</option>
            {facultyDesignations.map((desig, index) => (
              <option key={index} value={desig}>
                {getDesignation(desig)?.designation}
              </option>
            ))}
          </select>
        </div>
      </section>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={() => {
            const dataToDownload = currentData.map((member) => {
              if (isResearchPage) {
                return {
                  ...member,
                  sections: [
                    {
                      title: "Ongoing Research",
                      details:
                        member.onGoingResearch ||
                        "No ongoing research available",
                    },
                  ],
                };
              } else {
                const titles = getUniqueTitles(member.id);
                const sections = titles.map((title) => ({
                  title,
                  details: getPublicationsByTitle(member.id, title)
                    .map((pub) => pub.details)
                    .join("<br/>"),
                }));
                return { ...member, sections };
              }
            });

            generatePublicationPDF(
              dataToDownload,
              getDepartmentName,
              (id) => getDesignation(id)?.designation,
            );
          }}
          style={{
            position: "relative",
            backgroundColor: "#a44a44",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          Download
          <Icon icon="lucide:download" />
          {/* <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              backgroundColor: "yellow",
              color: "#000",
              fontSize: "10px",
              fontWeight: "bold",
              padding: "2px 5px",
              borderRadius: "4px",
            }}
          >
            Beta
          </span> */}
        </button>
      </div>

      <p>Showing {dataLength} results</p>
      <section className="accordion-wrapper">
        <div className="accordion" id="accordionExample">
          {currentData?.map((item, index) => {
            const collapseId = `collapse-${index}`;
            const headingId = `heading-${index}`;
            const uniqueTitles = getUniqueTitles(item.id);
            const selectedTitle = selectedTitles[item.id] || uniqueTitles[0];

            return (
              <div className="accordion-item" key={item?.id}>
                <h2 className="accordion-header" id={headingId}>
                  <button
                    className={"accordion-button collapsed"}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseId}`}
                    aria-expanded="false"
                    aria-controls={collapseId}
                  >
                    {item?.name} |{" "}
                    {getDesignation(item?.designation)?.designation}
                  </button>
                </h2>
                <div
                  id={collapseId}
                  className="accordion-collapse collapse"
                  aria-labelledby={headingId}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {isResearchPage ? (
                      item?.onGoingResearch ? (
                        renderSafeHTML(item.onGoingResearch)
                      ) : (
                        <div className="no-publication">
                          No Ongoing Research Available
                        </div>
                      )
                    ) : publications ? (
                      <>
                        {uniqueTitles.length > 0 && (
                          <div className="d-flex flex-column">
                            {/* Dropdown for title selection */}
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                              }}
                            >
                              <div
                                className="mb-3"
                                style={{ maxWidth: "200px" }}
                              >
                                <select
                                  className="form-select"
                                  value={selectedTitle || ""}
                                  onChange={(e) =>
                                    setSelectedTitles((prev) => ({
                                      ...prev,
                                      [item.id]: e.target.value,
                                    }))
                                  }
                                  style={{ maxWidth: "200px" }}
                                >
                                  <option value="">Select a section</option>
                                  {uniqueTitles.map((title, index) => (
                                    <option key={index} value={title}>
                                      {title}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* Content area */}
                            <div className="tab-content flex-grow-1 ps-1">
                              {selectedTitle ? (
                                getPublicationsByTitle(
                                  item.id,
                                  selectedTitle,
                                ).map((pub, index) => (
                                  <div
                                    key={index}
                                    className="tab-pane show active"
                                    style={{ wordBreak: "break-all" }}
                                  >
                                    {renderSafeHTML(pub?.details)}
                                  </div>
                                ))
                              ) : (
                                <p className="text-muted">
                                  Please select a section to view details.
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="no-publication">
                        No Publication Available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </section>
    </>
  );
};

export default Publication;
