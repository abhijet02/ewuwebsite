"use client";

import { useState } from "react";
import "./ChooseScholarship.scss";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";

const ChooseScholarship: React.FC = () => {
  const [sscGpa, setSscGpa] = useState("");
  const [hscGpa, setHscGpa] = useState("");
  const [scholarshipMsg, setScholarshipMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"future" | "ongoing">("future"); // new state

  const handleFutStuClick = () => {
    if (sscGpa === "ssc-g" && hscGpa === "hsc-g") {
      setScholarshipMsg("100% Tuition Free Merit Scholarship");
    } else if (sscGpa === "ssc-5" && hscGpa === "hsc-5") {
      setScholarshipMsg("50% Waiver of Tuition Fee as Merit Scholarship");
    } else if (sscGpa === "ssc-5" && hscGpa === "hsc-g") {
      setScholarshipMsg("50% waiver of Tuition Fee as Merit Scholarship");
    } else if (sscGpa === "ssc-g" && hscGpa === "hsc-5") {
      setScholarshipMsg("50% waiver of Tuition Fee as Merit Scholarship");
    } else if (sscGpa === "o-level" && hscGpa === "a-level") {
      setScholarshipMsg("100% Tuition Free Merit Scholarship");
    } else {
      setScholarshipMsg("No Scholarship");
    }
  };

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <div className="col-lg-6 py-2">
      <div
        {...(!isStatic
          ? { "data-aos": window.innerWidth < 800 ? "fade-up" : "fade-left" }
          : {})}
        className="search-part"
      >
        <div className="heading">
          <h5>Choose Your Suitable Scholarship</h5>
        </div>
        <div className="scholarship-tab">
          <button
            onClick={() => setActiveTab("future")}
            className={`scholarship-tab-button ${
              activeTab === "future" ? "active-scholarship-tab-button" : ""
            }`}
          >
            Future Students
          </button>
          <button
            onClick={() => setActiveTab("ongoing")}
            className={`scholarship-tab-button ${
              activeTab === "ongoing" ? "active-scholarship-tab-button" : ""
            }`}
          >
            Ongoing Students
          </button>
        </div>

        <div className="search-input flex-column">
          {/* Tab Content */}
          <div className="tab-content schorship-suitable-tab-content">
            {activeTab === "future" && (
              <div className="row">
                <div className="col-sm-6">
                  <label htmlFor="ssc" className="form-label">
                    S.S.C/O Level
                  </label>
                  <select
                    className="form-select"
                    value={sscGpa}
                    onChange={(e) => setSscGpa(e.target.value)}
                  >
                    <option value="" disabled>
                      Select GPA
                    </option>
                    <option value="ssc-5">GPA 5 (including 4th Subject)</option>
                    <option value="ssc-g">GPA 5 (Golden)</option>
                    <option value="o-level">7 (seven) A</option>
                  </select>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="hsc" className="form-label">
                    H.S.C/A Level
                  </label>
                  <select
                    className="form-select"
                    value={hscGpa}
                    onChange={(e) => setHscGpa(e.target.value)}
                  >
                    <option value="" disabled>
                      Select GPA
                    </option>
                    <option value="hsc-5">GPA 5 (including 4th Subject)</option>
                    <option value="hsc-g">GPA 5 (Golden)</option>
                    <option value="a-level">3 (three) A</option>
                  </select>
                </div>
                <div className="scholarship-footer">
                  <p className="schorship-result">{scholarshipMsg}</p>
                  <button onClick={handleFutStuClick}>
                    Calculate
                    <Icon
                      icon="si:arrow-right-duotone"
                      width="22"
                      height="22"
                    />
                  </button>
                </div>
              </div>
            )}
            {activeTab === "ongoing" && (
              <div>
                <h5>Generous Scholarships and Financial Assistance:</h5>
                <p style={{ fontSize: "14px" }}>
                  Since its inception, East West University has been awarding
                  merit scholarships and need-based financial assistance to
                  deserving students. Each year, the university distributes
                  around 9% of its total earnings among 20% or more of its
                  regular students.
                </p>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Link
                    href={`scholarships-financial-aid`}
                    className="see-scholarship-button"
                  >
                    See Scholarships{" "}
                    <Icon
                      icon="si:arrow-right-duotone"
                      width="22"
                      height="22"
                    />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseScholarship;
