"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./CourseByProgram.scss";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import Link from "next/link";

const CourseByProgram: React.FC = () => {
  const {
    department,
    programCategories,
    departmentPrograms: programs,
    departmentCourses: courses,
  } = useDepartmentData();

  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(
    null
  );

  // Set the default selected program once data is loaded
  useEffect(() => {
    if (programCategories?.length && programs?.length) {
      const firstCategory = programCategories[0];
      const firstProgram = programs.find(
        (program) => program.programCategoryId === firstCategory.id
      );
      if (firstProgram && !selectedProgramId) {
        setSelectedProgramId(firstProgram.id);
      }
    }
  }, [programCategories, programs]);

  const handleProgramClick = (programId: number) => {
    setSelectedProgramId(programId);
  };

  const filteredCourses = courses?.filter(
    (course) => course.programId === selectedProgramId
  );

  const selectedProgram = programs?.find(
    (program) => program.id === selectedProgramId
  );
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <>
      <section className="department-wise-course-part">
        <div
          {...(!isStatic ? { "data-aos": "fade-down" } : {})}
          className="container"
        >
          <div className="header-with-subtitle">
            <h2>Admission to East West University and Core Courses</h2>
          </div>
          <div className="department-wise-course-main">
            <div className="department-wise-program">
              <div className="program-title">
                <h2>Programs</h2>
              </div>
              <div
                className="accordion program-accordion"
                id="accordionExample"
              >
                {programCategories?.map((programCategory, index) => {
                  return (
                    <div className="accordion-item" key={programCategory?.id}>
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button ${
                            index !== 0 ? "collapsed" : ""
                          }`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse-${programCategory.id}`}
                          aria-expanded={index === 0 ? "true" : "false"}
                          aria-controls={`collapse-${programCategory.id}`}
                        >
                          <Icon
                            icon="icon-park-outline:degree-hat"
                            width="24"
                            height="24"
                          />
                          {programCategory?.title}
                        </button>
                      </h2>
                      <div
                        id={`collapse-${programCategory.id}`}
                        className={`accordion-collapse collapse ${
                          index === 0 ? "show" : ""
                        }`}
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          {programs
                            ?.filter(
                              (program) =>
                                program.programCategoryId ===
                                programCategory?.id
                            )
                            .map((program) => {
                              return (
                                <a
                                  href="#"
                                  key={program?.id}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleProgramClick(program.id);
                                  }}
                                  className={
                                    selectedProgramId === program.id
                                      ? "active"
                                      : "course-accordion-body"
                                  }
                                >
                                  {program?.title}
                                </a>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="department-wise-course">
              <div className="header-with-view-all-button">
                <h2>Courses</h2>
                <Link
                  href={`/pages/course-details/${selectedProgramId}?departmentId=${department?.id}&programCategoryId=${selectedProgram?.programCategoryId}&programId=${selectedProgramId}`}
                  className="for-all-view-all-button"
                >
                  View All
                  <Icon icon="si:arrow-right-duotone" width="20" height="20" />
                </Link>
              </div>

              <ul>
                {filteredCourses?.length > 0 &&
                  filteredCourses.map((course) => (
                    <li key={course?.id}>
                      <a href={`/pages/course-details/${selectedProgramId}`}>
                        {course?.courseCode} {": "} {course?.name}
                        <Icon
                          icon="si:arrow-right-duotone"
                          width="26"
                          height="26"
                        />
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseByProgram;
