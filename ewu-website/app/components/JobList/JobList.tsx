"use client";

import { useState } from "react";
import Header from "./Header/Header";
import List from "./List/List";
import "./JobList.scss";
import { useJobData } from "@lib/hooks/useJobData";
import { useOfficeData } from "@lib/hooks/useOfficeData";
import { Icon } from "@iconify/react";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";

const JobList: React.FC = () => {
  const { jobList } = useJobData();
  const { departments } = useDepartmentData();
  const { offices } = useOfficeData();

  // Filter criteria
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOfficeId, setSelectedOfficeId] = useState(0);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);

  // Clear filters
  const handleClear = () => {
    setSearchTerm("");
    setSelectedOfficeId(0);
    setSelectedDepartmentId(0);
  };

  // Filter jobs
  const filteredJobList =
    jobList?.filter((job) => {
      const officeMatch = selectedOfficeId
        ? job.officeId === selectedOfficeId
        : true;
      const departmentMatch = selectedDepartmentId
        ? job.departmentId === selectedDepartmentId
        : true;
      const titleMatch = searchTerm
        ? job.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return officeMatch && departmentMatch && titleMatch;
    }) || [];

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const jobLength = filteredJobList?.length || 0;
  const totalPages = Math.max(1, Math.ceil(jobLength / jobsPerPage));

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobList?.slice(indexOfFirstJob, indexOfLastJob);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ margin: "40px 0px" }}>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedOfficeId={selectedOfficeId}
        setSelectedOfficeId={setSelectedOfficeId}
        offices={offices || []}
        selectedDepartmentId={selectedDepartmentId}
        setSelectedDepartmentId={setSelectedDepartmentId}
        departments={departments || []}
        onClear={handleClear}
      />

      <div className="container">
        <List jobs={currentJobs} offices={offices || []} />

        {/* ✅ New Pagination */}
        {jobLength > 0 && (
          <div className="custome-pagination text-center my-4">
            {/* Prev button */}
            <button
              className="page-btn arrow-btn"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <Icon icon="ep:arrow-left" width="20" height="20" />
            </button>

            {/* Page numbers with dots */}
            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;
              if (
                page === 1 ||
                page === 2 ||
                page === totalPages ||
                page === totalPages - 1 ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={i}
                    className={`page-btn ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                );
              } else if (
                (page === 3 && currentPage > 4) ||
                (page === totalPages - 2 && currentPage < totalPages - 3)
              ) {
                return (
                  <span key={i} className="dots">
                    ...
                  </span>
                );
              } else {
                return null;
              }
            })}

            {/* Next button */}
            <button
              className="page-btn arrow-btn"
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              <Icon icon="ep:arrow-right" width="20" height="20" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
