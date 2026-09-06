"use client";

import "./CourseSidebarMenu.scss";
import { useState, useEffect } from "react";

interface CourseSidebarMenuProps {
  courses: {
    id: number;
    name: string;
    courseCode?: string;
    programId?: number;
  }[];
  selectedCourseId?: number | null;
  onSelectCourse: (course: any) => void;
  programTitle?: string;
}

const CourseSidebarMenu: React.FC<CourseSidebarMenuProps> = ({
  courses,
  selectedCourseId,
  onSelectCourse,
  programTitle,
}) => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(courses.length / pageSize);

  // Find the index of selected course
  const selectedIndex = courses.findIndex(
    (course) => course.id === selectedCourseId
  );

  // Smart pagination: jump to the page containing selected course
  useEffect(() => {
    if (selectedIndex >= 0) {
      const targetPage = Math.floor(selectedIndex / pageSize) + 1;
      if (targetPage !== currentPage) setCurrentPage(targetPage);
    } else {
      // If selected course not found, reset to first page
      setCurrentPage(1);
    }
  }, [selectedCourseId, courses.length]);

  const paginatedCourses = courses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="sidebar-menu">
      <div className="sidebar-menu-header">
        <h3>{programTitle || "Courses"}</h3>
      </div>

      <div className="sidebar-menu-body">
        {courses.length === 0 ? (
          <div className="sidebar-empty text-muted p-2">
            No courses available.
          </div>
        ) : (
          <>
            {paginatedCourses.map((course, index) => (
              <div
                key={course.id}
                className={`sidebar-menu-item ${
                  selectedCourseId === course.id ? "active" : ""
                }`}
                style={{ marginLeft: 0 }}
                onClick={() => onSelectCourse(course)}
              >
                <div
                  className={`sidebar-menu-link ${
                    selectedCourseId === course.id ? "active" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  <span>{`${course.courseCode || ""}: ${course.name}`}</span>
                </div>
                {index !== paginatedCourses.length - 1 && (
                  <hr className="sidebar-divider" />
                )}
              </div>
            ))}

            {/* ✅ Pagination Controls */}
            {totalPages > 1 && (
              <div className="sidebar-pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Previous
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CourseSidebarMenu;
