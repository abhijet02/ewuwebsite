"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import "./StudentFacultyRatio.scss";
import StudentFacultySvg from "./StudentFacultySvg";

const StudentFacultyRatio: React.FC = () => {
  return (
    <div className="student-faculty-ratio">
      <div className="student-faculty-ratio-header">
        <h4>Student Faculty Ratio</h4>
      </div>
      <div className="student-faculty-ratio-content-body mt-3">
        <div className="student-faculty-ratio-content">
          <h2>29:1</h2>
          <h6>29 student per 1 faculty</h6>
        </div>
        <div className="svg-wrapper">
          <StudentFacultySvg className={`svg-of-student`} />
        </div>
      </div>
    </div>
  );
};

export default StudentFacultyRatio;
