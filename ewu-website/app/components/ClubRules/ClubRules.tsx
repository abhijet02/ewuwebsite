"use client";

//import { clubActivityData, clubObjectiveData } from "@lib/utils/data";
import "./ClubRules.scss";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const ClubRules: React.FC = () => {
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <>
      <section className="clubs-rules-part">
        <div className="container">
          <div
            {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
            className="major-activities"
          >
            <div>
              <h2>We Pave the Way-</h2>
              {/* <ul>
                {clubObjectiveData.map((item) => (
                  <li key={item.id}>{item.text}</li>
                ))}
              </ul> */}
            </div>
            <div>
              <h2>We Perform Through-</h2>
              {/* <ul>
                {clubActivityData.map((item) => (
                  <li key={item.id}>{item.text}</li>
                ))}
              </ul> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClubRules;
