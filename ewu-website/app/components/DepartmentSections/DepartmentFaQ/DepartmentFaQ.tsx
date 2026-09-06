"use client";

import { useState } from "react";
import { usePageData } from "@lib/hooks/usePageData";
import "./DepartmentFaQ.scss";

const DepartmentFaQ: React.FC = () => {
  const { pageFaqs } = usePageData();
  const [openIndex, setOpenIndex] = useState<number>(0); // first one always open

  if (!pageFaqs || pageFaqs.length === 0) return null;

  const toggleAccordion = (index: number) => {
    if (index !== openIndex) {
      // only switch to another item
      setOpenIndex(index);
    }
    // if clicked the already open item, do nothing
  };

  return (
    <div>
      <div className="container">
        <div className="header-with-subtitle">
          <h2>Departmental Frequently Asked Questions</h2>
        </div>
      </div>

      <div className="faq-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <section className="accordion-wrapper">
                <div className="accordion">
                  {pageFaqs.map((item, index) => (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button ${
                            openIndex === index ? "" : "collapsed"
                          }`}
                          type="button"
                          onClick={() => toggleAccordion(index)}
                        >
                          <span className="question-mark">Q:</span>{" "}
                          <span>{item?.title}</span>
                        </button>
                      </h2>
                      <div
                        className={`accordion-collapse collapse ${
                          openIndex === index ? "show" : ""
                        }`}
                      >
                        <div className="accordion-body">
                          <strong>Answer: &nbsp;</strong>
                          {item?.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentFaQ;
