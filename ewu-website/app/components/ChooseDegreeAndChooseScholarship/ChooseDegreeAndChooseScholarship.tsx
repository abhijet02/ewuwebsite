"use client";

import ChooseDegree from "@/app/components/ChooseDegree/ChooseDegree";
import ChooseScholarship from "@/app/components/ChooseScholarship/ChooseScholarship";
import "./ChooseDegreeAndChooseScholarship.scss";

const ChooseDegreeAndChooseScholarship: React.FC = () => {
  return (
    <div className="second-choose-degree-and-scholarship-section">
      <section className="search-course">
        <div className="container">
          <div className="row">
            <ChooseDegree />
            <ChooseScholarship />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChooseDegreeAndChooseScholarship;
