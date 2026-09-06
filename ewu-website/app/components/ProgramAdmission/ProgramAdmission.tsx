"use client";

import { useFacultyData } from "@lib/hooks/useFacultyData";
import { renderSafeHTML } from "@lib/utils/html2text";
import { useParams } from "next/navigation";
import { FC } from "react";
import "./ProgramAdmission.scss";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";

const temporaryContent = `
<div class="col-md-8">
  <p style="text-align: left;">
    <strong>Admission Requirements:</strong>
  </p>

  <p style="text-align: left;">
    <u>General Admission Requirements</u>
  </p>

  <p style="text-align: left;">
    Minimum qualifications for admission to undergraduate programs are as follows:
  </p>

  <ol>
    <li style="text-align: left;">
      Minimum GPA of 3.00 in both SSC and HSC Examinations 
      (Minimum GPA 2.40 in Diploma In Engineering under Bangladesh Technical Education Board). Or
    </li>
    <li style="text-align: left;">
      Candidates must have passed University of London and Cambridge GCE ‘O’ Level in at least five subjects and ‘A’ Level in at least two subjects. 
      Only the best five subjects in ‘O’ Level and best two subjects in ‘A’ Level will be considered. 
      Out of these seven subjects, a candidate must have at least 4B’s or GPA of 4.00 in the four subjects and 3 C’s or GPA of 3.5 in the remaining three subjects. 
      (in the scale of A=5, B=4, C=3, D=2 and E=1). Or
    </li>
    <li style="text-align: left;">American High School Diploma, And</li>
    <li style="text-align: left;">Acceptable EWU Admission Test Score.</li>
    <li style="text-align: left;">
      Total GPA of 5.00 in both SSC and HSC Examinations for the children of Freedom Fighter.
    </li>
    <li style="text-align: left;">
      The final selection of candidates for admission in the Undergraduate Programs at EWU will be based on the Admission Test scores obtained with 
      75% from admission test, 10% from SSC/O-level and 15% from HSC/A-level.
    </li>
  </ol>

  <p style="text-align: left;">
    <u>Admission Requirements for Foreign Students</u><br />
    Foreign Students particularly who come from other systems like US High School Diploma, Indian/Nepalese system etc. 
    (not from SSC/HSC or O/A Level etc. system) the admission eligibility will be as follows:
  </p>

  <ol>
    <li style="text-align: left;">Must be 12 years of schooling.</li>
    <li style="text-align: left;">SAT score of 1100 or</li>
    <li style="text-align: left;">
      Pass with at least upper 50% marks/grade of their own education system.
    </li>
    <li style="text-align: left;">
      Foreign students fulfilling the admission eligibility need not appear at the Admission Test.
    </li>
  </ol>

  <p style="text-align: left;">
    An equivalence committee will assess and recommend for satisfactory grade for the applicants who seek admission in EWU 
    with US High School Diploma or who come from other systems. 
    A committee will assess and recommend for waiver of Admission Test, Scholarship etc. (if applicable) 
    for foreign students and the students from other systems.
  </p>
</div>`;

const ProgramAdmission: FC = () => {
  const { programs } = useFacultyData();

  const params = useParams();

  const selectedProgram = programs?.find(
    (program) => program.id.toString() === params?.id?.toString()
  );

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <section className="program">
      <div
        {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
        className="container"
      >
        <h2 className="program-title">
          Admission Eligibility for {selectedProgram?.title}
        </h2>
        <div>{selectedProgram && renderSafeHTML(temporaryContent)}</div>
      </div>
    </section>
  );
};

export default ProgramAdmission;
