"use client";

import { Job, JobType } from "@lib/services/job/job.service.type";
import moment from "moment";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { stripHTMLAndLimitWords } from "@lib/utils/html2text";
import "./List.scss"; // import your CSS file
import { Office } from "@lib/services/office/office.service.type";

interface ListProps {
  jobs: Job[];
  offices: Office[];
}

const List: React.FC<ListProps> = ({ jobs, offices }) => {
  return (
    <div className="job-list-container">
      <div className="row g-3">
        {jobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          jobs.map((job) => {
            const descriptionText = stripHTMLAndLimitWords(job.jobDescription);
            const words = descriptionText.split(" ");
            const showReadMore = words.length > 50;
            const truncatedDescription = showReadMore
              ? words.slice(0, 50).join(" ") + "..."
              : descriptionText;

            return (
              <div className="col-12" key={job.id}>
                <div className="job-card">
                  <div className="job-card-header">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <h2>{job.title}</h2>
                      <div className="job-info-deck">
                        {/* Office Title */}
                        {offices?.find((office) => office.id === job.officeId)
                          ?.title && (
                          <h6>
                            {
                              offices.find(
                                (office) => office.id === job.officeId,
                              )?.title
                            }
                          </h6>
                        )}

                        {/* Conditional Dot SVG — shows only if both office & jobtype exist */}
                        {(() => {
                          const officeTitle = offices?.find(
                            (office) => office.id === job.officeId,
                          )?.title;

                          const jobTypeLabel =
                            job.jobtype === JobType.FULLTIME
                              ? "Full Time"
                              : job.jobtype === JobType.PARTTIME
                                ? "Part Time"
                                : job.jobtype
                                  ? "Contractual"
                                  : "";

                          // ✅ Show dot only if BOTH exist
                          if (officeTitle && jobTypeLabel) {
                            return (
                              <svg
                                className="job-type-dot"
                                width="20px"
                                height="20px"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z" />
                              </svg>
                            );
                          }
                          return null;
                        })()}

                        {/* Job Type */}
                        {job.jobtype && (
                          <h6>
                            {job.jobtype === JobType.FULLTIME
                              ? "Full Time"
                              : job.jobtype === JobType.PARTTIME
                                ? "Part Time"
                                : "Contractual"}
                          </h6>
                        )}
                      </div>
                    </div>
                    <div>
                      <p style={{ textAlign: "left" }}>
                        Posted {moment(job.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>

                  <div className="job-card-description">
                    <p>{truncatedDescription}</p>
                  </div>

                  <div className="job-card-footer">
                    <div className="job-info-deck">
                      <div className="job-overview-specific-data">
                        <div className="job-overview-icon-body">
                          <Icon
                            icon="flowbite:hourglass-outline"
                            width="20"
                            height="20"
                          />
                        </div>
                        <div className="job-overview-specific-data-part">
                          <p>Application deadline</p>
                          <p>{moment(job.deadline).format("DD MMMM, YYYY")}</p>
                        </div>
                      </div>
                      {job?.numberOfVacancy > 0 && (
                        <div className="job-overview-specific-data">
                          <div className="job-overview-icon-body">
                            <Icon
                              icon="fluent:people-search-20-filled"
                              width="20"
                              height="20"
                            />
                          </div>
                          <div className="job-overview-specific-data-part">
                            <p>Vacancy</p>
                            <p>{job?.numberOfVacancy}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <Link href={`/pages/job-details/${job?.slug}`}>
                      <button>
                        View Details{" "}
                        <Icon
                          icon="mingcute:arrow-right-up-line"
                          width="20"
                          height="20"
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default List;
