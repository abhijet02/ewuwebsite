"use client";

import { FC } from "react";
import "./FaqCompo.scss";
import { renderSafeHTML } from "@lib/utils/html2text";
import { usePageData } from "@lib/hooks/usePageData";
import Link from "next/link";

const FaqCompo: FC = () => {
  const { pageFaqs } = usePageData();

  return (
    <div className="faq-section">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <section className="accordion-wrapper">
              <div className="accordion" id="accordionExample">
                {pageFaqs?.map((item, index) => {
                  const collapseId = `collapse-${index}`;
                  const headingId = `heading-${index}`;

                  return (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header" id={headingId}>
                        <button
                          className={`accordion-button ${
                            index !== 0 ? "collapsed" : ""
                          }`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${collapseId}`}
                          aria-expanded={index === 0 ? "true" : "false"}
                          aria-controls={collapseId}
                        >
                          <span className="question-mark">Q:</span>{" "}
                          <span>{item?.title}</span>
                        </button>
                      </h2>
                      <div
                        id={collapseId}
                        className={`accordion-collapse collapse ${
                          index === 0 ? "show" : ""
                        }`}
                        aria-labelledby={headingId}
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <strong>Answer: &nbsp; </strong>{" "}
                          {renderSafeHTML(item.answer.toString())}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
            padding: "16px",
            marginTop: "40px",
          }}
        >
          <p style={{ margin: "0px" }}>
            If you need more information or have specific questions, please
            click the button below to make an enquiry. You’ll be redirected to
            our enquiry form.
          </p>
          <Link href="/pages/contact">
            <button className="enquiry-btn"> Enquiry</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FaqCompo;
