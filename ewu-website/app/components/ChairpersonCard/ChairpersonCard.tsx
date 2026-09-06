"use client";

import Image from "next/image";
import "./ChairpersonCard.scss";
import { Icon } from "@iconify/react";
import Link from "next/link";

const ChairpersonCard = ({ chairperson, departments, designations }) => {
  return (
     <div className="chairperson-card" style={{ background: "transparent" }}>
        <div className="chairperson-card-img">
          {chairperson?.photo && (
            <Image
              src={chairperson?.photo}
              width={200}
              height={0}
              alt="Chairperson Photo"
            />
          )}
          <div className="chairperson-card-social">
            <div className="social-links">
              {chairperson.fbLink && <a href={chairperson.fbLink}>
                <Icon icon="mage:facebook" width="22" height="22" />
              </a>}
              {chairperson.xLink && <a href={chairperson.xLink}>
                <Icon icon="prime:twitter" width="22" height="22" />
              </a>}
            </div>
            <div className="chairperson-card-link">
              <Link href={`/pages/faculty-member/${chairperson?.slug}`}>
                Details
                <Icon icon="si:arrow-right-duotone" width="22" height="22" />
              </Link>
            </div>
          </div>
        </div>
        <div className="chairperson-info-deck mb-3">
          <h4>{chairperson.name}</h4>
          <p>
            {
              designations?.find((des) => des.id == chairperson.designation)
                ?.designation
            }
          </p>
          <p>
            Chairperson of the{" "}
            {
              departments?.find((dep) => dep.id == chairperson.departmentId)
                ?.name
            }
          </p>
        </div>
      </div>
  );
};

export default ChairpersonCard;
