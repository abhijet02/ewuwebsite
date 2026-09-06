"use client";

import React, { useEffect, useState } from "react";
import "./CourseList.scss";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { courseActions } from "@lib/slices/course/course.slice";
import { programActions } from "@lib/slices/program/program.slice";
import { useParams, useSearchParams } from "next/navigation";
import { renderSafeHTML } from "@lib/utils/html2text";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import CourseSidebarMenu from "./CourseSidebarMenu";
import { Icon } from "@iconify/react";

const CourseList: React.FC = () => {
  const { programs, courses } = useDepartmentData();

  const { id } = useParams();
  const searchParams = useSearchParams();

  const programId = parseInt(id?.toString());

  // Get search parameters from URL
  const urlDepartmentId = searchParams.get("departmentId");
  const urlProgramCategoryId = searchParams.get("programCategoryId");
  const urlProgramId = searchParams.get("programId");
  const urlKeyword = searchParams.get("keyword");

  const dispatch = useAppDispatch();

  // Initialize search query with URL parameter if it exists
  const [searchQuery, setSearchQuery] = useState(urlKeyword || "");

  // Add state for selected course
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Filter courses based on multiple criteria
  const getFilteredCourses = () => {
    if (!courses) return [];

    let filtered = courses;

    // Filter by program ID (from URL path)
    filtered = programId
      ? filtered.filter((course) => course.programId === programId)
      : courses;

    // If we have URL parameters from search, apply additional filters
    if (urlDepartmentId) {
      filtered = filtered.filter(
        (course) => course.departmentId === parseInt(urlDepartmentId)
      );
    }

    if (urlProgramCategoryId) {
      filtered = filtered.filter((course) => {
        const program = programs?.find((p) => p.id === course.programId);
        return program?.programCategoryId === parseInt(urlProgramCategoryId);
      });
    }

    // Apply keyword search (either from URL or current search input)
    const searchTerm = searchQuery.toLowerCase().trim();
    if (searchTerm.length >= 3) {
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(searchTerm) ||
          course.courseCode?.toLowerCase().includes(searchTerm)
      );
    }
    // If searchTerm is less than 3 characters or empty, show all filtered courses

    return filtered;
  };

  const filteredCourses = getFilteredCourses();

  // Auto-select first course only when needed
  useEffect(() => {
    if (filteredCourses.length === 0) {
      setSelectedCourse(null);
    } else if (
      !selectedCourse ||
      !filteredCourses.find((course) => course.id === selectedCourse.id)
    ) {
      // Only auto-select if no course is selected or if the selected course is no longer in the filtered list
      setSelectedCourse(filteredCourses[0]);
    }
  }, [filteredCourses, selectedCourse]);

  // Get current program info for display
  const currentProgram = programs?.find((p) => p.id === programId);

  const selectedProgram = programs?.find(
    (p) => p.id === selectedCourse?.programId
  );

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="my-5">
      {/* Search Context */}
      {(urlDepartmentId || urlProgramCategoryId || urlKeyword) && (
        <div className="mb-4 p-3 search-course-result">
          <h5>Search Results</h5>
          <p className="mb-1">
            <strong>Program:</strong>{" "}
            {currentProgram?.title || selectedProgram?.title}
          </p>

          <p className="mb-0">
            <strong>Results Found:</strong>{" "}
            {filteredCourses.length === 0
              ? "No course found"
              : filteredCourses.length === 1
              ? "01 course"
              : `${
                  filteredCourses.length < 10
                    ? "0" + filteredCourses.length
                    : filteredCourses.length
                } courses`}
            {!urlKeyword &&
              filteredCourses.length > 0 &&
              " (showing all courses for selected criteria)"}
          </p>
        </div>
      )}

      <div className="coursedetails-wrapper">
        <div className="row">
          <div className="col-md-3">
            {/* Search Field */}
            <div className="search-field-wrapper">
              <Icon
                icon="bitcoin-icons:search-outline"
                width="24"
                height="24"
              />
              <input
                type="text"
                placeholder="Search course by name or code"
                className="form-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searchQuery.length > 0 && searchQuery.length < 3 && (
              <small className="text-muted mb-3 d-block">
                Please enter at least 3 characters to search, or leave empty to
                show all courses
              </small>
            )}
            {filteredCourses.length === 0 && searchQuery.length >= 3 && (
              <div className="alert alert-info">
                No courses found matching your search criteria. Try adjusting
                your search terms.
              </div>
            )}

            <CourseSidebarMenu
              courses={filteredCourses}
              selectedCourseId={selectedCourse?.id}
              onSelectCourse={handleCourseSelect}
              programTitle={currentProgram?.title || selectedProgram?.title}
            />
          </div>

          {/* Course Details */}
          <div className="col-md-9">
            <div className="coursedetails-card">
              <div className="coursedetails-card-body">
                {selectedCourse ? (
                  <div>
                    <div className="coursename-coursecode">
                      <h4>{selectedCourse.name}</h4>
                      <p>{selectedCourse.courseCode || "N/A"}</p>
                    </div>
                    <div className="coursedetails-info-list">
                      <div className="coursedetails-info-part">
                        <div className="coursedetails-info-part-icon-body">
                          <Icon icon="wpf:books" />
                        </div>
                        <div className="coursedetails-info-details-part">
                          <h6>Program</h6>
                          <p>
                            {currentProgram?.title || selectedProgram?.title}
                          </p>
                        </div>
                      </div>
                      <div className="coursedetails-info-part">
                        <div className="coursedetails-info-part-icon-body">
                          <Icon icon="streamline:star-badge-solid" />
                        </div>
                        <div className="coursedetails-info-details-part">
                          <h6>Course Credit</h6>
                          <p>{selectedCourse.creditHour || "N/A"}</p>
                        </div>
                      </div>
                      <div className="coursedetails-info-part">
                        <div className="coursedetails-info-part-icon-body">
                          <Icon icon="wpf:books" />
                        </div>
                        <div className="coursedetails-info-details-part">
                          <h6>Prerequisite</h6>
                          <p>
                            {renderSafeHTML(selectedCourse.preRequisite) ||
                              "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p>
                      <b>Description:</b>{" "}
                      {renderSafeHTML(selectedCourse.description) || "N/A"}
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-muted">
                    <p>No course selected</p>
                    <p>
                      Please select a course from the sidebar to view details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
