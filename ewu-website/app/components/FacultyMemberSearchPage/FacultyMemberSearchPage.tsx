"use client";

import "./FacultyMemberSearchPage.scss";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { FacultyPerson } from "@lib/services/facultyPerson/facultyPerson.service.type";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import Placeholder_Person from "@/app/assets/Placeholder_Person.jpg";

const ITEMS_PER_PAGE = 8; // 4 per row x 2 rows

const FacultyMemberSearchPage: React.FC = () => {
  const { facultys, departments, designations, facultyPersons } =
    useDepartmentData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFacultyId, setSelectedFacultyId] = useState(0);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
  const [hasFiltered, setHasFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /** 🔹 Filter faculty members */
  const filteredfacultyPersons = useMemo(() => {
    let filtered = facultyPersons || [];

    if (selectedFacultyId === 0 && selectedDepartmentId === 0 && !searchTerm) {
      return facultyPersons || [];
    }

    if (searchTerm) {
      filtered = filtered.filter((facultyPerson) =>
        facultyPerson.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFacultyId > 0) {
      filtered = filtered.filter(
        (facultyPerson) => facultyPerson.facultyId === selectedFacultyId
      );
    }

    if (selectedDepartmentId > 0) {
      filtered = filtered.filter(
        (facultyPerson) => facultyPerson.departmentId === selectedDepartmentId
      );
    }

    return filtered;
  }, [facultyPersons, selectedFacultyId, selectedDepartmentId, searchTerm]);

  /** 🔹 Total pages */
  const totalPages = useMemo(
    () => Math.ceil(filteredfacultyPersons.length / ITEMS_PER_PAGE),
    [filteredfacultyPersons.length]
  );

  /** 🔹 Paginated faculty members */
  const paginatedFaculty = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredfacultyPersons.slice(start, end);
  }, [filteredfacultyPersons, currentPage]);

  /** 🔹 Department filtering */
  const filteredDepartments = departments?.filter(
    (dept) => selectedFacultyId === 0 || dept.facultyId === selectedFacultyId
  );

  /** 🔹 Actions */
  const handleFilter = () => {
    setHasFiltered(true);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSelectedFacultyId(0);
    setSelectedDepartmentId(0);
    setSearchTerm("");
    setHasFiltered(false);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    const newPage = Math.max(1, Math.min(totalPages, page));
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /** 🔹 Reset department when faculty changes */
  useEffect(() => {
    setSelectedDepartmentId(0);
  }, [selectedFacultyId]);

  return (
    <section className="mt-5">
      <div className="container">
        <div>
          <h2>Search Faculty Member</h2>
        </div>

        <div className="faculty-search-page-filter-part">
          <input
            type="text"
            placeholder="Search By Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={selectedFacultyId}
            onChange={(e) => setSelectedFacultyId(parseInt(e.target.value))}
          >
            <option value={0}>Select a Faculty</option>
            {facultys?.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>
                {faculty.name}
              </option>
            ))}
          </select>

          <select
            value={selectedDepartmentId}
            onChange={(e) => setSelectedDepartmentId(parseInt(e.target.value))}
          >
            <option value={0}>Select a Department</option>
            {filteredDepartments?.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>

          <button onClick={handleFilter}>
            <Icon icon="mdi:filter-outline" width="20" height="20" />
            Filter
          </button>
          <button onClick={handleClear}>
            <Icon icon="mdi:close-circle-outline" width="20" height="20" />
            Clear
          </button>
        </div>

        {/* Faculty Grid */}
        {paginatedFaculty.length > 0 ? (
          <div
            {...(!isStatic ? { "data-aos": "fade-up" } : {})}
            className="faculty-grid"
          >
            {paginatedFaculty.map((item) => (
              <div key={item.id} className="faculty-search-page-profile-card">
                <div className="faculty-search-page-profile-card-media">
                  <div>
                    <Image
                      src={item.photo || Placeholder_Person}
                      fill
                      alt={item.name}
                    />
                  </div>
                  <div className="faculty-search-page-profile-card-social-links">
                    <div className="faculty-search-page-profile-card-social-icon">
                      {item.liLink && (
                        <a href={item.liLink}>
                          <Icon
                            icon="ri:linkedin-fill"
                            width="18"
                            height="18"
                          />
                        </a>
                      )}
                      {item.gsLink && (
                        <a href={item.gsLink}>
                          <Icon
                            icon="academicons:google-scholar"
                            width="20"
                            height="20"
                          />
                        </a>
                      )}
                    </div>
                    <Link href={`/pages/faculty-member/${item.slug}`}>
                      <button>
                        Details
                        <Icon
                          icon="si:arrow-right-duotone"
                          width="24"
                          height="24"
                        />
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="faculty-search-page-profile-card-info">
                  <p>{facultys?.find((f) => f.id === item.facultyId)?.name}</p>
                  <h2>{item.name}</h2>
                  <p>
                    {
                      designations?.find(
                        (designation) =>
                          designation.id.toString() === item.designation
                      )?.designation
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          hasFiltered && (
            <div
              {...(!isStatic ? { "data-aos": "fade-up" } : {})}
              className="no-results-found text-center my-5"
            >
              <p>No faculty members found.</p>
            </div>
          )
        )}

        {/* Pagination (Same as NoticeAll) */}
        {totalPages > 1 && (
          <div className="custome-pagination text-center my-4">
            {/* Prev button */}
            <button
              className="page-btn arrow-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Icon icon="ep:arrow-left" width="20" height="20" />
            </button>

            {/* Page numbers with ellipsis */}
            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;

              const isVisible =
                page === 1 ||
                page === 2 ||
                page === totalPages ||
                page === totalPages - 1 ||
                (page >= currentPage - 1 && page <= currentPage + 1);

              const isDotsAfterSecond = page === 3 && currentPage > 4;
              const isDotsBeforeSecondToLast =
                page === totalPages - 2 && currentPage < totalPages - 3;

              if (isVisible) {
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
              } else if (isDotsAfterSecond || isDotsBeforeSecondToLast) {
                return (
                  <span key={i} className="dots">
                    ...
                  </span>
                );
              }

              return null;
            })}

            {/* Next button */}
            <button
              className="page-btn arrow-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Icon icon="ep:arrow-right" width="20" height="20" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FacultyMemberSearchPage;
