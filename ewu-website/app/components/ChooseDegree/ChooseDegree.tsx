"use client";

import "./ChooseDegree.scss";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useChooseDegreeData } from "@lib/hooks/useChooseDegreeData";

const ChooseDegree: React.FC = () => {
  const { degrees, programs } = useChooseDegreeData();

  const [selectedDegreeId, setSelectedDegreeId] = useState(null);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(
    null
  );

  // Set the first degree as default if none selected
  useEffect(() => {
    if (degrees?.length > 0 && selectedDegreeId === null) {
      // length of degreees is greater than 0 and no degree has been selected yet
      // set the first degree as default
      setSelectedDegreeId(degrees[0].id);
    }
  }, [degrees, selectedDegreeId]);
  // this useEffect runs only once --> On initial render (when degrees first loads)

  // Select program from filtered programs
  const selectedDegree = degrees?.find(
    (degree) => degree.id === Number(selectedDegreeId)
  );

  // Filter programs based on selected degree
  const filteredPrograms = programs?.filter(
    (program) => program.programCategoryId === selectedDegreeId
  );

  // Select program from filtered programs
  const selectedProgram = filteredPrograms?.find(
    (program) => program.id === Number(selectedProgramId)
  );
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <div className="col-lg-6 py-2">
      <div
        {...(!isStatic
          ? { "data-aos": window.innerWidth < 800 ? "fade-up" : "fade-right" }
          : {})}
        className="search-part"
      >
        <div className="heading">
          <h5>Choose Your Degree</h5>
          <Link href="https://admission.ewubd.edu/" className="link">
            Apply Online{" "}
            <Icon icon="si:arrow-right-duotone" width="22" height="22" />
          </Link>
        </div>

        <div className="search-input">
          <div className="d-flex w-100 search-tabs-info">
            <div
              className="nav flex-column nav-pills gap-3 me-3"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              {degrees?.map((item, index) => (
                <button
                  key={index}
                  className={`nav-link ${
                    index === 0 || selectedDegreeId === item.id ? "active" : ""
                  }`}
                  id={`v-pills-${index}-tab`}
                  data-bs-toggle="pill"
                  data-bs-target={`#v-pills-${index}`}
                  type="button"
                  role="tab"
                  aria-controls={`v-pills-${index}`}
                  aria-selected={index === 0 ? "true" : "false"}
                  onClick={() => setSelectedDegreeId(item.id)}
                >
                  {item.title}
                </button>
              ))}
            </div>

            <div className="tab-content w-100" id="v-pills-tabContent">
              <div
                className="tab-pane fade show active h-100"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
                tabIndex={0}
              >
                <div className="cours-degree-wrapper">
                  <select
                    className="form-select"
                    aria-label="Program select dropdown"
                    onChange={(e) => setSelectedProgramId(e.target.value)}
                    value={selectedProgramId ?? ""}
                  >
                    <option disabled value="">
                      {selectedDegreeId
                        ? "Select a Program"
                        : "Find Your Degree"}
                    </option>
                    {filteredPrograms?.map((program) => (
                      <option key={program.id} value={program.id}>
                        {program.title}
                      </option>
                    ))}
                  </select>
                  <p style={{ padding: "4px" }}>
                    Application Deadline:{" "}
                    <span>
                      {selectedProgram?.admissionDeadline
                        ? moment(selectedProgram?.admissionDeadline).format(
                            "DD MMMM, YYYY"
                          )
                        : "Select a Program first!"}
                    </span>
                  </p>
                  <div className="cours-degree-link">
                    {selectedProgram && (
                      <Link
                        href={`/pages/admission-eligibility/${selectedProgram?.id}`}
                      >
                        Admission Eligibility
                      </Link>
                    )}
                    {selectedProgram && (
                      <Link
                        href={`/pages/tuition-fees?category=${selectedDegree.title}&program=${selectedProgram.id}`}
                      >
                        Tuition Fee
                      </Link>
                    )}
                    {selectedProgram && (
                      <Link
                        href={`/pages/program-details/${selectedProgram?.id}`}
                      >
                        Program Details
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseDegree;
