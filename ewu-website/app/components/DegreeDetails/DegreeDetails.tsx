"use client";

import "./DegreeDetails.scss";
import { renderSafeHTML } from "@lib/utils/html2text";
import { useParams } from "next/navigation";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useProgramCategoryData } from "@lib/hooks/useProgramCategoryData";

const DegreeDetails: FC = () => {
  const { degrees } = useProgramCategoryData();
  const params = useParams();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const degree = degrees?.find(
    (degree) => degree?.title.toLowerCase() === params.id.toString()
  );

  return (
    <>
      <section className="degree-details">
        <div
          {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
          className="container"
        >
          <div className="degree-desc myhtml2-main-wrapper">
            {renderSafeHTML(degree?.programDetails)}
          </div>
        </div>
      </section>
    </>
  );
};

export default DegreeDetails;
