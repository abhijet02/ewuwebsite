"use client";

import Link from "next/link";
import "./DepartmentApply.scss";
import { Icon } from "@iconify/react";

const DepartmentApply: React.FC = () => {
  return (
    <>
      <section className="department-apply-part">
        <div className="container">
          <div className="department-apply">
            <div>
              <h1>Your Bright Future is Our Mission</h1>
              <p>Click to Apply Online</p>
            </div>
            <div>
              <Link href="/apply">
                Apply Now
                <Icon icon="si:arrow-right-duotone" width="20" height="20" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DepartmentApply;
