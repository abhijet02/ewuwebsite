"use client";

import "./CalendarDetailsList.scss";
import moment from "moment";
import CalendarAttachmentAccordion from "@/app/components/CalendarAttachmentAccordion/CalendarAttachmentAccordion";
import { useCalenderData } from "@lib/hooks/useCalenderData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { renderSafeHTML } from "@lib/utils/html2text";

const CalendarDetailsList: React.FC = () => {
  const { semesterCalenderId, selectedSemester, filteredDates } =
    useCalenderData();

  const BulletIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="bullet-icon"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.84712 1.36052C7.78848 1.38479 7.70401 1.43744 7.65943 1.47755C7.6148 1.51762 7.25915 2.18819 6.86901 2.96767C6.07224 4.55969 5.82522 4.96811 5.40538 5.38753C4.96572 5.82674 4.69141 5.99148 3.02366 6.81799C1.36678 7.63908 1.33325 7.66235 1.33325 7.9924C1.33325 8.31544 1.36915 8.34052 2.99932 9.15582C4.69618 10.0044 4.95751 10.1617 5.39197 10.5957C5.83971 11.043 6.05212 11.3921 6.87869 13.0393C7.56386 14.4047 7.63905 14.5356 7.77515 14.6001C7.9763 14.6955 8.10699 14.6887 8.2805 14.5739C8.40367 14.4925 8.55134 14.2311 9.22189 12.908C9.65931 12.0449 10.0841 11.2433 10.1657 11.1266C10.3779 10.8238 10.8764 10.3337 11.179 10.1304C11.3216 10.0346 12.1147 9.61796 12.9416 9.20443C13.7953 8.7775 14.4916 8.40262 14.5526 8.33709C14.6945 8.18471 14.7064 7.81658 14.5741 7.66983C14.5268 7.61735 13.8304 7.24603 13.0265 6.84461C11.4982 6.08154 11.1376 5.87115 10.7485 5.51589C10.2664 5.07573 10.0945 4.80255 9.24339 3.123C8.70644 2.06347 8.38974 1.48498 8.31911 1.43469C8.18038 1.33592 7.98194 1.30474 7.84712 1.36052Z"
        fill="currentColor"
      />
    </svg>
  );

  const isEffectivelyEmpty = (value: any): boolean => {
    if (value === undefined || value === null || value === "") return true;

    // Check for empty HTML tags
    if (typeof value === "string") {
      const stripped = value.replace(/<[^>]*>/g, "").trim();
      return stripped === "";
    }

    return false;
  };

  const allowedKeys = [
    "date",
    "day",
    "event",
    "classDays",
    "lastDateOfClass",
    "finalExamDays",
    "finalExamDate",
  ];

  const visibleKeys = allowedKeys.filter((key) =>
    filteredDates?.some((item) => !isEffectivelyEmpty(item[key]))
  );

  const formatHeader = (key: string) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const renderDescriptionManually = (html?: string) => {
    if (!html) return null;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Helper function to recursively parse each node
    const parseNode = (node: ChildNode, index: number): React.ReactNode => {
      const nodeName = node.nodeName.toLowerCase();

      // Paragraph
      if (nodeName === "p") {
        return (
          <p key={index} className="rich-text-editor-paragraph">
            {node.textContent}
          </p>
        );
      }

      // Headings (H3 → H5 for consistency)
      if (nodeName === "h3") {
        return (
          <h5 key={index} style={{ margin: 0 }}>
            {node.textContent}
          </h5>
        );
      }

      if (nodeName === "h6") {
        return (
          <h6 key={index} style={{ margin: 0 }}>
            {node.textContent}
          </h6>
        );
      }

      // Unordered list (ul)
      if (nodeName === "ul") {
        const children = Array.from(node.childNodes).map((child, i) =>
          parseNode(child, i)
        );
        return (
          <ul key={index} className="list-disc pl-5 my-2" style={{ margin: 0 }}>
            {children}
          </ul>
        );
      }

      // Ordered list (ol)
      if (nodeName === "ol") {
        const children = Array.from(node.childNodes).map((child, i) =>
          parseNode(child, i)
        );
        return (
          <ol
            key={index}
            className="list-decimal pl-5 my-2"
            style={{ margin: 0 }}
          >
            {children}
          </ol>
        );
      }

      // List item (li) → custom bullet for unordered list
      if (nodeName === "li") {
        const parentTag = (
          node.parentNode as HTMLElement
        )?.nodeName.toLowerCase();

        if (parentTag === "ul") {
          return (
            <li
              key={index}
              className="mb-2 p-1 flex items-start gap-2 manual-parser-ul-ol-li-a-tag-color"
              style={{ listStyleType: "none" }}
            >
              <BulletIcon />
              <span>{node.textContent}</span>
            </li>
          );
        }

        if (parentTag === "ol") {
          return (
            <li
              key={index}
              className="mb-2 p-1 manual-parser-ul-ol-li-a-tag-color manual-parser-ul-ol-li-a-tag-color"
            >
              {node.textContent}
            </li>
          );
        }

        // Fallback (if li outside ul/ol)
        return (
          <li
            key={index}
            className="mb-2 p-1 manual-parser-ul-ol-li-a-tag-color"
          >
            {node.textContent}
          </li>
        );
      }

      // Fallback for unknown nodes
      return (
        <span key={index} className="manual-parser-ul-ol-li-a-tag-color">
          {node.textContent}
        </span>
      );
    };

    return Array.from(tempDiv.childNodes).map(parseNode);
  };

  console.log(filteredDates, "dkfdnm");

  return (
    <div className="academic-calendar-items">
      <section className="academic-partner-part">
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          <h4> {selectedSemester?.title || "Academic Calender"}</h4>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {renderDescriptionManually(selectedSemester?.description)}
          </div>
        </div>
        <div
          {...(!isStatic ? { "data-aos": "fade-up" } : {})}
          className="academic-partner-main"
        >
          <div
            style={{
              padding: "12px",
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {semesterCalenderId && (
              <CalendarAttachmentAccordion semesterId={semesterCalenderId} />
            )}
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr style={{ fontSize: "14px", padding: "8px !important" }}>
                  {visibleKeys.map((key) => (
                    <th key={key} scope="col">
                      {formatHeader(key)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredDates && filteredDates.length > 0 ? (
                  filteredDates.map((item, index) => (
                    <tr key={index}>
                      {visibleKeys.map((key) => (
                        <td
                          key={key}
                          style={{ fontSize: "14px", padding: "8px 16px" }}
                        >
                          {key === "date" ||
                          key === "finalExamDate" ||
                          key === "lastDateOfClass" ? (
                            key === "date" ? (
                              // Handle date + endDate + fallback texts
                              item.date || item.endDate ? (
                                <>
                                  {item.date
                                    ? moment(item.date).isValid()
                                      ? moment(item.date).format("MMMM D, YYYY")
                                      : "N/A"
                                    : item.dateText || "N/A"}
                                  {item.endDate
                                    ? ` - ${
                                        moment(item.endDate).isValid()
                                          ? moment(item.endDate).format(
                                              "MMMM D, YYYY"
                                            )
                                          : "N/A"
                                      }`
                                    : item.endDateText
                                    ? ` - ${item.endDateText}`
                                    : ""}
                                </>
                              ) : (
                                item.dateText || item.endDateText || "N/A"
                              )
                            ) : key === "finalExamDate" ? (
                              item.finalExamDate ? (
                                moment(item.finalExamDate).isValid() ? (
                                  moment(item.finalExamDate).format(
                                    "MMMM D, YYYY"
                                  )
                                ) : (
                                  "N/A"
                                )
                              ) : (
                                item.finalExamDateText || "N/A"
                              )
                            ) : key === "lastDateOfClass" ? (
                              item.lastDateOfClass ? (
                                moment(item.lastDateOfClass).isValid() ? (
                                  moment(item.lastDateOfClass).format(
                                    "MMMM D, YYYY"
                                  )
                                ) : (
                                  "N/A"
                                )
                              ) : (
                                item.lastDateOfClassText || "N/A"
                              )
                            ) : null
                          ) : key === "description" || key === "event" ? (
                            !isEffectivelyEmpty(item[key]) ? (
                              renderDescriptionManually(item[key])
                            ) : (
                              "-"
                            )
                          ) : !isEffectivelyEmpty(item[key]) ? (
                            item[key]
                          ) : (
                            "N/A"
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={visibleKeys.length}>
                      No calendar dates available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div>{renderSafeHTML(selectedSemester?.shortNote)}</div>
      </section>
    </div>
  );
};

export default CalendarDetailsList;
