"use client";

import "./CalendarDatesThree.scss";
import { FC, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import moment from "moment";
import { useCalenderData } from "@lib/hooks/useCalenderData";
// import img from "../../assets/important-dates3.jpg";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";

const CalendarDatesThree: FC = () => {
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
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <div className="third-dates-section">
      <div className="container">
        <div {...(!isStatic ? { "data-aos": "zoom-in" } : {})} className="row">
          {/* <!-- Left Side --> */}
          <div className="col-md-6 g-0">
            <div className="left-panel">
              <ul
                className="nav nav-tabs nav-pills nav-justified"
                id="myTab"
                role="tablist"
              >
                {/* Important Dates */}
                <li className="nav-item " role="presentation">
                  <button
                    className="nav-link  active important-date-btn"
                    id="important-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#important-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="important-tab-pane"
                    aria-selected="true"
                  >
                    Important Dates
                  </button>
                </li>

                {/* Academic Calendar */}
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link  academic-date-btn"
                    id="academic-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#academic-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="academic-tab-pane"
                    aria-selected="false"
                  >
                    Academic Calendar
                  </button>
                </li>
              </ul>

              {/* Tab Contents */}
              <div className="tab-content" id="myTabContent">
                {/* Important Date Contents */}
                <div
                  className="tab-pane fade show active"
                  id="important-tab-pane"
                  role="tabpanel"
                  aria-labelledby="important-tab"
                >
                  <div className="events-scroll">
                    <div className="event-list">
                      {importantDates?.length > 0 ? (
                        importantDates.map((item, index) => (
                          <div key={index} className="event d-flex mb-4">
                            <div className="date-box">
                              <div className="date">
                                {moment(item.date).format("D")}
                              </div>
                              <div className="month">
                                {moment(item.date).format("MMMM")}
                              </div>
                            </div>
                            <div className="event-info">
                              <h4 className="event-title">{item.event}</h4>
                              <div className="event-meta d-flex  align-items-center mt-2 gap-3">
                                <p className="d-flex align-items-center gap-1">
                                  <Icon
                                    icon="stash:data-date-light"
                                    width="24"
                                    height="24"
                                  />
                                  <span>
                                    {moment(item.date).format("MMMM D, YYYY")}
                                  </span>
                                </p>
                                <p className="d-flex align-items-center gap-1">
                                  <Icon
                                    icon="radix-icons:avatar"
                                    width="22"
                                    height="22"
                                  />
                                  <span>{item.day}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No important dates available.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Academic Date Contents */}
                <div
                  className="tab-pane fade"
                  id="academic-tab-pane"
                  role="tabpanel"
                  aria-labelledby="academic-tab"
                >
                  <div className="academic-sub-tabs">
                    {/* Academic Date Sub-Tabs */}
                    <ul
                      className="nav nav-tabs nav-pills nav-justified"
                      id="myTab"
                      role="tablist"
                    >
                      {uniquePrograms.map((item, index) => (
                        <li
                          key={index}
                          className="nav-item"
                          role="presentation"
                        >
                          <button
                            className={`nav-link grad-tab-btn ${
                              activeTab === item.label ? "active" : ""
                            }`}
                            id={`tab-${item.label}`}
                            data-bs-toggle="tab"
                            data-bs-target={`#tab-pane-${item.label}`}
                            type="button"
                            role="tab"
                            aria-controls={`tab-pane-${item.label}`}
                            aria-selected={activeTab === item.label}
                            onClick={() => setActiveTab(item.label)}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>

                    <div className="tab-content" id="myTabContent">
                      {uniquePrograms?.map((program) => {
                        return (
                          <div
                            key={program.label}
                            className={`tab-pane fade ${
                              activeTab === program.label ? "show active" : ""
                            }`}
                            id={`tab-${program.label}`}
                            role="tabpanel"
                            aria-labelledby={`tab-${program.label}`}
                          >
                            <div className="events-scroll">
                              <div className="event-list">
                                {filteredEvents?.length > 0 ? (
                                  filteredEvents.map((item, index) => (
                                    <div
                                      key={index}
                                      className="event d-flex mb-4"
                                    >
                                      <div className="date-box">
                                        <div className="date">
                                          {moment(item.date).format("D")}
                                        </div>
                                        <div className="month">
                                          {moment(item.date).format("MMM")}
                                        </div>
                                      </div>
                                      <div className="event-info">
                                        <h4 className="event-title">
                                          {item.event}
                                        </h4>
                                        <div className="event-meta d-flex  align-items-center mt-2 gap-3">
                                          <p className="d-flex align-items-center gap-1">
                                            <Icon
                                              icon="stash:data-date-light"
                                              width="24"
                                              height="24"
                                            />
                                            <span>
                                              {moment(item.date).format(
                                                "MMMM D, YYYY"
                                              )}
                                            </span>
                                          </p>
                                          <p className="d-flex align-items-center gap-1">
                                            <Icon
                                              icon="radix-icons:avatar"
                                              width="22"
                                              height="22"
                                            />
                                            <span>{item.day}</span>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <p>No academic events available.</p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/pages/academic-calendar" className="dates-main-btn">
                View All
                <Icon
                  className="dates-arrow"
                  icon="eva:diagonal-arrow-right-up-outline"
                  width="18"
                />
              </Link>
            </div>
          </div>

          {/* <!-- Right Side --> */}
          <div className="col-md-6 g-0">
            {/* <Image
              className="dates-img-banner object-fit-cover"
              src={img}
              alt="Important-dates banner"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarDatesThree;
