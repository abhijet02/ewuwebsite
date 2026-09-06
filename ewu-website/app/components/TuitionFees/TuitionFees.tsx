"use client";

import "./TuitionFees.scss";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { programActions } from "@lib/slices/program/program.slice";
import { renderSafeHTML } from "@lib/utils/html2text";
import { programCategoryActions } from "@lib/slices/programCategory/programCategory.slice";
import { useSearchParams } from "next/navigation";
import { useFacultyData } from "@lib/hooks/useFacultyData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { usePageData } from "@lib/hooks/usePageData";

const TuitionFees: React.FC = () => {
  const dispatch = useAppDispatch();

  const { departments } = useFacultyData();
  const { pages, page } = usePageData();

  const parmas = useSearchParams();
  // const degree = parmas.get("category");
  // const department = parmas.get("department");
  const program = parmas.get("program");

  const degrees = useAppSelector(
    (state) =>
      state.programCategory.getProgramCategoriesResponse?.programCategories
  );

  const programs = useAppSelector(
    (state) => state.program.getProgramsResponse?.programs
  );

  useEffect(() => {
    dispatch(
      programCategoryActions.getProgramCategories({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );
    dispatch(
      programActions.getPrograms({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );
  }, [dispatch]);

  const degreePageFromPageContentOf = pages.find(
    (p) => p.id === page?.contentOf
  );

  const filteredDegree = degrees?.find(
    (category) =>
      category?.title.toLocaleLowerCase() ===
      degreePageFromPageContentOf?.label.toLocaleLowerCase()
  );

  const filteredDepartment = departments?.find(
    (d) => d.id == page?.departmentId
  );

  // console.log(
  //   "filteredDegree",
  //   filteredDegree,
  //   "filteredDepartment",
  //   filteredDepartment
  // );

  const filteredProgram = programs?.filter((p) => p.id.toString() === program);

  let renderedPrograms = [];

  // CASE 1: neither degree nor department found → show all tuition fees
  if (!filteredDegree && !filteredDepartment) {
    renderedPrograms = programs;
  }
  // CASE 2: degree found, department not found → show all programs of that degree
  else if (filteredDegree && !filteredDepartment) {
    renderedPrograms = programs?.filter(
      (p) => p.programCategoryId === filteredDegree.id
    );
  }
  // CASE 3: department found, degree not found → show all programs of that department
  else if (!filteredDegree && filteredDepartment) {
    renderedPrograms = programs?.filter(
      (p) => p.departmentId == filteredDepartment.id
    );
  }
  // CASE 4: both degree and department found → show programs matching both
  else if (filteredDegree && filteredDepartment) {
    renderedPrograms = programs?.filter(
      (p) =>
        p.programCategoryId === filteredDegree.id &&
        p.departmentId == filteredDepartment.id
    );
  }

  // apply program query param filter if present
  if (program) {
    renderedPrograms = renderedPrograms?.filter(
      (p) => p.id.toString() === program
    );
  }

  // Find the first non-null `termsAndCondition`
  const commonTermsAndConditions =
    renderedPrograms?.find((item) => item.termsAndCondition)
      ?.termsAndCondition || "";

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <section className="academic-partner-part">
      <div className="tution-fees-header">
        <h2>Tuition Fees</h2>
        <h5>Find the Detailed Tuition Fees for Each Program</h5>
      </div>

      <div className="container">
        {(filteredDegree || (!filteredDegree && !filteredDepartment)) && (
          <div
            {...(!isStatic ? { "data-aos": "fade-up" } : {})}
            className="academic-partner-main"
            key={filteredDegree?.id}
          >
            <div className="table-responsive">
              <h3 className="category-title">{filteredDegree?.title}</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Program</th>
                    <th scope="col">Credit</th>
                    <th scope="col">Tuition Fee Per Credit</th>
                    <th scope="col">Tuition Fee</th>
                    <th scope="col">Lab and Activity Fee</th>
                    <th scope="col">Admission Fee</th>
                    <th scope="col">Grand Total</th>
                  </tr>
                </thead>
                <tbody>
                  {renderedPrograms?.map((program, index) => (
                    <tr key={index}>
                      <td>{program.title}</td>
                      <td>
                        {program.credit.toLocaleString("en-US", {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        })}
                      </td>
                      <td>{program.tutionfeePerCredit.toLocaleString()}.00</td>
                      <td>{program.tutionfeeTotal.toLocaleString()}.00</td>
                      <td>{program.labFee.toLocaleString()}.00</td>
                      <td>{program.admissionFee.toLocaleString()}.00</td>
                      <td>
                        {(
                          program.tutionfeeTotal +
                          program.labFee +
                          program.admissionFee
                        ).toLocaleString()}
                        .00
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="prose max-w-none p-4 text-gray-800">
          {renderSafeHTML(commonTermsAndConditions.toString())}
        </div>
      </div>
    </section>
  );
};
export default TuitionFees;
