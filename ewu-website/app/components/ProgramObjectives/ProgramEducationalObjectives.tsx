"use client";

import "./ProgramObjectives.scss";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const ProgramObjectives: React.FC = () => {
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <div>
      <section className="program-educational-objectives-part">
        <div className="container">
          <div className="program-educational-objectives">
            <div className="program-educational-objectives-header">
              <h2>Program Educational Objectives (PEOs) of CSE Department</h2>
              <p>
                Graduates of the B. Sc. in Computer Science and Engineering
                (CSE) program are expected to attain the following Program
                Educational Objectives (PEO) within few years, such as 3-5
                years, of graduation.
              </p>
            </div>
            <div className="row">
              <div
                {...(!isStatic
                  ? {
                      "data-aos":
                        window.innerWidth < 800 ? "fade-up" : "fade-right",
                    }
                  : {})}
                className="col-lg-4 px-3 my-3"
              >
                <div className="objective-card">
                  <h2>PEO 1</h2>
                  <p>
                    Graduates will establish themselves as leading computational
                    professionals and continue to learn and address evolving
                    challenges in Computer Science and Engineering.
                  </p>
                </div>
              </div>
              <div
                {...(!isStatic ? { "data-aos": "fade-up" } : {})}
                className="col-lg-4 px-3 my-3"
              >
                <div className="objective-card">
                  <h2>PEO 1</h2>
                  <p>
                    Graduates will establish themselves as leading computational
                    professionals and continue to learn and address evolving
                    challenges in Computer Science and Engineering.
                  </p>
                </div>
              </div>
              <div
                {...(!isStatic
                  ? {
                      "data-aos":
                        window.innerWidth < 800 ? "fade-up" : "fade-left",
                    }
                  : {})}
                className="col-lg-4 px-3 my-3"
              >
                <div className="objective-card">
                  <h2>PEO 1</h2>
                  <p>
                    Graduates will establish themselves as leading computational
                    professionals and continue to learn and address evolving
                    challenges in Computer Science and Engineering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramObjectives;
