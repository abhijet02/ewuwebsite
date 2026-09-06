"use client";

import "./FacultyMemberListShort.scss";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import Placeholder_Person from "@/app/assets/Placeholder_Person.jpg";
import Link from "next/link";
import { YesOrNo } from "@lib/services/facultyPerson/facultyPerson.service.type";
import { useViewAllLink } from "@lib/hooks/useViewAllLink";

const FacultyMemberListShort: React.FC = ({}) => {
  const {
    departments,
    designations,
    department,
    adjFilteredDeptFacultyPersons,
    facultys,
  } = useDepartmentData();
  const viewAllLink = useViewAllLink({
    componentName: "FacultyMemberListShort",
  });

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <section className="department-faculty-member">
      <div className="container">
        <div className="header-with-view-all-button">
          <h2>Faculty Members</h2>
          <Link href={viewAllLink || ""} className="for-all-view-all-button">
            View All
            <Icon icon="si:arrow-right-duotone" width="20" height="20" />
          </Link>
        </div>

        <div className="row">
          {adjFilteredDeptFacultyPersons
            ?.slice(0, 9)
            .sort((a, b) => {
              // onLeave NO → first ; onLeave YES → last
              if (a.onLeave === YesOrNo.NO && b.onLeave === YesOrNo.YES)
                return -1;
              if (a.onLeave === YesOrNo.YES && b.onLeave === YesOrNo.NO)
                return 1;
              return 0;
            })
            .map((dfm, index) => {
              // 🔹 Add this inside the map so you have dfm context
              const facultyName = facultys?.find(
                (f) => f.id === dfm.facultyId
              )?.name;

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
                  key={dfm?.id}
                  className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 my-2"
                >
                  <div className="faculty-member-card">
                    {/* Faculty image */}
                    <div className="faculty-member-img">
                      <>
                        <Image
                          src={dfm?.photo || Placeholder_Person}
                          fill
                          sizes="100vw"
                          alt="Faculty Member Photo"
                          style={{
                            objectFit: "cover",
                            objectPosition: "top",
                            filter:
                              dfm?.onLeave === YesOrNo.YES
                                ? "grayscale(100%)"
                                : "none",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            zIndex: 2,
                          }}
                        />
                      </>
                      {dfm?.onLeave === YesOrNo.YES && (
                        <div className="faculty-member-badge">
                          {dfm?.onLeaveText ?? "On Leave"}
                        </div>
                      )}
                    </div>

                    {/* Faculty info */}
                    <div className="faculty-member-info">
                      <div className="card-item-memb">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            width: "100%",
                            height: "100%",
                            marginTop: "12px",
                          }}
                        >
                          <div>
                            <h2 style={{ textAlign: "left" }}>{dfm?.name}</h2>
                            <p>
                              {
                                designations?.find(
                                  (designation) =>
                                    designation.id ===
                                    parseInt(dfm?.designation.toString())
                                )?.designation
                              }
                            </p>

                            {dfm?.isProctor === YesOrNo.YES && (
                              <p className="extra-designation">& Proctor</p>
                            )}
                            {dfm?.isAssProctor === YesOrNo.YES && (
                              <p className="extra-designation">
                                & Asst. Proctor
                              </p>
                            )}
                            {dfm?.isDean === YesOrNo.YES && (
                              <p className="extra-designation">& Dean</p>
                            )}
                            {dfm?.isChairperson === YesOrNo.YES && (
                              <p className="extra-designation">& Chairperson</p>
                            )}

                            <p className="faculty-member-department">
                              {
                                departments?.find(
                                  (department) =>
                                    department.id === dfm?.departmentId
                                )?.name
                              }
                            </p>
                          </div>

                          {/* Contact */}
                          <div>
                            <div
                              className={`${
                                dfm?.onLeave === YesOrNo.YES
                                  ? "on-leave-faculty-member-contact"
                                  : "faculty-member-contact"
                              }`}
                            >
                              <Icon icon="quill:mail" width="18" height="18" />
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: "12px",
                                  textTransform: "lowercase",
                                }}
                              >
                                {dfm?.email}
                              </p>
                            </div>
                            <div
                              className={`${
                                dfm?.onLeave === YesOrNo.YES
                                  ? "on-leave-faculty-member-contact"
                                  : "faculty-member-contact"
                              }`}
                            >
                              <Icon icon="bx:phone" width="18" height="18" />
                              <p style={{ margin: 0, fontSize: "12px" }}>
                                09666775577 {dfm?.ext && `(Ext: ${dfm?.ext})`}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* View Profile */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            width: "100%",
                          }}
                        >
                          <div className="faculty-view-button">
                            <a href={`/pages/faculty-member/${dfm?.slug}`}>
                              View Profile{" "}
                              <Icon
                                icon="basil:arrow-right-solid"
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
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default FacultyMemberListShort;
