"use client";

import React from "react";
import "./CalendarAttachmentAccordion.scss";
import { useAppSelector } from "@lib/hooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import { handleDownload } from "@lib/utils/download";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CalendarAttachmentAccordionProps {
  semesterId?: number;
}

const CalendarAttachmentAccordion: React.FC<
  CalendarAttachmentAccordionProps
> = ({ semesterId }) => {
  const semsterCalender = useAppSelector(
    (state) =>
      state.semesterCalender.getSemesterCalendersResponse?.SemesterCalenders
  );

  // Filter attachments by semesterId if provided
  const filteredCalendars = semesterId
    ? semsterCalender?.filter((item) => item.id === semesterId)
    : semsterCalender;

  return (
    <>
      <ToastContainer />
      {filteredCalendars && filteredCalendars.length > 0 ? (
        filteredCalendars.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => handleDownload(item.attachmentUrl)}
              className="academic-calender-download-button"
            >
              <Icon icon="bytesize:download" width="20" height="20" />
              Download
            </button>
          </div>
        ))
      ) : (
        <p>No attachments found.</p>
      )}
    </>
  );
};

export default CalendarAttachmentAccordion;
