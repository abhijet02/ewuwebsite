"use client";

import "./CardDegreeProgram.scss";
import { useProgramCategoryData } from "@lib/hooks/useProgramCategoryData";
import { useProgramData } from "@lib/hooks/useProgramData";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useEffect, useState } from "react";

const CardDegreeProgram = () => {
  const { programs } = useProgramData();
  const { degrees } = useProgramCategoryData();

  // Local state for active degree tab
  const [selectedDegreeId, setSelectedDegreeId] = useState<string | null>(null);

  // Set default selected degree when data loads
  useEffect(() => {
    if (degrees.length > 0 && !selectedDegreeId) {
      setSelectedDegreeId(degrees[0].id.toString());
    }
  }, [degrees, selectedDegreeId]);

  // Filter programs based on selected degree
  const filteredPrograms = programs?.filter(
    (p) => p.programCategoryId.toString() === selectedDegreeId
  );

  return (
    <section className="degree-programs-section">
      <div className="container">
        <div>
          <h2>Choose your level of study</h2>
        </div>

        {/* Tabs always visible */}
        <div className="degree-tabs">
          {degrees?.map((degree) => {
            const isActive = selectedDegreeId === degree?.id.toString();
            return (
              <button
                key={degree?.id}
                onClick={() => setSelectedDegreeId(degree?.id.toString())}
                className={isActive ? "active" : ""}
              >
                {degree?.title}
              </button>
            );
          })}
        </div>

        {/* Filtered Program Cards */}
        <div className="row g-4 mt-2">
          {filteredPrograms?.map((program) => (
            <div
              key={program?.id}
              className="col-12 col-sm-12 col-md-3 col-lg-3"
            >
              <Link
                href={`/pages/program-details/${program?.id}`}
                className="degree-program-card"
              >
                <div className="icon-wrapper">
                  <Icon
                    icon="fluent:certificate-24-filled"
                    width="24"
                    height="24"
                  />
                </div>
                {program?.title}
              </Link>
            </div>
          ))}

          {filteredPrograms?.length === 0 && (
            <p>No programs available for this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CardDegreeProgram;
