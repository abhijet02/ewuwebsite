"use client";

import "./Syndicate.scss";
import React from "react";
import Image from "next/image";
import { useOfficeData } from "@lib/hooks/useOfficeData";

const Syndicate: React.FC = () => {
  const { filteredOfficeMembers } = useOfficeData();
  console.log(filteredOfficeMembers);

  if (!filteredOfficeMembers || filteredOfficeMembers.length === 0) {
    return null;
  }

  // Separate chairperson(s) and members
  const chairpersons = filteredOfficeMembers.filter(
    (member) => member.isheadOfOffice === "YES"
  );
  const members = filteredOfficeMembers.filter(
    (member) =>
      member.isheadOfOffice === "NO" && member.isMemberSecretary === "NO"
  );
  const memberSecretery = filteredOfficeMembers.filter(
    (member) => member.isMemberSecretary === "YES"
  );
  return (
    <div className="syndicate-part">
      <div className="container">
        {/* Chairperson Section */}
        {chairpersons.length > 0 && (
          <>
            <div className="syndicate-header-title-line">
              <h4 style={{ margin: 0 }}>Chairperson</h4>
              <div className="line" />
            </div>
            <div className="row g-3 syndicate-row">
              {chairpersons.map((member) => (
                <div
                  className="col-12 col-sm-12 col-md-12 col-lg-6"
                  key={member.id}
                >
                  <div className="syndicate-card">
                    <div className="syndicate-image">
                      <Image src={member.profilePhotoUrl} alt="" fill />
                    </div>
                    <div className="syndicate-info">
                      <h6>{member.name}</h6>
                      <div className="syndicate-detail">
                        <p>{member.designation}</p>
                      </div>
                      <div className="syndicate-org">
                        <p>{member.designationText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Members Section */}
        {members.length > 0 && (
          <>
            <div className="syndicate-header-title-line">
              <h4 style={{ margin: 0 }}>Members</h4>
              <div className="line" />
            </div>
            <div className="syndicate-row">
              <div className="row g-3">
                {members.map((member) => (
                  <div
                    className="col-12 col-sm-12 col-md-12 col-lg-6"
                    key={member.id}
                  >
                    <div className="syndicate-card">
                      <div className="syndicate-image">
                        <Image src={member.profilePhotoUrl} alt="Name" fill />
                      </div>
                      <div className="syndicate-info">
                        <h6>{member.name}</h6>
                        <div className="syndicate-detail">
                          <p>{member.designation}</p>
                        </div>
                        <div className="syndicate-org">
                          <p>{member.designationText}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {memberSecretery.length > 0 && (
          <>
            <div className="syndicate-header-title-line">
              <h4 style={{ margin: 0 }}>Member Secretery</h4>
              <div className="line" />
            </div>
            <div className="row g-3">
              {memberSecretery.map((member) => (
                <div
                  className="col-12 col-sm-12 col-md-12 col-lg-6"
                  key={member.id}
                >
                  <div className="syndicate-card">
                    <div className="syndicate-image">
                      <Image src={member.profilePhotoUrl} alt="Name" fill />
                    </div>
                    <div className="syndicate-info">
                      <h6>{member.name}</h6>
                      <div className="syndicate-detail">
                        <p>{member.designation}</p>
                      </div>
                      <div className="syndicate-org">
                        <p>{member.designationText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Syndicate;
