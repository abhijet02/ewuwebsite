"use client";

import Image from "next/image";
import "./DeanMessage.scss";
import {
  /*renderSafeHTML,*/ stripHTMLAndLimitWords,
} from "@lib/utils/html2text";
import { useFacultyData } from "@lib/hooks/useFacultyData";
import { YesOrNo } from "@lib/services/facultyPerson/facultyPerson.service.type";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const DeanMessage: React.FC = () => {
  const {
    //faculty,
    facultys,
    facultyPersons,
    dean,
    deanFaculty,
    deanDesignation,
    deanDepartment,
  } = useFacultyData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);
  const isLoading =
    !facultys ||
    !facultyPersons ||
    !dean ||
    !deanDesignation ||
    !deanDepartment;

  return (
    <section className="faculty-message-part">
      <div
        {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
        className="container"
      >
        <div className="faculty-header">
          <h2>Message from Dean</h2>
        </div>

        <div className="row">
          {isLoading ? (
            <>
              {/* Left side skeleton (photo + info) */}
              <div className="col-lg-4">
                <div className="faculty-head-info">
                  <div
                    className="skeleton skeleton-img"
                    style={{ marginBottom: "40px" }}
                  ></div>
                  <div
                    className="skeleton skeleton-title"
                    style={{ width: "70%" }}
                  ></div>
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: "50%", marginTop: "8px" }}
                  ></div>
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: "80%", marginTop: "8px" }}
                  ></div>
                  <div
                    className="skeleton skeleton-btn"
                    style={{
                      width: "60%",
                      height: "36px",
                      marginTop: "16px",
                      borderRadius: "6px",
                    }}
                  ></div>
                </div>
              </div>

              {/* Right side skeleton (message text) */}
              <div className="col-lg-8">
                <div className="faculty-message-text">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="skeleton skeleton-text"
                      style={{
                        width: `${100 - i * 5}%`,
                        height: "16px",
                        marginBottom: "12px",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Left side real content */}
              <div className="col-lg-4">
                <div className="faculty-head-info">
                  <div
                    className="faculty-head-img"
                    style={{ marginBottom: "40px" }}
                  >
                    <Image
                      src={dean?.photo}
                      width={350}
                      height={350}
                      alt="Dean Photo"
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                  </div>
                  <h2>{dean?.name}</h2>
                  <div className="faculty-head-contact">
                    <h3 style={{ margin: 0 }}>
                      {deanDesignation?.designation}
                    </h3>
                    {dean?.isChairperson === YesOrNo.YES && (
                      <p style={{ margin: 0 }}>Chairperson of the</p>
                    )}
                    <p style={{ margin: 0 }} className="dean-department-name">
                      {deanDepartment?.name}
                    </p>
                  </div>
                  <div className="mt-3 mb-3">
                    <a
                      href={`/pages/faculty-member/${dean?.slug}`}
                      style={{
                        background: "#1c4370",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        color: "#FFF",
                      }}
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </div>

              {/* Right side real message */}
              <div className="col-lg-8">
                <div className="faculty-message-text">
                  <span style={{textAlign:"justify"}}>
                    {stripHTMLAndLimitWords(dean?.message)
                      .toString()
                      .slice(0, 1200)}
                    ...
                    <a
                      href={`/pages/faculty-member/${dean?.slug}`}
                      style={{ color: "#aa4a44", fontWeight: 800 }}
                    >
                      View Full
                    </a>
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default DeanMessage;
