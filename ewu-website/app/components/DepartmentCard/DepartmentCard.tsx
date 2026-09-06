"use client";

import Link from "next/link";
import Image from "next/image";
import "./DepartmentCard.scss";
import { Icon } from "@iconify/react";

const DepartmentCard = ({ department }) => (
  <div className="our-department-box">
    <div style={{display:"flex", flexDirection:"column",gap:4}}>
      <div className="our-department-box-img">
        <Image
          src={department?.photoUrl}
          fill
          sizes="100vw"
          alt="Department Photo"
        />
      </div>
      <h2>{department?.name}</h2>
    </div>
    <Link href={`/pages/department/${department?.slug}`}>
      Learn More <Icon icon="si:arrow-right-duotone" width="20" height="20" />
    </Link>
  </div>
);

export default DepartmentCard;
