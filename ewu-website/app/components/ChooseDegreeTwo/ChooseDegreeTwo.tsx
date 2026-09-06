"use client";

import { FC } from "react";
import { Icon } from "@iconify/react";
import "./ChooseDegreeTwo.scss";

const ChooseDegreeTwo: FC = () => {
  return (
    <div className="second-choose-degree-and-scholarship-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-card">
              <h4 className="mb-3">
                Chose Your <span className="design-text">Degree</span>
              </h4>
              <div className="btn-group">
                <button type="button" className="choose-btn ">
                  Undergraduate
                </button>
                <button type="button" className="choose-btn">
                  Graduate
                </button>
                <button type="button" className="choose-btn ">
                  Diploma
                </button>
              </div>
              <select className="form-select mb-3">
                <option selected>Find Your Degree</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <p className="application-deadline">
                Application Deadline:
                <span className="date-space">30 March 2025</span>
              </p>
              <div className="d-flex justify-content-between mb-3">
                <a href="#" className="some-links">
                  Admission Eligibility
                </a>
                <a href="#" className="some-links">
                  Tuition free
                </a>
                <a href="#" className="some-links">
                  Program Details
                </a>
              </div>
              <button className="apply-online-btn">
                Apply Online{" "}
                <Icon
                  className="dates-arrow"
                  icon="eva:diagonal-arrow-right-up-outline"
                  width="18"
                  height="18"
                />
              </button>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="section-card for-adjust">
              <h4 className="text-center mb-4">
                Chose Your Suitable{" "}
                <span className="design-text">Schorship</span>
              </h4>
              <div className="btn-group">
                <button type="button" className="right-choose-btn ">
                  Future Students
                </button>

                <button type="button" className="right-choose-btn ">
                  Ongoing Students
                </button>
              </div>
              <div className="row g-2 mb-4">
                <div className="col">
                  <label className="form-label apply-text">
                    S.S.C/ O Level
                  </label>
                  <select className="form-select">
                    <option>Select CGPA</option>
                  </select>
                </div>
                <div className="col">
                  <label className="form-label apply-text">
                    H.S.C / A Level
                  </label>
                  <select className="form-select">
                    <option>Select CGPA</option>
                  </select>
                </div>
                <div className="col">
                  <label className="form-label apply-text">
                    Diploma / Equivalent
                  </label>
                  <select className="form-select">
                    <option>Select CGPA</option>
                  </select>
                </div>
              </div>
              <div className="right-end-contents">
                <p className="waiver-text">30% Weaver on CGPA 4.90</p>
                <button className="apply-online-btn">
                  <Icon
                    className="calculator-space-right"
                    icon="heroicons:calculator"
                    width="22"
                  />
                  Calculator{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseDegreeTwo;
