"use client";

import "./CalendarDatesTwo.scss";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
// import secondImp from "@/app/assets/second-imp.png";
import moment from "moment";
import { useCalenderData } from "@lib/hooks/useCalenderData";
import Link from "next/link";

const CalendarDatesTwo: FC = () => {
  const { uniquePrograms, calenderDates, importantDates } = useCalenderData();

  // Manage active tab
  const [activeTab, setActiveTab] = useState(
    uniquePrograms?.length > 0 ? uniquePrograms[0].label : ""
  );

  // Filter by program
  const filteredEvents = calenderDates?.filter(
    (item) =>
      item.programId ===
      uniquePrograms?.find((program) => program.label === activeTab)?.id
  );

  // Update active tab when unique programs changes and set first one by default
  useEffect(() => {
    if (uniquePrograms?.length > 0 && !activeTab) {
      setActiveTab(uniquePrograms[0].label);
    }
  }, [uniquePrograms]);

  return (
    <div className="second-dates-section">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <ul className="nav nav-pills" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-Important-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-Important"
                type="button"
                role="tab"
                aria-controls="pills-Important"
                aria-selected="true"
              >
                Important Dates
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-Academic-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-Academic"
                type="button"
                role="tab"
                aria-controls="pills-Academic"
                aria-selected="false"
              >
                Academic Calendar
              </button>
            </li>
          </ul>
          <Link href="/pages/academic-calendar" className="dates-main-btn">
            View All
            <Icon
              className="dates-arrow"
              icon="eva:diagonal-arrow-right-up-outline"
              width="18"
              height="18"
            />
          </Link>
        </div>
        <hr />

        <div className="tab-content" id="pills-tabContent">
          {/* Important Dates Tab */}
          <div
            className="tab-pane fade show active"
            id="pills-Important"
            role="tabpanel"
            aria-labelledby="pills-Important-tab"
            tabIndex={0}
          >
            <div className="dates-wrapper">
              <div className="row">
                <div className="col-md-5 text-center">
                  {/* <div className="">
                    <Image
                      src={secondImp}
                      width={420}
                      height={500}
                      className="img-fluid"
                      alt="Banner EWU"
                    />
                  </div> */}
                </div>
                <div className="col-md-7 second-page-important-dates">
                  <div className="border p-3">
                    {importantDates?.length > 0 ? (
                      importantDates?.slice(0, 5).map((item, index) => (
                        <a
                          key={index}
                          href=""
                          className={`date-number-wrapper`}
                        >
                          <div className="d-flex align-items-center p-3">
                            <div className="me-3 date-number">
                              {String(index + 1).padStart(2, "0")}
                            </div>

                            <div>
                              <div>{item.event}</div>
                              <small>
                                <Icon
                                  className="calender-space-right"
                                  icon="uim:calender"
                                  width="16"
                                  height="16"
                                />
                                {moment(item.date).format("MMMM DD, YYYY")}
                              </small>
                            </div>
                          </div>
                        </a>
                      ))
                    ) : (
                      <p>No important dates available.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Dates Tab */}
          <div
            className="tab-pane fade"
            id="pills-Academic"
            role="tabpanel"
            aria-labelledby="pills-Academic-tab"
            tabIndex={0}
          >
            <div className="sub-tab d-flex align-items-start">
              <div
                className="nav flex-column nav-pills w-100"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <div className="row">
                  <div className="col-lg-3">
                    {uniquePrograms.map((program, index) => (
                      <button
                        key={index}
                        className={`nav-link w-100 my-3 ${
                          activeTab === program.label ? "active" : ""
                        }`}
                        id={`v-pills-Graduate-tab-${program.label}`}
                        data-bs-toggle="pill"
                        data-bs-target={`#v-pills-Graduate-${program.label}`}
                        type="button"
                        role="tab"
                        aria-controls={`v-pills-Graduate-${program.label}`}
                        aria-selected={activeTab === program.label}
                        onClick={() => setActiveTab(program.label)}
                      >
                        {program.label}
                      </button>
                    ))}
                  </div>
                  <div className="col-lg-9 col-sm-12">
                    <div className="tab-content" id="v-pills-tabContent">
                      {uniquePrograms?.map((program, index) => {
                        return (
                          <div
                            key={program.label}
                            className={`tab-pane fade ${
                              activeTab === program.label ? "show active" : ""
                            }`}
                            id={`v-pills-Graduate-tab-${program.label}`}
                            role="tabpanel"
                            aria-labelledby={`v-pills-Graduate-tab-${program.label}`}
                            tabIndex={0}
                          >
                            <div className="dates-wrapper">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="border p-3">
                                    {filteredEvents?.length > 0 ? (
                                      filteredEvents.map((item, index) => (
                                        <Link
                                          key={index}
                                          href=""
                                          className={`date-number-wrapper`}
                                        >
                                          <div className="d-flex align-items-center p-3">
                                            <div className="me-3 date-number">
                                              {String(index + 1).padStart(
                                                2,
                                                "0"
                                              )}
                                            </div>
                                            <div>
                                              <div>{item.event}</div>
                                              <small>
                                                <Icon
                                                  className="calender-space-right"
                                                  icon="uim:calender"
                                                  width="16"
                                                  height="16"
                                                />
                                                {moment(item.date).format(
                                                  "MMMM DD, YYYY"
                                                )}
                                              </small>
                                            </div>
                                          </div>
                                        </Link>
                                      ))
                                    ) : (
                                      <p>No events available.</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarDatesTwo;
