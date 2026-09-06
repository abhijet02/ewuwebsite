"use client";

import Link from "next/link";
import { FC } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./DegreePrograms.scss";
import { usePathname } from "next/navigation";
import { useProgramCategoryData } from "@lib/hooks/useProgramCategoryData";
import { useProgramData } from "@lib/hooks/useProgramData";

const DegreePrograms: FC = () => {
  const pathname = usePathname();

  const { programs } = useProgramData();
  const { degrees } = useProgramCategoryData();

  // Extract the slug from the URL
  const slug = pathname?.split("/").filter(Boolean).pop()?.toLowerCase().trim();

  // Match the degree
  const matchedDegree = degrees.find(
    (d) => slug && d.title.toLowerCase().startsWith(slug)
  );

  // Get the selected degree
  const selectedDegreeId = matchedDegree?.id;

  // Filter programs based on selected degree
  const filteredPrograms = programs?.filter(
    (p) => p.programCategoryId === selectedDegreeId
  );

  return (
    <section className="degree-programs-section">
      <div className="container">
        <div>
          <h2>Choose your level of study</h2>
        </div>

        {/* Filtered Program Cards */}
        <div className="row g-4 mt-2">
          {filteredPrograms?.map((program) => (
            <div
              key={program?.id}
              className="col-12 col-sm-6 col-md-3 col-lg-3"
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

export default DegreePrograms;
