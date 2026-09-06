"use client";

import { useFacultyData } from "@lib/hooks/useFacultyData";
import { renderSafeHTML } from "@lib/utils/html2text";
import { useParams } from "next/navigation";
import { FC } from "react";
import "./ProgramDetails.scss";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const ProgramDetails: FC = () => {
  const { programs } = useFacultyData();

  const params = useParams();

  const selectedProgram = programs?.find(
    (program) => program.id.toString() === params?.id?.toString()
  );

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <section className="program">
      <div
        {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
        className="container"
      >
        <h2 className="program-title">{selectedProgram?.title}</h2>
        <div>
          {selectedProgram && renderSafeHTML(selectedProgram?.programDetails)}
        </div>
        {selectedProgram && selectedProgram?.termsAndCondition && (
          <h4 className="p-4 text-gray-800">Terms and Conditions</h4>
        )}
        <div>
          {selectedProgram &&
            renderSafeHTML(selectedProgram?.termsAndCondition)}
        </div>
      </div>
    </section>
  );
};

export default ProgramDetails;
