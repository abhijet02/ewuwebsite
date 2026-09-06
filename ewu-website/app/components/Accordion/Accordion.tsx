"use client";

import React, { useEffect, useState } from "react";
import "./Accordion.scss";
import { usePageData } from "@lib/hooks/usePageData";
import { renderSafeHTML } from "@lib/utils/html2text";

interface AccordionProps {
  sectionData?: any;
}

const Accordion: React.FC<AccordionProps> = ({ sectionData }) => {
  const { pageAccordions } = usePageData();

  // Track which index is open
  const [openIndex, setOpenIndex] = useState<number>(0);

  const filteredAccordions = pageAccordions
    ?.filter(
      (item) =>
        item.section === sectionData?.secetionOrder &&
        (item.col === 0 || item.col === sectionData?.columnOrder)
    )
    .sort((a, b) => a.id - b.id);

  const accordionGroupId = `accordion-${sectionData?.id}`;

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div className="container">
      <section
        className="accordion-wrapper"
        style={{ margin: "24px 0px 40px 0px" }}
      >
        <div className="accordion" id={accordionGroupId}>
          {filteredAccordions?.map((item, index) => {
            const collapseId = `collapse-${sectionData?.id}-${index}`;
            const headingId = `heading-${sectionData?.id}-${index}`;

            // Check if this accordion item is open
            const isOpen = openIndex === index;

            return (
              <div className="accordion-item" key={index}>
                <h2 id={headingId}>
                  <button
                    className={`accordion-button ${isOpen ? "" : "collapsed"}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseId}`}
                    aria-expanded={isOpen ? "true" : "false"}
                    aria-controls={collapseId}
                    onClick={() => handleToggle(index)}
                    style={{
                      backgroundColor: isOpen ? item.color : "transparent",
                      color: isOpen ? "#fff" : "#000",
                      transition: "0.3s ease",
                    }}
                  >
                    {item.title}
                  </button>
                </h2>

                <div
                  id={collapseId}
                  className={`accordion-collapse collapse ${
                    isOpen ? "show" : ""
                  }`}
                  aria-labelledby={headingId}
                  data-bs-parent={`#${accordionGroupId}`}
                >
                  <div className="accordion-body">
                    {renderSafeHTML(item.description?.toString() || "")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Accordion;
