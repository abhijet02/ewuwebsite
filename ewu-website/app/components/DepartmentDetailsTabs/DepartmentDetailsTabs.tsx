"use client";

//import { departmentDetailsTab } from "@lib/utils/data";
import "./DepartmentDetailsTabs.scss";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const DepartmentDetailsTabs: React.FC = () => {
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <>
      <section className="department-details-tabs-part">
        <div className="container">
          <div
            {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
            className="department-details-tabs"
          >
            <div className="details-tabs d-flex">
              <div
                className="nav flex-column nav-pills me-3"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                {/* {departmentDetailsTab.map((item, index) => (
                  <button
                    key={index}
                    className={`nav-link ${item.id === 1 ? "active" : ""}`}
                    id={`v-pills-${item.id}-tab`}
                    data-bs-toggle="pill"
                    data-bs-target={`#v-pills-${item.id}`}
                    type="button"
                    role="tab"
                    aria-controls={`v-pills-${item.id}`}
                    aria-selected="true"
                  >
                    {item.name}
                  </button>
                ))} */}
              </div>
              <div className="tab-content" id="v-pills-tabContent">
                {/* {departmentDetailsTab.map((item, index) => (
                  <div
                    key={index}
                    className={`tab-pane fade ${
                      index === 0 ? "show active" : ""
                    }`}
                    id={`v-pills-${item.id}`}
                    role="tabpanel"
                    aria-labelledby={`v-pills-${item.id}-tab`}
                  >
                    <p>{item.description}</p>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DepartmentDetailsTabs;
