"use client";

import "./admissionResult.scss";
import CommonSubBanner from "@/app/components/CommonSubBanner/CommonSubBanner";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import PdfViewer from "@/app/components/PdfViewer/PdfViewer";
import { useAdmissionResultData } from "@lib/hooks/useAdmissionResultData";
import { YesOrNo } from "@lib/services/admissionResult/admissionResult.service.type";
import moment from "moment";
import { useState } from "react";

const AdmissionResult: React.FC = () => {
  const { admissionResults, programCategory, faculties, semesters } =
    useAdmissionResultData();

  // --- PDF Modal State ---
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const handlePreview = (url: string) => {
    setPdfUrl(url);
    setPdfOpen(true);
  };

  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);

  // ----------------- filter logic -----------------
  const filteredResults = admissionResults
    ?.filter(
      (result) =>
        result?.isPublished === YesOrNo.YES && result?.isArchived === YesOrNo.NO
    ) // exclude archived
    ?.filter((result) =>
      selectedProgram ? result?.programCategoryId === selectedProgram : true
    );

  // ----------------- reset filters -----------------
  const clearFilters = () => {
    setSelectedProgram(null);
  };

  // ----------------- grouping utils -----------------
  const groupBySemesterAndYear = (data: any[]) => {
    const grouped: Record<string, any[]> = {};
    data?.forEach((item) => {
      const semesterTitle =
        semesters?.find((s) => s.id === item.semesterId)?.title || "Unknown";
      const key = `${semesterTitle}-${item.year}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    });
    return grouped;
  };

  // ----------------- get faculty with title -----------------
  const getFacultyWithTitle = (item: any) => {
    const facultyName = faculties?.find((f) => f.id === item.facultyId)?.name;

    if (facultyName) {
      return (
        <div>
          <div style={{ fontWeight: 600 }}>{facultyName}</div>
          <div className="faculty-bottom-title">
            ({item?.title}) 
          </div>
        </div>
      );
    }

    return item?.title;
  };

  // ----------------- table render function -----------------
  const renderTable = (data: any[], programLabel: string) => {
    const grouped = groupBySemesterAndYear(data);

    return Object.keys(grouped).map((groupKey) => {
      const [semester, year] = groupKey.split("-");
      return (
        <div key={groupKey} style={{ marginBottom: "32px" }}>
          <div className="table-responsive">
            <table className="table table-bordered table-striped mt-3">
              <thead>
                <tr>
                  <th>
                    Admission Result - {semester} {year} - {programLabel}
                  </th>
                  <th style={{ width: "150px", textAlign: "center" }}>Date</th>
                  <th style={{ width: "120px", textAlign: "center" }}>View</th>
                </tr>
              </thead>
              <tbody>
                {grouped[groupKey]?.map((item) => (
                  <tr key={item.id}>
                    <td>{getFacultyWithTitle(item)}</td>
                    <td style={{ width: "150px", textAlign: "center" }}>
                      {moment(item.publishDate).format("DD MMMM YYYY")}
                    </td>
                    <td style={{ width: "120px", textAlign: "center" }}>
                      <button
                        type="button"
                        className="result-preview-button"
                        onClick={() => handlePreview(item.fileUrl)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    });
  };

  const displayedSemester = filteredResults?.[0]
    ? `${
        semesters?.find((s) => s.id === filteredResults[0].semesterId)?.title
      } ${filteredResults[0].year}`
    : "";

  return (
    <div className="common-page faculty-common-page">
      <Navbar />
      <CommonSubBanner link={["Admission Result"]} title={"Admission Result"} />

      <section style={{ margin: "48px 0px" }}>
        <div className="container">
          <div className="admission-result-title">
            <h2>
              Admission Result
              {displayedSemester && (
                <span> - {displayedSemester}</span>
              )}
            </h2>
          </div>

          {/* Program Filter */}
          <div className="select-grid" style={{ marginBottom: "24px" }}>
            <select
              className="form-select form-select-sm"
              value={selectedProgram ?? ""}
              onChange={(e) =>
                setSelectedProgram(
                  e.target.value ? Number(e.target.value) : null
                )
              }
            >
              <option value="">All Programs</option>
              {programCategory?.map((category) => (
                <option key={category?.id} value={category?.id}>
                  {category?.title}
                </option>
              ))}
            </select>

            <button
              className="btn btn-secondary btn-sm"
              type="button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>

          {/* Tables */}
          <div className="result-box">
            {programCategory?.map((category) => {
              if (selectedProgram && selectedProgram !== category?.id)
                return null;

              const categoryData =
                filteredResults?.filter(
                  (r) => r?.programCategoryId === category?.id
                ) || [];

              // Add this condition to show "No data" message
              if (categoryData?.length === 0) {
                if (selectedProgram === category?.id) {
                  return (
                    <div
                      key={category.id}
                      style={{
                        marginBottom: "32px",
                        textAlign: "center",
                        padding: "20px",
                      }}
                    >
                      No data for {category?.title}
                    </div>
                  );
                }
              }

              return renderTable(categoryData, category?.title);
            })}
          </div>
        </div>
      </section>

      <Footer />

      {/* Pdf Viewer Modal */}
      <PdfViewer
        url={pdfUrl}
        title="PDF Preview"
        open={pdfOpen}
        onClose={() => setPdfOpen(false)}
      />
    </div>
  );
};

export default AdmissionResult;
