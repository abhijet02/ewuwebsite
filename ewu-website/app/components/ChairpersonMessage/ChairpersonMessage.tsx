"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import "./ChairpersonMessage.scss";
import { stripHTMLAndLimitWords } from "@lib/utils/html2text";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import { YesOrNo } from "@lib/services/department/department.service.type";

const ChairpersonMessage: React.FC = () => {
  const {
    chairperson,
    chairpersonFaculty,
    chairpersonDesignation,
    chairpersonDepartment,
    coordinator,
    coordinatorDepartment,
    coordinatorDesignation,
    department,
  } = useDepartmentData();

  return (
    <div className="chairperson-card">
      <div className="chairperson-header">
        <h2 style={{ margin: 0, fontWeight: 600 }}>
          {department?.isSubDepartment === YesOrNo.YES
            ? `Coordinator`
            : `Chairperson`}
          &apos;s Message
        </h2>
      </div>
      <div className="row g-3 faculty-charperson-card-body">
        <div className="col-12 col-sm-12 col-md-5 col-lg-4">
          <div className="image-wrraper">
            <div
              style={{
                width: "100%",
                height: "100%", // or whatever height you need
                position: "relative", // required for fill
                overflow: "hidden",
              }}
            >
              <Image
                src={
                  department?.isSubDepartment === YesOrNo.YES
                    ? coordinator?.photo
                    : chairperson?.photo
                }
                alt="Chairperson Photo"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "top",
                  borderRadius: "16px",
                  clipPath:
                    "polygon(0% 6%, 6% 6%, 6% 0%, 94% 0%, 94% 6%, 100% 6%, 100% 94%, 94% 94%, 94% 100%, 6% 100%, 6% 94%, 0% 94%)",
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-7 col-lg-8">
          <div
            style={{
              border: "1px solid #ddd",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              height: "100%",
              padding: "16px",
              borderRadius: "12px",
              gap: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "4px",
                flexDirection: "column",
              }}
            >
              <h4 style={{ margin: 0 }}>
                {department?.isSubDepartment === YesOrNo.YES
                  ? coordinator?.name
                  : chairperson?.name}
              </h4>
              <h6 style={{ margin: 0 }}>
                {department?.isSubDepartment === YesOrNo.YES
                  ? coordinatorDesignation?.designation
                  : chairpersonDesignation?.designation}
              </h6>
              <h6 style={{ margin: 0, color: "#aa4a44" }}>
                {department?.isSubDepartment === YesOrNo.YES
                  ? coordinatorDepartment?.name
                  : chairpersonDepartment?.name}
              </h6>
              <h6 style={{ margin: 0, color: "#aa4a44" }}>
                {chairpersonFaculty?.name}
              </h6>
            </div>
            <p style={{ fontSize: "14px" }}>
              {stripHTMLAndLimitWords(
                department?.isSubDepartment === YesOrNo.YES
                  ? coordinator?.message
                  : chairperson?.message,
                90
              )}
            </p>
            <Link
              href={`/pages/faculty-member/${
                department?.isSubDepartment === YesOrNo.YES
                  ? coordinator?.slug
                  : chairperson?.slug
              }`}
              style={{ fontWeight: 700, color: "#aa4a44" }}
            >
              Read More
              <Icon icon="si:arrow-right-duotone" width="20" height="20" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChairpersonMessage;
