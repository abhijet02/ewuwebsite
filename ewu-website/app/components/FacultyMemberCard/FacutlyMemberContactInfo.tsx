"use client";
import { Icon } from "@iconify/react";
import { YesOrNo } from "@lib/services/facultyPerson/facultyPerson.service.type";

interface FacultyPerson {
  ext?: string;
  email?: string;
  roomNo?: string;
  isBoT?: string;
}

interface FacultyMemberContactInfoProps {
  facultyPerson: FacultyPerson;
}

const FacultyMemberContactInfo: React.FC<FacultyMemberContactInfoProps> = ({
  facultyPerson,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
        margin: "16px 0px",
      }}
    >
      {facultyPerson?.email && facultyPerson?.isBoT !== YesOrNo.YES && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            width: "100%",
          }}
        >
          <Icon
            icon="material-symbols:mail-outline-rounded"
            width="20"
            height="20"
            style={{ color: "#aa4a44" }}
          />

          <p style={{ margin: 0, fontSize: "14px" }}>{facultyPerson.email}</p>
        </div>
      )}

      {facultyPerson?.ext && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            width: "100%",
          }}
        >
          <Icon
            icon="solar:phone-outline"
            width="20"
            height="20"
            style={{ color: "#aa4a44" }}
          />

          <p style={{ margin: 0, fontSize: "14px" }}>
            09666775577 (Ext:{" "} {facultyPerson.ext})
          </p>
        </div>
      )}

      {facultyPerson?.roomNo && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            width: "100%",
          }}
        >
          <Icon
            icon="mynaui:location"
            width="20"
            height="20"
            style={{ color: "#aa4a44" }}
          />

          <p style={{ margin: 0, fontSize: "14px" }}>
            Room No: {facultyPerson.roomNo}
          </p>
        </div>
      )}
    </div>
  );
};

export default FacultyMemberContactInfo;
