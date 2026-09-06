"use client";

import { FC } from "react";
import "./ScholarshipFinancialAid.scss";

const ScholarshipFinancialAid: FC = () => {
  return (
    <>
      <div style={{ margin: "40px 0" }}>
        <h3 className="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-gray-300 pb-2">
          Generous Scholarships and Financial Assistance: 11 Crores
        </h3>

        <h5 className="text-gray-700 mb-3">Annual scholarships</h5>

        <div className="mb-6">
          <h6 className="font-semibold text-gray-800 mb-2">
            Types of Scholarships:
          </h6>
          <ul
            className="list-disc list-inside text-gray-700 space-y-1"
            style={{ listStyle: "disc" }}
          >
            <li>Merit Scholarship of Different Categories</li>
            <li>Trustee’s Scholarship</li>
          </ul>
        </div>

        <div>
          <h6 className="font-semibold text-gray-800 mb-2">
            Financial Assistance:
          </h6>
          <ul
            className="list-disc list-inside text-gray-700 space-y-1"
            style={{ listStyle: "disc" }}
          >
            <li>General</li>
            <li>Family Concession</li>
            <li>Freedom Fighter’s Scholarship</li>
            <li>The Medha Lalon Fund</li>
            <li>Assistance for EWU Employees</li>
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-gray-300">
          Scholarships and Financial Assistance (Effective from Spring Semester
          2025 onwards)
        </h4>
        <p className="text-gray-700 leading-relaxed mb-5">
          Since its inception, East West University has been awarding merit
          scholarships and need-based financial assistance to deserving
          students. Each year, the university distributes around 9% of its total
          earnings among 20% or more of its regular students. According to the
          provision of the Private University Act, 2010, private universities
          are required to provide scholarships to 6 (six) percent of their
          enrolled students who are meritorious but come from less well-to-do
          families (of which 3 percent is reserved for the wards of freedom
          fighters). Since its inception, the founders of East West University
          have adopted a policy of not paying any profit or dividend to
          themselves and of using a good proportion of its operating surplus
          towards nurturing merit and providing financial support to students in
          need. In the last twenty-seven years, the scholarship and financial
          assistance policy adopted by East West University has become a source
          of great encouragement to meritorious and financially constrained
          students.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-gray-300 mb-3 border-b pb-2">
        Benefits to students are awarded in the following ways:
      </h3>

      <section className="pb-5">
        {/* Tab Navigation */}
        <ul className="nav nav-tabs" id="scholarshipTabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="merit-tab"
              data-bs-toggle="tab"
              data-bs-target="#merit"
              type="button"
              role="tab"
              aria-controls="merit"
              aria-selected="true"
            >
              Merit Scholarships
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="trustee-tab"
              data-bs-toggle="tab"
              data-bs-target="#trustee"
              type="button"
              role="tab"
              aria-controls="trustee"
              aria-selected="false"
            >
              Trustee's Scholarship
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="financial-tab"
              data-bs-toggle="tab"
              data-bs-target="#financial"
              type="button"
              role="tab"
              aria-controls="financial"
              aria-selected="false"
            >
              Financial Assistance
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="employee-tab"
              data-bs-toggle="tab"
              data-bs-target="#employee"
              type="button"
              role="tab"
              aria-controls="employee"
              aria-selected="false"
            >
              Benefit for EWU Employees
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="medha-tab"
              data-bs-toggle="tab"
              data-bs-target="#medha"
              type="button"
              role="tab"
              aria-controls="medha"
              aria-selected="false"
            >
              The Medha Lalon Scholarship
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div
          className="tab-content p-4 border border-top-0"
          id="scholarshipTabsContent"
        >
          <div
            className="tab-pane fade show active"
            id="merit"
            role="tabpanel"
            aria-labelledby="merit-tab"
          >
            <p>
              EWU has generous merit scholarships and financial assistance
              programs. Due to the crisis caused by the COVID-19 pandemic and
              emergent financial constraints of many students, particularly
              their parents/guardians, the East West University (EWU) authority
              provided a 20% waiver on tuition and remission of the Student
              Activity Fee to all students since Spring 2020. This 20% waiver of
              tuition continued until 2023.
            </p>

            <p>
              In addition, a sum of Taka 22,87,61,468/- (Twenty Two Crore Eighty
              Seven Lac Sixty One Thousand Four Hundred and Sixty Eight) was
              awarded in 2023–2024.
            </p>

            <p>
              Full-year tuition waiver merit scholarships (for a maximum of
              one-fourth of the total credit requirements of the program for
              undergraduate students) were awarded to:
            </p>

            <p>
              (i) Top scorers in undergraduate admission tests with a minimum
              score of 75% marks: 5 (five) from the Faculty of Business and
              Economics, 4 (four) from the Faculty of Sciences and Engineering,
              and 2 (two) from the Faculty of Liberal Arts and Social Sciences.
              Top scorers in graduate admission tests with a minimum score of
              75% marks: One from MBA program provided that at least 20 students
              get admitted to the program. The continuation of this scholarship
              is contingent upon maintaining a minimum CGPA of 3.50 and abiding
              by the rules and regulations and the University’s Code of Conduct
              at all times.
            </p>

            <p>
              (ii) Candidates securing A+ in all subjects (including the 4th
              subject) in the most recent SSC & HSC examinations will be awarded
              100% Tuition-Free Merit Scholarship at entry level in
              Undergraduate Programs for 4 (four) years. This is subject to
              qualifying in the admission test, maintaining a minimum GPA of
              3.50 in each semester as a regular student (all undergraduate
              students must register at least 3 courses (9 credits) in a
              semester; this credit requirement is 4 courses (12 credits) in a
              semester for B.Pharm and LL.B Programs), and abiding by the rules,
              regulations, and Code of Conduct of the University.
            </p>

            <p>
              (iii) Candidates securing 7 (seven) A’s in O-level Examination (at
              one sitting) and 3 (three) A’s in A-level Examination (in one
              year) will be awarded 100% Tuition-Free Merit Scholarship at entry
              level in Undergraduate Programs for 4 (four) years, subject to the
              same terms as point (ii).
            </p>

            <p>
              (iv) District Quota: One poor and meritorious student from each
              district securing GPA 5.00 in the most recent SSC and HSC
              examination will be awarded a full-tuition free Merit Scholarship
              with lodging for four years of undergraduate study at EWU. This is
              subject to qualifying in the admission test. The scholarship will
              continue with a minimum CGPA of 2.60 and compliance with the
              University’s Code of Conduct.
            </p>

            <p>
              (v) Candidates scoring GPA 5.00 (including the 4th subject) in SSC
              (2022) and HSC (2024) will be awarded 50% tuition waiver as Merit
              Scholarship at entry level for the first 1 (one) year. Conditions
              include: a) Qualifying in the EWU Admission Test, b) Maintaining a
              minimum GPA of 3.50 in each semester as a regular student (same
              course credit requirements as above), and c) Abiding by the
              University Disciplinary Code.
            </p>

            <p>
              (vi) 100% Tuition-Free Merit Scholarship will be awarded to
              students who receive an undergraduate degree from EWU with a CGPA
              of 4.00 for a maximum of two years of study in Graduate Programs
              at EWU. This is subject to maintaining a CGPA of 3.50 and regular
              student status. Students from public universities with first
              classes in both Honors and Masters may also qualify on a
              case-by-case basis.
            </p>

            <p>
              (vii) A committee has been formed to assess and recommend
              scholarships/financial aid to students from overseas and different
              educational backgrounds.
            </p>

            <p>
              (viii) Top 10% of students (from each batch of each department
              enrolled in the immediate past year) who have completed at least
              one-fourth of the undergraduate credit requirements and achieved a
              CGPA of 3.90 or above will receive full-tuition Merit Scholarships
              for an equal number of credits, to be adjusted over the next three
              consecutive semesters. If only 6 or fewer students qualify, only
              the top student will receive this scholarship.
            </p>

            <p>
              The number of awards per batch will be rounded up if the fraction
              is 0.5 or above. Merit Scholarships are extendable, provided
              students continue to meet the requirements. All undergraduate
              students must register at least 3 courses (9 credits) per semester
              (4 courses/12 credits for B.Pharm and LL.B Programs). Scholarships
              will be discontinued if a student violates the Disciplinary Code
              or if their CGPA drops below 3.50 based on the last one year of
              academic performance.
            </p>
            <p style={{ fontWeight: "bold" }}>
              Scholarship Requirement for Graduate Programs for the students
              admitted in Spring 2024 and onward are as follows:
            </p>

            <p className="mb-1">
              <span style={{ fontWeight: "bold" }}>a.</span> Bachelor degree
              with CGPA 4.00 out of 4.00 from EWU and other reputed
              universities: 100% scholarship will be awarded to complete the
              graduation within the stipulated time.
            </p>

            <p className="mb-1">
              <span style={{ fontWeight: "bold" }}>b. </span> Bachelor degree
              with CGPA 3.90-3.99 out of 4.00 from EWU and other reputed
              universities: 75% scholarship will be awarded to complete the
              graduation within the stipulated time.
            </p>

            <p className="mb-1">
              <span style={{ fontWeight: "bold" }}>c.</span>Bachelor degree with
              CGPA 3.80-3.89 out of 4.00 from other reputed universities: 50%
              scholarship will be awarded to complete the graduation within the
              stipulated time.
            </p>

            <p className="mb-1">
              <span style={{ fontWeight: "bold" }}>d.</span>To continue the
              scholarship a minimum CGPA of 3.50 must be maintained in each
              semester as a regular student (must register at least 06 credits
              in each semester) during the above period.
            </p>

            <p>
              The application of other reputed universities will be assessed and
              recommended by EWU.
            </p>
          </div>

          <div
            className="tab-pane fade"
            id="trustee"
            role="tabpanel"
            aria-labelledby="trustee-tab"
          >
            <p>
              A Trustee member may award 500% tuition fee waiver to five
              students (100% each) or more than five students distributing this
              500% at his/her discretion in each semester or a Trustee member
              may award a maximum of up to 45 credits tuition fee waiver in each
              semester or higher as per requirements under his/her discretionary
              quota. The unutilized credits of any semester can be carried
              forward to other semester(s) within the same academic calendar
              year.
            </p>
          </div>

          <div
            className="tab-pane fade"
            id="financial"
            role="tabpanel"
            aria-labelledby="financial-tab"
          >
            <p>
              <span style={{ fontWeight: "bold" }}>(a) General</span>
              <br />
              At the beginning of each semester, the university considers
              applications on prescribed forms for granting financial assistance
              to deserving students on a need-cum-merit basis. Undergraduate
              applicants who have completed at least 12 credits in the immediate
              past semester with a minimum CGPA of 2.60 and with demonstrated
              financial need are offered financial assistance to cover part of
              the tuition fees. The actual amount depends on the number of
              applicants and the availability of funds. This is by far the
              largest component of the funding support both in terms of the
              amount of money as well as the number of recipients. Financial
              assistance is also extendable on the fulfilment of the above
              mentioned requirements.
              <br />
              <br />
              <p>
                Similarly, applicants of graduate programs who have completed 6
                credits in the immediate past semester with a minimum CGPA of
                2.80 and have proof of financial need are offered financial
                assistance to cover part of the tuition fees.
              </p>
            </p>

            <p>
              <span style={{ fontWeight: "bold" }}>(b) Family Concession</span>
              <br />
              When two siblings (sons and/or daughters of the same parents) and
              husband-wife study simultaneously at East West University, the
              second sibling/spouse is entitled to a half-tuition fee waiver.
              However, both must be admitted full-time into regular programs and
              both the sibling/ husband-wife must study within the normal study
              time (the stipulated time for completing a degree) required for
              the programs in which they are enrolled. The benefit commences on
              the date of admission of the second sibling/ spouse and ceases on
              the discontinuation of the study of any one of them in EWU, after
              his/her Graduation/Dismissal/ Suspension/Voluntary Withdrawal etc.
              or for any other reasons. This benefit may be extended up to the
              third sibling under the above-mentioned conditions.
              <br />
              <br />
              If either of the siblings/spouses maintains a minimum CGPA of
              2.60, while the other maintains a minimum passing CGPA (2.00 up to
              summer 2023), (2.25 from Fall 2023 and onward) for Undergraduate
              Programs, 2.60 for Graduate Programs, the sibling/spouse benefit
              will be awarded and continued for the one who maintains the CGPA
              of 2.60. In the case of the newly admitted students, if the first
              sibling/spouse can maintain the minimum CGPA of 2.60. the
              sibling/spouse benefit would be awarded to the second
              sibling/spouse provided the first sibling/ spouse is not currently
              receiving any merit scholarship/ financial assistance from EWU.
              When both the siblings/ husband-wife (both are newly admitted
              students) are admitted in the first semester at a time,
              sibling/spouse benefit will be awarded to the second
              sibling/spouse without applying the credit and CGPA requirements
              for them in the first semester. Credit and CGPA requirements will
              be applicable for them from the second semester. Scholarship /
              Financial Assistance / Sibling / Spouse benefits or any other
              financial benefits at EWU are not awarded simultaneously.
              <br />
              <br />
              However, a winner of the Merit Scholarship may enjoy the
              Scholarship by surrendering the sibling/spouse or other benefits.
              i.e. any one out of two siblings/husband-wife will be entitled to
              get either merit scholarship (if eligible) or half tuition fee
              waiver or financial assistance (if eligible) whichever they
              prefer. The benefit will be awarded at the time of registration of
              courses of both the siblings/husband-wife.
            </p>

            <p>
              <span style={{ fontWeight: "bold" }}>
                (c) Freedom Fighters’ Scholarship
              </span>
              <br />
              As a mark of respect to the valiant Freedom Fighters of the War of
              Liberation and Independence, the university reserves 3% admission
              quota for the wards of Freedom Fighters of all categories, subject
              to their fulfilment of the minimum admission requirements at East
              West University. The university also considers maximum 100%
              tuition waiver scholarship to the wards of wounded, deceased and
              financially distressed Freedom Fighters, subject to the fulfilment
              of the following requirements:
              <br />
              <br />
              The candidate must qualify in the EWU admission test; the
              candidate must provide proof that his/her parent was a Freedom
              Fighter. The tuition fee waiver as above will then be continued
              provided that the CGPA in each semester remains 2.60 or more.
              <br />
              <br />
              To continue financial assistance, (all Undergraduate students must
              register at least 3 courses (9 credits) in a semester; this credit
              requirement is 4 courses (12 credits) in a semester for the
              students of B.Pharm and LL.B Programs), and for the students of
              graduate programs this requirement is at least two courses (6
              credits). Financial assistance is discontinued if any student of
              the undergraduate or the graduate program violates the East West
              University Disciplinary Code for Students.
              <br />
              <br />
              Such types of scholarships/ financial assistance, including family
              concession and freedom fighter scholarships, are not available to
              those students who have already spent the regular study time
              required for the programs for which they are enrolled (e.g.
              Bachelor’s degree program students are not eligible for any
              scholarship/financial aid beyond the four years that are required
              to complete the course as a regular student). Students, who have
              already completed the required minimum total credits for a degree,
              will not be eligible for any scholarship/ financial assistance.
              Students availing the advantage of retaking any course any time
              will not be eligible for any scholarship. No student of the
              university is entitled to benefit from more than one
              scholarships/financial assistance schemes at any point in time.
            </p>
          </div>

          <div
            className="tab-pane fade"
            id="employee"
            role="tabpanel"
            aria-labelledby="employee-tab"
          >
            <p>
              If the children of the employees of EWU study at EWU, only one
              child of an employee will be granted 50% tuition fee waiver during
              the entire tenure of the employee’s service at EWU subject to the
              fulfillment of admission and all other criteria. Granting of this
              tuition fee waiver will be effective on admission of the student
              but its continuation will be subject to the fulfillment of
              financial assistance requirements.
              <br />
              <br />
              Employees of EWU who study at EWU will be granted 50% tuition fee
              waiver but they have to maintain a minimum passing CGPA of the
              respective degree/ program for continuation of the financial
              benefit which is provided by the university. Other academic and
              financial aid requirements which are applicable to the students
              will also be applicable to the employees of EWU. Like other
              students, employees of EWU who study at EWU have to register for
              minimum course/credits in each semester. Financial benefit which
              is provided by the university to its employees for studying at EWU
              will continue until the respective employees remain in service at
              EWU.
            </p>
          </div>

          <div
            className="tab-pane fade"
            id="medha"
            role="tabpanel"
            aria-labelledby="medha-tab"
          >
            <p>
              In order to be able to extend further support towards nurturing
              merit, particularly to the students from middle-class background,
              to the female students, and to the students from outside the
              metropolis, the Board of Directors of East West University set up
              in 2002 a scheme called the East West University Medha Lalon Fund
              with an initial endowment of Taka one and a half crore. The Board
              has also sanctioned an amount of Taka one crore thirty lakhs from
              the operating surplus of the university for the Fund. This is in
              addition to the disbursement each year of regular components such
              as the merit scholarships and financial assistance. Several
              philanthropic persons/ organizations have contributed a combined
              amount of Taka twenty-seven and a half lakh to the Medha Lalon
              Fund. This needcum-merit based financial assistance is awarded
              from the annual earnings of the East West University Medha Lalon
              Fund deposited in a lucrative five-year interest earning
              Scholarship Deposit Account of Mercantile Bank Ltd.
              <br />
              <br />
              The CGPA requirement for awarding the Dean’s List Scholarship is
              3.75 (Taka 55,000 is awarded to each eligible student which is to
              be adjusted in the next one year) and the CGPA requirement for
              awarding Medha Lalon Scholarship is 3.50 (Taka 45,000 is awarded
              to each eligible student which is to be adjusted in the next one
              year). To be eligible for Dean’s List and Medha Lalon Scholarship
              a student of the undergraduate program must earn credits as
              mentioned in the Table-1, in the last one year.
              <br />
              <br />
              For continuation of this Dean’s List and Medha Lalon Scholarship
              (all Undergraduate students must register at least 3 courses (9
              credits) in a semester; this credit requirement is 4 courses (12
              credits) in a semester for the students of B.Pharm and LL.B
              Programs). This scholarship is discontinued if any student of the
              undergraduate programs violates the East West University
              Disciplinary Code for students and/or if his/her CGPA falls below
              2.75 calculated based on the grades earned in the last one year.
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .nav-tabs .nav-link.active {
          background-color: #aa4a44 !important;
          color: white !important;
          border-color: #aa4a44 !important;
        }

        .nav-tabs .nav-link {
          color: #aa4a44;
          font-weight: 500;
        }

        .nav-tabs .nav-link:hover {
          color: #aa4a44;
          background-color: #f8f9fa;
        }
      `}</style>
    </>
  );
};

export default ScholarshipFinancialAid;
