"use client"

import { useAdmissionResultData } from "@lib/hooks/useAdmissionResultData";
import "./AdmissionResultLive.scss";
import Link from "next/link";

const today = new Date();

const AdmissionResultLive = () => {
  const { nonArchivedAdmissionResults, semesters } = useAdmissionResultData();
  const semesterTitle =
    semesters?.find((s) => s.id === nonArchivedAdmissionResults?.semesterId)
      ?.title || "Unknown";

  // Get year
  const year = nonArchivedAdmissionResults?.year;
  const isLive = new Date(nonArchivedAdmissionResults?.publishDate) <= today;
  // console.log("nonArchivedAdmissionResults",nonArchivedAdmissionResults);

  return (
    <>
      {isLive && (
        <Link className="admission-live-popup" href="/pages/admission-result">
          <div className="admission-live-animation-div">
            <p>Admission Test Results</p>
            <p>
              {semesterTitle} {year}
            </p>
          </div>
        </Link>
      )}
    </>
  );
};
export default AdmissionResultLive;
