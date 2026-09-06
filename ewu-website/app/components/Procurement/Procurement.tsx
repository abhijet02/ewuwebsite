"use client";

import "./Procurement.scss";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useProcurementData } from "@lib/hooks/useProcurementData";
import PdfViewer from "../PdfViewer/PdfViewer";

const Procurement: React.FC = () => {
  const { procurementsByYear } = useProcurementData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  // --- PDF Modal State ---
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const handlePreview = (url: string) => {
    setPdfUrl(url);
    setPdfOpen(true);
  };

  // Get years in descending order
  const filteredYearsDesc = procurementsByYear
    ? Object.keys(procurementsByYear).sort((a, b) => Number(b) - Number(a))
    : [];

  // Default year (latest)
  const initialYear = filteredYearsDesc.length
    ? Number(filteredYearsDesc[0])
    : 0;

  const [selectedYear, setSelectedYear] = useState<number>(initialYear);

  useEffect(() => {
    if (
      filteredYearsDesc.length > 0 &&
      !filteredYearsDesc.includes(String(selectedYear))
    ) {
      setSelectedYear(Number(filteredYearsDesc[0]));
    }
  }, [filteredYearsDesc, selectedYear]);

  const currentData = procurementsByYear?.[selectedYear] || [];

  return (
    <section className="procure-section">
      <div {...(!isStatic ? { "data-aos": "zoom-in" } : {})}>
        <div className="procure-container">
          <div className="procure-header">
            {/* Year Selection Dropdown */}
            <div className="procure-year-select">
              <label htmlFor="yearSelect">Select Year:</label>
              <select
                id="yearSelect"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {filteredYearsDesc.map((yearStr) => {
                  const year = Number(yearStr);
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Procurement Data Table */}
          <div className="procure-table-wrapper mt-3">
            {currentData.length > 0 ? (
              <table className="procure-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item) => (
                    <tr key={item?.id}>
                      <td>{item?.title}</td>
                      <td>
                        {item?.fileUrl ? (
                          <button
                            type="button"
                            className="primary-button-contain button-outline"
                            onClick={() => handlePreview(item.fileUrl)}
                          >
                            View
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="procure-no-data">No procurement data available.</p>
            )}
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <PdfViewer
        url={pdfUrl}
        title="PDF Preview"
        open={pdfOpen}
        onClose={() => setPdfOpen(false)}
      />
    </section>
  );
};

export default Procurement;
