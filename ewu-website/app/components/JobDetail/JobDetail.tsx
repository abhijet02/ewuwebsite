"use client";

import "./JobDetail.scss";
import { Icon } from "@iconify/react";
import { JobType, YesOrNo } from "@lib/services/job/job.service.type";
import { renderSafeHTML } from "@lib/utils/html2text";
import moment from "moment";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PdfViewer from "../PdfViewer/PdfViewer";
import { useJobData } from "@lib/hooks/useJobData";
import { useOfficeData } from "@lib/hooks/useOfficeData";
import ShareButtons from "../Share/ShareButtons";
import ArticlePageLayout from "../Share/ArticlePageLayout";

const JobDetails: React.FC = () => {
  const { jobList } = useJobData();
  const { offices } = useOfficeData();

  // --- PDF Modal State ---
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const handlePreview = (url: string) => {
    setPdfUrl(url);
    setPdfOpen(true);
  };

  const { id } = useParams(); // get the id from the url

  // const jobId = id ? parseInt(id.toString()) : undefined;

  // Filter the job based on the jobId
  const selectedJob = jobList?.filter((job) => job?.slug === id);

  // Safely extract single job from selectedJob
  const job = selectedJob && selectedJob.length > 0 ? selectedJob[0] : null;

  // Get office data
  const office = offices?.find((office: any) => office?.id === job?.officeId);

  const path = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_LOCAL_FILE_PATH;
  const fullUrl = `${baseUrl}${path}`;

  if (!job) return null;
  return (
    <ArticlePageLayout>
      <div className="container job-container">
        <div className="job-details-header">
          <h3>{job.title}</h3>
          <p>{office?.title}</p>
        </div>
        <div className="row g-3" style={{ margin: "24px 0px" }}>
          <div className="col-12 col-sm-12 col-md-7 col-lg-9">
            {selectedJob?.map((item, index) => {
              return (
                <div key={index} className="job-description-body">
                  <div className="job-text">
                    {renderSafeHTML(item?.jobDescription)}
                  </div>
                  <div className="job-text">
                    {renderSafeHTML(item?.education)}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-12 col-sm-12 col-md-5 col-lg-3">
            <div className="job-overview">
              <div className="job-overview-card-title">
                <p>Job Overview</p>
              </div>
              <div className="job-overview-data-list">
                {job.numberOfVacancy > 0 && (
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
                      <p>{job.numberOfVacancy}</p>
                    </div>
                  </div>
                )}
                {job.ageLimit > 0 && (
                  <div className="job-overview-specific-data">
                    <div className="job-overview-icon-body">
                      <Icon icon="el:adult" width="20" height="20" />
                    </div>
                    <div className="job-overview-specific-data-part">
                      <p>Age</p>
                      <p>Maximum {job.ageLimit}</p>
                    </div>
                  </div>
                )}
                {job.jobtype && (
                  <div className="job-overview-specific-data">
                    <div className="job-overview-icon-body">
                      <Icon icon="tabler:stairs" width="20" height="20" />
                    </div>
                    <div className="job-overview-specific-data-part">
                      <p>Job Level</p>
                      <p>
                        {job.jobtype === JobType.FULLTIME
                          ? "Full Time"
                          : job.jobtype === JobType.PARTTIME
                            ? "Part Time"
                            : "Contactual"}
                      </p>
                    </div>
                  </div>
                )}
                {job.date && (
                  <div className="job-overview-specific-data">
                    <div className="job-overview-icon-body">
                      <Icon icon="uil:calender" width="20" height="20" />
                    </div>
                    <div className="job-overview-specific-data-part">
                      <p>Job Posted</p>
                      <p>{moment(job.date).format("DD MMMM, YYYY")}</p>
                    </div>
                  </div>
                )}
                {job.deadline && (
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
                )}
                {job.jobCircularUrl && (
                  <div
                    className="job-overview-specific-data"
                    onClick={() => handlePreview(job.jobCircularUrl)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="job-overview-icon-body">
                      <Icon icon="mynaui:click" width="20" height="20" />
                    </div>
                    <div className="job-overview-specific-data-part">
                      <p>Attchment</p>
                      <p>Click to preview</p>
                    </div>
                  </div>
                )}
              </div>
              {job?.isApplyNowShow === YesOrNo.YES && (
                <div className="call-to-action-area">
                  <Link
                    className="job-apply-now-button"
                    href={`/pages/job-application-form/${job.id}`}
                  >
                    Apply now{" "}
                    <div className="apply-icon-body">
                      <Icon
                        icon="humbleicons:arrow-right"
                        width="20"
                        height="20"
                      />
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <PdfViewer
          url={pdfUrl}
          title="PDF Preview"
          open={pdfOpen}
          onClose={() => setPdfOpen(false)}
        />
        <ShareButtons
          url={fullUrl}
          platforms={[
            "facebook",
            "twitter",
            "linkedin",
            "print",
            "copy",
            "mail",
          ]}
          title={job.title || "Check this out"}
        />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
        />
      </div>
    </ArticlePageLayout>
  );
};

export default JobDetails;
