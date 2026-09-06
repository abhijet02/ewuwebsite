"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import "./AtAGlance.scss";
import StudentFacultyRatio from "./Components/StudentFacultyRatio/StudentFacultyRatio";
import TotalStudent from "./Components/TotalStudent/TotalStudent";
import DepartmentPieChart from "./Components/DepartmentPieChart/DepartmentPieChart";
import ProgramBarChart from "./Components/ProgramBarChart/ProgramBarChart";
import InitialState from "./Components/InitialState/InitialState";
import ConvoBarChart from "./Components/ConvoBarChart/ConvoBarChart";

const AtAGlance: React.FC = () => {
  return (
    <section className="mt-5">
      <div
        style={{
          minHeight: "320px",
          width: "100%",
          position: "relative",
          backgroundImage:
            "url('https://new1.ewubd.edu/backend/uploads/Temporary-Website-Images/at-a-glance.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#1c4370",
            opacity: 0.8,
            zIndex: 1,
          }}
        />{" "}
        <div
          style={{
            position: "relative",
            zIndex: 11,
            border: "2px solid white",
            padding: "12px",
            width: "100%",
            height: "-webkit-fill-available",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h6 style={{ margin: 0 }}>EAST WEST UNIVERSITY</h6>
          <h1 style={{ margin: 0 }}>At a Glance</h1>
        </div>
      </div>

      <InitialState />

      <div className="row g-3 mt-3">
        <div className="col-12 col-sm-12 col-md-12 col-lg-7">
          <TotalStudent />
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-5">
          <StudentFacultyRatio />
        </div>
      </div>
      <div className="row g-3 mt-3">
        <div className="col-12 col-sm-12 col-md-12 col-lg-5">
          <DepartmentPieChart />
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-7">
          <ProgramBarChart />
        </div>
      </div>

      <div className="row g-3 mt-3">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
          <div className="at-a-glance-common-card full-time-faculties">
            <div className="at-a-glance-card-content-header">
              <p className="at-a-glance-count-title">Full time faculties</p>
              <div className="non-teaching-employee-icon-body">
                <Icon icon="wpf:group" width="80px" height="80px" />
              </div>
            </div>
            <p className="at-a-glance-count">346</p>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
          <div className="at-a-glance-common-card non-teaching-employee">
            <p className="at-a-glance-count-title">Non Teaching Employees</p>
            <p className="at-a-glance-count">281</p>
            <div className="non-teaching-employee-icon-body">
              <Icon icon="bi:gear-fill" width="80px" height="80px" />
            </div>
          </div>
        </div>
        <ConvoBarChart />
      </div>
    </section>
  );
};

export default AtAGlance;
