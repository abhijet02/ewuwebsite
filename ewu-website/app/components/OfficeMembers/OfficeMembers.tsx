"use client";

import "./OfficeMembers.scss";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useOfficeData } from "@lib/hooks/useOfficeData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { YesOrNo } from "@lib/services/officeMember/officeMember.service.type";
import PlaceholderAvatar from "public/male.png";

const OfficeMembers = () => {
  const { members } = useOfficeData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  // Filter members into their respective categories
  const generalMembers =
    members?.filter(
      (member) =>
        member.isAssProctor === YesOrNo.NO &&
        member.isOfficeMember === YesOrNo.NO &&
        member.isSupportMember === YesOrNo.NO
    ) || [];
  const assProctors =
    members?.filter((member) => member.isAssProctor === YesOrNo.YES) || [];
  const officeMembers =
    members?.filter((member) => member.isOfficeMember === YesOrNo.YES) || [];
  const supportMembers =
    members?.filter((member) => member.isSupportMember === YesOrNo.YES) || [];

  const renderMembers = (membersArray) => {
    return (
      <div className="row g-3">
        {membersArray.map((member, index) => (
          <div
            key={index}
            className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12"
          >
            <div
              {...(!isStatic
                ? {
                    "data-aos":
                      index % 3 === 0
                        ? "fade-right"
                        : index % 3 === 1
                        ? "zoom-in"
                        : "fade-left",
                  }
                : {})}
            >
              <div className="office-member-card">
                <div className="office-member-card-media">
                  <Image
                    src={member?.profilePhotoUrl || PlaceholderAvatar}
                    fill
                    alt="Member Photo"
                    style={{
                      filter:
                        member?.onLeave === YesOrNo.YES
                          ? "grayscale(100%)"
                          : "none",
                    }}
                  />
                  {member?.onLeave === YesOrNo.YES && (
                    <div className="office-member-badge">
                      {member?.onLeaveText === null
                        ? "On Leave"
                        : member?.onLeaveText}
                    </div>
                  )}
                </div>
                <div className="office-member-info">
                  <div className="office-membet-info-details">
                    <h2>{member?.name}</h2>
                    <p>{member?.designation}</p>
                    <p>{member?.designationText}</p>
                  </div>
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0,
                      }}
                    >
                      {member?.email && member?.isBoT !== YesOrNo.YES && (
                        <div className="office-member-contact">
                          <Icon
                            icon="material-symbols:mail-outline-rounded"
                            width="18"
                            height="18"
                          />
                          <p className="email">{member?.email}</p>
                        </div>
                      )}
                      <div className="office-member-contact">
                        <Icon icon="bx:phone" width="18" height="18" />
                        <p style={{ margin: 0, fontSize: "14px" }}>
                          09666775577{" "}
                          {member?.ext && `(Ext:${" "}${member?.ext})`}
                        </p>
                      </div>
                      {member?.location && (
                        <div className="office-member-contact">
                          <Icon icon="mynaui:location" width="18" height="18" />
                          <p style={{ margin: 0, fontSize: "14px" }}>
                            Room No: {member?.location}
                          </p>
                        </div>
                      )}
                    </div>
                    <div
                      className="mt-3"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <a
                        href={`/pages/office-member/${member?.slug}`}
                        className="office-member-view-button"
                      >
                        View Profile
                        <Icon
                          icon="mynaui:arrow-right"
                          className="view-icon"
                          width="20"
                          height="20"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {generalMembers.length > 0 && (
        <div
          className="office-members-part"
          style={{ marginBottom: "40px", marginTop: "40px" }}
        >
          {renderMembers(generalMembers)}
        </div>
      )}

      {assProctors.length > 0 && (
        <div className="office-members-part" style={{ marginBottom: "40px" }}>
          {renderMembers(assProctors)}
        </div>
      )}

      {officeMembers.length > 0 && (
        <div className="office-members-part" style={{ marginBottom: "40px" }}>
          {renderMembers(officeMembers)}
        </div>
      )}

      {supportMembers.length > 0 && (
        <div className="office-members-part" style={{ marginBottom: "40px" }}>
          {renderMembers(supportMembers)}
        </div>
      )}
    </>
  );
};

export default OfficeMembers;
