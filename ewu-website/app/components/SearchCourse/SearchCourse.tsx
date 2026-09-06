"use client";

import "./SearchCourse.scss";
import Image from "next/image";
import ImgIcon from "@/app/assets/search-course/search-courses.png";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useSearchCourseCardData } from "@lib/hooks/useSearchCourseCardData";
const SearchCourse: React.FC = () => {
  const { departments, programCategories, programs } = useDepartmentData();
  const { searchCourseCardData } = useSearchCourseCardData();
  const router = useRouter();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const [searchKeyword, setSearchKeyword] = useState("");

  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    number | null
  >(null);

  const [selectedProgramCategoryId, setSelectedProgramCategoryId] = useState<
    number | null
  >(null);

  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(
    null
  );

  const handleSearch = () => {
    if (
      selectedDepartmentId &&
      selectedProgramCategoryId &&
      selectedProgramId
    ) {
      // Create query parameters
      const queryParams: Record<string, string> = {
        departmentId: selectedDepartmentId.toString(),
        programCategoryId: selectedProgramCategoryId.toString(),
        programId: selectedProgramId.toString(),
      };

      // Only add keyword if it has at least 3 characters
      if (searchKeyword.trim().length >= 3) {
        queryParams.keyword = searchKeyword.trim();
      }

      const searchParams = new URLSearchParams(queryParams);

      // Navigate to course list page with search parameters
      router.push(
        `/pages/course-details/${selectedProgramId}?${searchParams.toString()}`
      );
    }
  };

  // Search is enabled when all dropdowns are selected
  // Keyword is optional, but if provided, must be at least 3 characters
  const isSearchEnabled =
    selectedDepartmentId &&
    selectedProgramCategoryId &&
    selectedProgramId &&
    (searchKeyword.length === 0 || searchKeyword.length >= 3);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="search-courses-by-department-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="search-courses-card-part">
                <div className="row">
                  {searchCourseCardData?.length > 0 &&
                    searchCourseCardData?.map((item, index) => (
                      <div
                        {...(!isStatic ? { "data-aos": "fade-up" } : {})}
                        className="col-lg-6 col-md-6 my-2"
                        key={index}
                      >
                        <Link
                          href={item?.link}
                          className="search-courses-card"
                          onClick={scrollToTop}
                        >
                          <Image
                            src={item?.logoLink}
                            width={100}
                            height={100}
                            alt="search icon"
                          />
                          <div style={{textAlign:"center", display:"flex",flexDirection:"column", justifyContent:"center"}}>
                            <h2>{item?.title}</h2>
                            <p style={{textAlign:"center"}}>{item?.subTitle}</p>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div
              {...(!isStatic
                ? {
                    "data-aos":
                      window.innerWidth < 800 ? "fade-up" : "fade-left",
                  }
                : {})}
              className="col-lg-6"
            >
              <div className="my-2 search-courses-by-department-form">
                <h1>Search Courses By Department</h1>
                <div className="text-center">
                  <Image
                    src={ImgIcon}
                    width={135}
                    height={135}
                    alt="search icon"
                  />
                </div>
                <div className="mb-3 d-flex flex-lg-row flex-column gap-4">
                  <select
                    className="form-select"
                    value={selectedDepartmentId ?? ""}
                    onChange={(e) => {
                      const deptId = parseInt(e.target.value);
                      setSelectedDepartmentId(deptId);
                      setSelectedProgramCategoryId(null);
                      setSelectedProgramId(null);
                    }}
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    {departments?.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>

                  <select
                    className="form-select"
                    value={selectedProgramCategoryId ?? ""}
                    onChange={(e) => {
                      const catId = parseInt(e.target.value);
                      setSelectedProgramCategoryId(catId);
                      setSelectedProgramId(null);
                    }}
                  >
                    <option value="" disabled>
                      Select Program Category
                    </option>
                    {programCategories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-flex flex-lg-row flex-column gap-4">
                  <select
                    className="form-select"
                    value={selectedProgramId ?? ""}
                    onChange={(e) =>
                      setSelectedProgramId(parseInt(e.target.value))
                    }
                  >
                    <option value="">Select Program</option>
                    {programs
                      ?.filter(
                        (prog) =>
                          prog.departmentId === selectedDepartmentId &&
                          prog.programCategoryId === selectedProgramCategoryId
                      )
                      .map((prog) => (
                        <option key={prog.id} value={prog.id}>
                          {prog.title}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Search by keyword (enter at least 3 characters)"
                    minLength={3}
                  />
                  {searchKeyword.length > 0 && searchKeyword.length < 3 && (
                    <small className="text-danger">
                      Please enter at least 3 characters to search, or leave
                      empty to show all courses
                    </small>
                  )}
                </div>

                {/* Search Section */}
                <button
                  onClick={handleSearch}
                  disabled={!isSearchEnabled}
                  className={`btn ${
                    isSearchEnabled ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCourse;
