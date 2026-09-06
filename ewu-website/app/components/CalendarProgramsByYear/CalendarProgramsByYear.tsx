"use client";

import "./CalendarProgramsByYear.scss";
import React, { useEffect } from "react";
import CalenderAccordion from "../CalenderAccordion/CalenderAccordion";
import { useCalenderData } from "@lib/hooks/useCalenderData";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { programCalenderActions } from "@lib/slices/calender/programCalender.slice";
import { RootState } from "@lib/root.reducer";

const CalendarProgramsByYear: React.FC = () => {
  const dispatch = useAppDispatch();
  const { programCalenders } = useCalenderData();

  // Filter duplicate years
  const uniqueProgramByYears = [];

  const seenYears = new Set<number>();

  programCalenders
    ?.slice()
    ?.sort((a, b) => b.year - a.year)
    ?.sort((a, b) => a.order - b.order)
    .forEach((item) => {
      if (!seenYears.has(item.year)) {
        seenYears.add(item.year);
        uniqueProgramByYears.push(item);
      }
    });

  // Safely derive initial tab year before state
  // const initialTabYear = uniqueProgramByYears.length
  //   ? uniqueProgramByYears[0].year
  //   : "";

  // Set initial active tab
  //const [activeTab, setActiveTab] = useState<number>(Number(initialTabYear));
  const activeTab = useAppSelector(
    (state: RootState) => state.programCalender.selectedYear
  );

  // Always keep the first item active
  useEffect(() => {
    if (uniqueProgramByYears.length > 0) {
      // Check if current activeTab exists in the new list
      const tabExists = uniqueProgramByYears.some(
        (item) => item.year === activeTab
      );

      if (!tabExists) {
        // If not, select the first tab
        //setActiveTab(uniqueProgramByYears[0].year);
        dispatch(
          programCalenderActions.setSelectedYear(uniqueProgramByYears[0].year)
        );
      }
    }
  }, [uniqueProgramByYears, activeTab]);

  return (
    <>
      <section className="about-us-part" style={{ overflow: "visible" }}>
        <div className="about-us-info">
          <div className="about-us-tabs">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p style={{ margin: 0 }}>Select Year:</p>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn"
                  style={{
                    backgroundColor: "#aa4a44",
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "8px 16px",
                  }}
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {activeTab || "Select year"} <span className="caret"></span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.646 5.646a.5.5 0 0 1 .708 0L8 11.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
                <ul className="dropdown-menu">
                  {uniqueProgramByYears.map((item) => (
                    <li key={item.year}>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          dispatch(
                            programCalenderActions.setSelectedYear(item.year)
                          )
                        }
                      >
                        {item.year}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="tab-content" id="pills-tabContent">
              {typeof activeTab === "number" && (
                <div className="tab-pane fade show active">
                  <CalenderAccordion selectedYear={activeTab} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CalendarProgramsByYear;
