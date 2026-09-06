"use client";

import "./ClubDetails.scss";
import { renderSafeHTML } from "@lib/utils/html2text";
import { useClubData } from "@lib/hooks/useClubData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";

const ClubDetails: React.FC = () => {
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const { club } = useClubData();

  return (
    <>
      <section className="industrialization-club-part">
        <div
          {...(!isStatic ? { "data-aos": "fade-up" } : {})}
          className="container"
        >
          <div className="industrialization-club">
            <h2>Welcome to EWU {club?.title}</h2>
            <div>{renderSafeHTML(club?.introduction)}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClubDetails;
