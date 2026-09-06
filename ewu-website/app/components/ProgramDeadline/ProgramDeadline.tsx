"use client";

import { useFacultyData } from "@lib/hooks/useFacultyData";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import "./ProgramDeadline.scss";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";

const ProgramDeadline: FC = () => {
  const { programCategories, programs } = useFacultyData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const searchParams = useSearchParams();
  const pageParams = searchParams.get("degree");

  const selectedProgramCategory = programCategories?.find(
    (program) => program?.title.toString() === pageParams?.toString()
  );

  const selectedPrograms = programs?.filter(
    (program) => program?.programCategoryId === selectedProgramCategory?.id
  );

  // utility formatter
  const formatDateTime = (dateInput: string | Date) => {
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;

    const day = date?.getDate().toString().padStart(2, "0");
    const month = date?.toLocaleString("en-US", { month: "long" });
    const year = date?.getFullYear();

    const time = date?.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${day} ${month}, ${year} at ${time}`;
  };

  return (
    <section className="program">
      <div
        {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
        className="container"
      >
        <h2 className="program-title">
          {`${selectedProgramCategory?.title} Admission`}
        </h2>
      </div>

      <div
        {...(!isStatic ? { "data-aos": "fade-up" } : {})}
        className="academic-partner-main"
      >
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Program</th>
                <th scope="col">Semester</th>
                <th scope="col">Application Deadline</th>
                <th scope="col">Date of Admission Test</th>
              </tr>
            </thead>
            <tbody>
              {selectedPrograms && selectedPrograms.length > 0 ? (
                selectedPrograms?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.title}</td>
                    <td>{item?.semester}</td>
                    <td>
                      {item?.admissionDeadline
                        ? formatDateTime(item?.admissionDeadline)
                        : item?.admissionDeadlineText}
                    </td>
                    <td>
                      {item?.dateOfaddissionTest
                        ? formatDateTime(item?.dateOfaddissionTest)
                        : item?.dateOfadmissionTestText}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProgramDeadline;
