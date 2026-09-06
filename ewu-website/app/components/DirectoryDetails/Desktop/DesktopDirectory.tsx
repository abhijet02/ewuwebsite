"use client";

import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import { useOfficeData } from "@lib/hooks/useOfficeData";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import "./DesktopDirectory.scss";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";

const DesktopDirectory: FC = () => {
  const { offices, officeMembers } = useOfficeData();
  const { designations, departments, facultyPersons } = useDepartmentData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const searchParams = useSearchParams();
  const office = searchParams.get("office");
  const department = searchParams.get("department");
  const currentOffice = searchParams.get("office");
  const currentDepartment = searchParams.get("department");

  const members =
    (office &&
      officeMembers?.filter((om) => om?.officeId?.toString() === office)) ||
    (department &&
      facultyPersons?.filter(
        (fp) => fp?.departmentId?.toString() === department
      ));

  return (
    <div>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-3 col-lg-3">
          <div className="sidebar-menu">
            <div className="sidebar-menu-header">
              {office ? <h3>Administration</h3> : <h3>Faculty Information</h3>}
            </div>
            <div className="sidebar-menu-body scrollable">
              {office ? (
                <>
                  {offices?.map((menu, index, arr) => (
                    <div
                      className="sidebar-menu-item"
                      key={`office-${menu.id}`}
                    >
                      <Link
                        className="sidebar-menu-link"
                        href={`/pages/directory-details?office=${menu.id}`}
                        style={{
                          backgroundColor:
                            currentOffice &&
                            parseInt(currentOffice) === menu.id &&
                            "#aa4a44",
                          color:
                            currentOffice &&
                            parseInt(currentOffice) === menu.id &&
                            "#fff",
                        }}
                      >
                        <span>{menu?.title}</span>
                      </Link>

                      {index < arr.length - 1 && (
                        <hr className="sidebar-divider" />
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {departments?.map((item, index, arr) => (
                    <div
                      className="sidebar-menu-item"
                      key={`department-${item.id}`}
                    >
                      <Link
                        className="sidebar-menu-link"
                        href={`/pages/directory-details?department=${item.id}`}
                        style={{
                          backgroundColor:
                            currentDepartment &&
                            parseInt(currentDepartment) == item.id &&
                            "#aa4a44",
                          color:
                            currentDepartment &&
                            parseInt(currentDepartment) == item.id &&
                            "#fff",
                        }}
                      >
                        <span>{item?.name}</span>
                      </Link>

                      {index < arr.length - 1 && (
                        <hr className="sidebar-divider" />
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-9 col-lg-9">
          <div className="row">
            {members?.length > 0 ? (
              members?.map((member, index) => {
                const photo =
                  "profilePhotoUrl" in member
                    ? member.profilePhotoUrl
                    : member?.photo;

                return (
                  <div
                    {...(!isStatic
                      ? {
                          "data-aos":
                            window.innerWidth < 800
                              ? "fade-up"
                              : index % 3 === 0
                              ? "fade-right"
                              : index % 3 === 1
                              ? "zoom-in"
                              : "fade-left",
                        }
                      : {})}
                    key={member?.id}
                    className="col-lg-4 col-md-4 col-sm-6 col-12"
                    style={{ margin: "48px 0px" }}
                  >
                    <div className="syndicate-card">
                      <div className="syndicate-image">
                        <Image src={photo || "/placeholder.jpg"} alt="" fill />
                      </div>
                      <div className="syndicate-info">
                        <h6>{member?.name}</h6>
                        {office ? (
                          <div className="syndicate-detail">
                            <p>{member?.designation}</p>
                          </div>
                        ) : (
                          <div className="syndicate-detail">
                            <p>
                              {designations.find(
                                (d) => d.id === parseInt(member.designation)
                              )?.designation || "N/A"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No member found!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopDirectory;
