"use client";

import "./TotalStudent.scss";

const TotalStudent: React.FC = () => {
  const total = 16000;
  const undergrad = 15000;
  const postgrad = 750;

  const uPct = (undergrad / total) * 100;

  // Utility to format numbers
  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(0)}k+`;
    return `${num}+`;
  };

  return (
    <div className="ratio-bar-wrapper">
      <div className="ration-bar-wrapper-header">
        <h4>Total Students</h4>
      </div>
      <div style={{ height: "72%", padding: "0px 24px 12px 24px" }}>
        <h2>{formatNumber(total)}</h2>
        <div>
          <div className="ratio-bar">
            <div
              className="ratio-line undergrad"
              style={{ width: `${uPct}%` }}
            ></div>

            <div
              className="ratio-line postgrad"
              style={{ width: `${100 - uPct}%` }}
            ></div>
          </div>
          <div className="ratio-labels">
            <span>{formatNumber(undergrad)} Undergraduate</span>
            <span>{formatNumber(postgrad)} Postgraduate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalStudent;
