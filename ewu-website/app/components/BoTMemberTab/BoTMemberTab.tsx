"use client";

import "./BoTMemberTab.scss";
import { renderSafeHTML, stripHTMLAndLimitWords } from "@lib/utils/html2text";
import { useOfficeMemberData } from "@lib/hooks/useOfficeMemberData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useMemo } from "react";

const BoTMemberTab: React.FC = () => {
  const { officeMember } = useOfficeMemberData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const facultyDetails = useMemo(() => {
    return [
      {
        id: 1,
        name: "Message",
        description:
          officeMember?.message?.trim() &&
          stripHTMLAndLimitWords(officeMember.message, 5).trim()
            ? renderSafeHTML(officeMember.message)
            : null,
      },
      {
        id: 2,
        name: "Work Experience",
        description:
          officeMember?.previousWorkExperience?.trim() &&
          stripHTMLAndLimitWords(officeMember.previousWorkExperience, 5).trim()
            ? renderSafeHTML(officeMember.previousWorkExperience)
            : null,
      },
      {
        id: 3,
        name: "Education",
        description:
          officeMember?.educationDescription?.trim() &&
          stripHTMLAndLimitWords(officeMember.educationDescription, 5).trim()
            ? renderSafeHTML(officeMember.educationDescription)
            : null,
      },
      {
        id: 4,
        name: "Career",
        description:
          officeMember?.careerDescription?.trim() &&
          stripHTMLAndLimitWords(officeMember.careerDescription, 5).trim()
            ? renderSafeHTML(officeMember.careerDescription)
            : null,
      },
    ].filter((item) => item?.description);
  }, [officeMember]);

  if (!facultyDetails.length) return null;

  return (
    <section
      className="department-details-tabs-part"
      {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
    >
      <div className="department-details-list">
        {facultyDetails.map((item) => (
          <div key={item.id} className="department-detail-item">
            <div className="department-detail-title-line">
              <h3 className="department-detail-title">{item.name}</h3>
              <div className="line" />
            </div>
            <div className="department-detail-description">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BoTMemberTab;
