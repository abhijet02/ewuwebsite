"use client";

import { useOfficeData } from "@lib/hooks/useOfficeData";
import "./Directory.scss";
import Link from "next/link";
import { FC } from "react";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";

const Directory: FC = () => {
  const { offices } = useOfficeData();
  const { departments } = useDepartmentData();

  return (
    <div className="directory-container">
      <div className="directory-header">
        <h2>EWU Directory</h2>
        <p>Find administrative offices and faculty departments below</p>
      </div>

      <div className="directory-wrapper">
        <div className="sidebar-menu-wrapper">
          <h3 className="title">Administration</h3>
          <div className="menu-wrapper">
            {offices
              ?.filter(
                (o) =>
                  o?.title !== "Syndicate" && o?.title !== "Academic Council"
              )
              ?.map((item) => (
                <div className="menu-item" key={item?.id}>
                  <Link
                    className="menu-item"
                    href={`/pages/directory-details?office=${item.id}`}
                  >
                    <span>{item?.title}</span>
                  </Link>
                </div>
              ))}
          </div>
        </div>

        <div className="sidebar-menu-wrapper">
          <h3 className="title">Faculty Information</h3>
          <div className="menu-wrapper">
            {departments?.map((item) => (
              <div className="menu-item" key={item?.id}>
                <Link
                  className="menu-item"
                  href={`/pages/directory-details?department=${item.id}`}
                >
                  <span>{item?.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;
