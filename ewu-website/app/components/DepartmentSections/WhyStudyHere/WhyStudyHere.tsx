"use client";

import "./WhyStudyHere.scss";
import Image from "next/image";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import Placeholder from "../../../../public/placeholder.png";

const WhyStudyHere: React.FC = () => {
  const { departmentWhyChooses } = useDepartmentData();
  if (!departmentWhyChooses || departmentWhyChooses.length === 0) return null;

  const getImageSrc = (url?: string, index?: number) => {
    if (url && url.trim() !== "") return url;
    return Placeholder;
  };

  return (
    <div className="why-study-wrapper">
      <div className="container">
        <div className="header-with-subtitle">
          <p>Why Choose East west university for Your Future?</p>
          <h2>Beyond Textbooks, Towards a Successful Future</h2>
        </div>
      </div>

      <div className="row g-0 why-study-row">
        {departmentWhyChooses?.map((item, index) => (
          <div className="col-12 col-sm-12 col-md-4 col-lg-3 p-0" key={index}>
            <div className="why-card">
              <Image
                src={getImageSrc(item?.photoUrl, index)}
                alt={`${item?.label} Image`}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="why-overlay" />
              <div className="why-title">{item?.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyStudyHere;
