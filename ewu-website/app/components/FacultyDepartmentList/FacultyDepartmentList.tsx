"use client";

import "./FacultyDepartmentList.scss";
import DepartmentCard from "@/app/components/DepartmentCard/DepartmentCard";
import { useFacultyData } from "@lib/hooks/useFacultyData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";

const FacultyDepartmentList: React.FC = () => {
  const { faculty, facultyDepartments } = useFacultyData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);
  const isLoading = !facultyDepartments || facultyDepartments.length === 0;

  return (
    <section className="all-department-list-faculty-page">
      <div className="container">
        {!isLoading ? (
          <div className="header-with-subtitle">
            <p>Welcome to the {faculty?.name} at East West University</p>
            <h2>Our Departments</h2>
          </div>
        ) : (
          <div className="header-with-subtitle">
            <div
              className="skeleton skeleton-text"
              style={{ width: "60%" }}
            ></div>
            <div
              className="skeleton skeleton-title skeleton-text"
              style={{ width: "35%" }}
            ></div>
          </div>
        )}
        {!isLoading ? (
          <div className="row">
            {facultyDepartments &&
              facultyDepartments?.map((department, index) => (
                <div
                  {...(!isStatic
                    ? {
                        "data-aos":
                          window.innerWidth < 800
                            ? "fade-up"
                            : index % 3 === 0
                            ? "fade-right"
                            : index % 3 === 1
                            ? "zoom-in"
                            : "fade-left",
                      }
                    : {})}
                  key={department.id}
                  className="col-lg-4 col-md-6 px-3 my-3"
                >
                  <DepartmentCard department={department} />
                </div>
              ))}
          </div>
        ) : (
          <div className="row g-3 mt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={i}>
                <div className="skeleton skeleton-img"></div>
                <div className="skeleton skeleton-title"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FacultyDepartmentList;
