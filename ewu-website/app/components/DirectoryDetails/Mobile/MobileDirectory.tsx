"use client";

import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import { useOfficeData } from "@lib/hooks/useOfficeData";
import { FC, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import "./MobileDirectory.scss";

const MobileDirectory: FC = () => {
  const { offices, officeMembers } = useOfficeData();
  const { designations, departments, facultyPersons } = useDepartmentData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const [activeOffice, setActiveOffice] = useState<number | null>(null);
  const [activeDepartment, setActiveDepartment] = useState<number | null>(null);

  const toggleOffice = (id: number) => {
    setActiveOffice(activeOffice === id ? null : id);
    setActiveDepartment(null);
  };

  const toggleDepartment = (id: number) => {
    setActiveDepartment(activeDepartment === id ? null : id);
    setActiveOffice(null);
  };

  const renderMembers = (members: any[]) => {
    if (!members?.length) return <p>No member found!</p>;

    return (
      <div className="row g-4 p-3">
        {members.map((member, index) => {
          const photo =
            "profilePhotoUrl" in member
              ? member.profilePhotoUrl
              : member?.photo;

          return (
            <div
              {...(!isStatic
                ? {
                    "data-aos":
                      typeof window !== "undefined" && window.innerWidth < 800
                        ? "fade-up"
                        : index % 3 === 0
                        ? "fade-right"
                        : index % 3 === 1
                        ? "zoom-in"
                        : "fade-left",
                  }
                : {})}
              key={member?.id}
              className="col-lg-4 col-md-6 col-12"
            >
              <div className="member-card">
                <div className="member-photo">
                  <Image
                    src={photo || "/placeholder.jpg"}
                    alt={member?.name}
                    fill
                    className="img-fluid rounded-circle"
                  />
                </div>
                <h6>{member?.name}</h6>
                <p>
                  {"designation" in member
                    ? designations.find(
                        (d) => d.id === parseInt(member.designation)
                      )?.designation || "N/A"
                    : member?.designation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mobile-directory container py-4">
      {/* Offices */}
      <h2 className="mb-3">Administration</h2>
      <div className="accordion mb-4" id="officesAccordion">
        {offices?.map((office) => (
          <div key={office.id} className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${
                  activeOffice === office.id ? "" : "collapsed"
                }`}
                type="button"
                onClick={() => toggleOffice(office.id)}
              >
                {office.title}
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${
                activeOffice === office.id ? "show" : ""
              }`}
            >
              <div className="accordion-body">
                {renderMembers(
                  officeMembers?.filter((m) => m.officeId === office.id) || []
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Departments */}
      <h2 className="mb-3">Faculty Information</h2>
      <div className="accordion" id="departmentsAccordion">
        {departments?.map((dept) => (
          <div key={dept.id} className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${
                  activeDepartment === dept.id ? "" : "collapsed"
                }`}
                type="button"
                onClick={() => toggleDepartment(dept.id)}
              >
                {dept.name}
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${
                activeDepartment === dept.id ? "show" : ""
              }`}
            >
              <div className="accordion-body">
                {renderMembers(
                  facultyPersons?.filter((fp) => fp.departmentId === dept.id) ||
                    []
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileDirectory;
