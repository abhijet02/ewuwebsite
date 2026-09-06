"use client";

import { useState, useEffect } from "react";
import { useCalenderData } from "@lib/hooks/useCalenderData";
import { Icon } from "@iconify/react";
import moment from "moment";
import "./CalendarDates.scss";
import Link from "next/link";
import { renderSafeHTML } from "@lib/utils/html2text";
import { useViewAllLink } from "@lib/hooks/useViewAllLink";

const CalendarDates: React.FC = () => {
  const { uniquePrograms, calenderDates, importantDates } = useCalenderData();
  const viewAllLink = useViewAllLink({
    componentName: "CalendarDates",
  });

  const [activeMainTab, setActiveMainTab] = useState("important");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    if (uniquePrograms?.length > 0 && !openAccordion) {
      setOpenAccordion(uniquePrograms[0].label);
    }
  }, [uniquePrograms]);

  const handleAccordionToggle = (programLabel: string) => {
    setOpenAccordion(openAccordion === programLabel ? null : programLabel);
  };

  return (
    <div className="calendar-container">
      {/* Main Buttons */}
      <div className="calendar-main-buttons">
        <button
          onClick={() => setActiveMainTab("important")}
          className={`main-button important ${
            activeMainTab === "important" ? "active" : ""
          }`}
        >
          <Icon icon="mdi:calendar-star-outline" width="24" height="24" />{" "}
          Important Dates
        </button>

        <button
          onClick={() => setActiveMainTab("academic")}
          className={`main-button academic ${
            activeMainTab === "academic" ? "active" : ""
          }`}
        >
          <Icon
            icon="mdi:calendar-multiselect-outline"
            width="24"
            height="24"
          />{" "}
          Academic Calendar
        </button>
      </div>

      {/* Main Content */}
      <div className="calendar-content">
        {activeMainTab === "important" && (
          <div>
            {importantDates?.length > 0 ? (
              importantDates
                ?.sort((a, b) => moment(a.date).diff(b.date))
                ?.slice(0, 5)
                ?.map((item, index) => (
                  <div key={index} className="important-dates-box">
                    <div className="important-dates-number">
                      <h1>{index + 1}</h1>
                    </div>
                    <div className="important-dates-info">
                      <div className="important-dates-parser">
                        {renderSafeHTML(item.event)}
                      </div>
                      <p className="date-info">
                        <Icon
                          icon="stash:data-date-light"
                          width="22"
                          height="22"
                        />
                        <span>{moment(item.date).format("MMMM D, YYYY")}</span>
                      </p>
                    </div>
                  </div>
                ))
            ) : (
              <p>No important dates available.</p>
            )}
            <div className="view-all">
              <Link
                href={viewAllLink || ""}
                className="academic-dates-view-all-button"
              >
                View All
                <Icon icon="si:arrow-right-duotone" width="20" height="20" />
              </Link>
            </div>
          </div>
        )}

        {activeMainTab === "academic" && (
          <div>
            {uniquePrograms?.map((program) => {
              const isOpen = openAccordion === program.label;
              const programDates = calenderDates?.filter(
                (item) =>
                  item.programId === program?.id &&
                  item.date != null &&
                  item.event != null
              );

              return (
                <div key={program.label} className="accordion-item">
                  <button
                    onClick={() => handleAccordionToggle(program.label)}
                    className={`accordion-button ${isOpen ? "open" : ""}`}
                  >
                    <span className="accordion-label">{program.label}</span>
                    <Icon
                      icon="simple-line-icons:arrow-down"
                      width="20"
                      height="20"
                      className={`accordion-icon ${isOpen ? "open" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="accordion-content">
                      {programDates?.length > 0 ? (
                        programDates
                          ?.filter((item) =>
                            moment(item.date).isSameOrAfter(moment(), "day")
                          )
                          .sort(
                            (a, b) =>
                              moment(a.date).valueOf() -
                              moment(b.date).valueOf()
                          )
                          ?.slice(0, 5)
                          ?.map((item, index) => (
                            <div key={index} className="important-dates-box">
                              <div className="important-dates-number">
                                <h1>{index + 1}</h1>
                              </div>
                              <div className="important-dates-info">
                                <div className="important-dates-parser">
                                  {renderSafeHTML(item.event)}
                                </div>
                                <p className="date-info">
                                  <Icon
                                    icon="stash:data-date-light"
                                    width="22"
                                    height="22"
                                  />
                                  <span>
                                    {moment(item.date).format("MMMM D, YYYY")}
                                  </span>
                                </p>
                              </div>
                            </div>
                          ))
                      ) : (
                        <p>No events for this program.</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="view-all">
              <Link
                href={viewAllLink || ""}
                className="academic-dates-view-all-button"
              >
                View All
                <Icon icon="si:arrow-right-duotone" width="20" height="20" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDates;
