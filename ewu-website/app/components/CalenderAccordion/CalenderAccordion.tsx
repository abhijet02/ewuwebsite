"use client";

import "./CalenderAccordion.scss";
import React, { useEffect } from "react";
import Link from "next/link";
import { useCalenderData } from "@lib/hooks/useCalenderData";
import { YesOrNo } from "@lib/services/calender/calenderDate.service.type";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { semesterCalenderActions } from "@lib/slices/calender/semesterCalender.slice";
import { RootState } from "@lib/root.reducer";

const CalenderAccordion = ({ selectedYear }) => {
  const dispatch = useAppDispatch();
  const { programCalenders, semesterCalenders } = useCalenderData();

  const semesterCalenderId = useAppSelector(
    (state: RootState) => state.semesterCalender.selectedSemeserId,
  );

  // filtering the program calender by selected year
  const filteredProgramCalendars = programCalenders?.filter(
    (item) => Number(item.year) === Number(selectedYear),
  );

  // filtering the semester calender by programId
  const getSemester = (programId: number) => {
    return semesterCalenders?.filter((item) => item.programId === programId);
  };

  // 👇 Auto-select first Tri semester if none selected
  useEffect(() => {
    if (!semesterCalenderId && filteredProgramCalendars?.length) {
      const firstProgram = filteredProgramCalendars[0];
      const triSemesters = getSemester(firstProgram.id)?.filter(
        (semester) => semester.isBiSemester === YesOrNo.NO,
      );
      if (triSemesters?.length) {
        dispatch(
          semesterCalenderActions.setSelectedSemeserId(triSemesters[0].id),
        );
      }
    }
  }, [
    semesterCalenderId,
    filteredProgramCalendars,
    semesterCalenders,
    dispatch,
  ]);

  return (
    <>
      <section className="accordion-wrapper">
        <div className="accordion" id="accordionExample">
          {filteredProgramCalendars?.map((item, index) => {
            const collapseId = `collapse-${index}`;
            const headingId = `heading-${index}`;

            return (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={headingId}>
                  <button
                    className={`accordion-button ${
                      index !== 0 ? "collapsed" : ""
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseId}`}
                    aria-expanded={index === 0 ? "true" : "false"}
                    aria-controls={collapseId}
                  >
                    {item.label}
                  </button>
                </h2>
                <div
                  id={collapseId}
                  className={`accordion-collapse collapse ${
                    index === 0 ? "show" : ""
                  }`}
                  aria-labelledby={headingId}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <div className="accordion-tab-wrapper">
                      {/* Tabs */}
                      <ul
                        className="nav nav-underline justify-content-center"
                        id={`myTab-${index}`}
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id={`tri-tab-${index}`}
                            data-bs-toggle="tab"
                            data-bs-target={`#tri-pane-${index}`}
                            type="button"
                            role="tab"
                            aria-controls={`tri-pane-${index}`}
                            aria-selected="true"
                          >
                            Tri Semester
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id={`bi-tab-${index}`}
                            data-bs-toggle="tab"
                            data-bs-target={`#bi-pane-${index}`}
                            type="button"
                            role="tab"
                            aria-controls={`bi-pane-${index}`}
                            aria-selected="false"
                          >
                            Bi Semester
                          </button>
                        </li>
                      </ul>

                      {/* Tab Contents */}
                      <div className="tab-content" id={`myTabContent-${index}`}>
                        {/* Tri Semester */}
                        <div
                          className="tab-pane fade show active"
                          id={`tri-pane-${index}`}
                          role="tabpanel"
                          aria-labelledby={`tri-tab-${index}`}
                          tabIndex={0}
                        >
                          {getSemester(item.id)
                            ?.filter(
                              (semester) =>
                                semester.isBiSemester === YesOrNo.NO,
                            )
                            .map((semester, sindex) => (
                              <Link
                                className={`semester-link ${
                                  semester?.id == semesterCalenderId
                                    ? "active"
                                    : ""
                                }`}
                                key={sindex}
                                href={"#"}
                                onClick={() =>
                                  dispatch(
                                    semesterCalenderActions.setSelectedSemeserId(
                                      semester.id,
                                    ),
                                  )
                                }
                              >
                                {semester.label}
                              </Link>
                            ))}
                        </div>
                        <div
                          className="tab-pane fade"
                          id={`bi-pane-${index}`}
                          role="tabpanel"
                          aria-labelledby={`bi-tab-${index}`}
                          tabIndex={0}
                        >
                          {getSemester(item.id)
                            ?.filter(
                              (semester) =>
                                semester.isBiSemester === YesOrNo.YES,
                            )
                            .map((semester, sindex) => (
                              <Link
                                className={`semester-link ${
                                  semester?.id == semesterCalenderId
                                    ? "active"
                                    : ""
                                }`}
                                key={sindex}
                                href={"#"}
                                onClick={() =>
                                  dispatch(
                                    semesterCalenderActions.setSelectedSemeserId(
                                      semester.id,
                                    ),
                                  )
                                }
                              >
                                {semester.label}
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
export default CalenderAccordion;
