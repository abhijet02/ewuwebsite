"use client";
import { Icon } from "@iconify/react";
import "./FacultyMemberSocial.scss";
import GoogleSch from "public/gs.png";
import Image from "next/image";

interface FacultyPerson {
  fbLink?: string;
  xLink?: string;
  instaLink?: string;
  liLink?: string;
  orcidLink?: string;
  researchGateLink?: string;
  scopusLink?: string;
  gsLink?: string;
}

interface FacultyMemberSocialProps {
  facultyPerson: FacultyPerson;
}

const FacultyMemberSocial: React.FC<FacultyMemberSocialProps> = ({
  facultyPerson,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      {facultyPerson?.fbLink && (
        <a
          href={facultyPerson.fbLink}
          className="faculty-chairperson-social-icon"
          title="Facebook"
          target="_blank"
        >
          <Icon icon="ri:facebook-fill" width="20" height="20" />
        </a>
      )}
      {facultyPerson?.xLink && (
        <a
          href={facultyPerson.xLink}
          className="faculty-chairperson-social-icon"
          title="X / Twitter"
          target="_blank"
        >
          <Icon icon="prime:twitter" width="20" height="20" />
        </a>
      )}
      {facultyPerson?.instaLink && (
        <a
          href={facultyPerson.instaLink}
          className="faculty-chairperson-social-icon"
          title="Instagram"
          target="_blank"
        >
          <Icon icon="uil:instagram" width="20" height="20" />
        </a>
      )}
      {facultyPerson?.liLink && (
        <a
          href={facultyPerson.liLink}
          className="faculty-chairperson-social-icon"
          title="LinkedIn"
          target="_blank"
        >
          <Icon icon="flowbite:linkedin-solid" width="20" height="20" />
        </a>
      )}
    </div>
  );
};

export default FacultyMemberSocial;
