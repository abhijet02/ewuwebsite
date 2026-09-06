"use client";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { useParams } from "next/navigation";
import "./JobApplicationForm.scss";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { FetchStatus } from "@lib/services/fetch.type";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { jobApplicationSchema } from "@lib/schemas/jobApplication.schema";
import { jobApplicationActions } from "@lib/slices/jobApplication/jobApplication.slice";
import {
  Publish,
  YesOrNo,
} from "@lib/services/jobApplication/jobApplication.service.type";
import { useJobData } from "@lib/hooks/useJobData";
import { useRouter } from "next/navigation";

const JobApplicationForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { jobList } = useJobData();

  const { id } = useParams(); // get the id from the url

  const jobId = id ? parseInt(id.toString()) : undefined;

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const createJobApplicationStatus = useAppSelector(
    (state) => state.jobApplication.createJobApplicationStatus,
  );

  useEffect(() => {
    if (createJobApplicationStatus === FetchStatus.SUCCESS) {
      toast.success("Submitted Successfully");
      handleCancel();
      dispatch(jobApplicationActions.resetCreateJobApplicationStatus()); // ✅ important

      setTimeout(() => router.back(), 800);
    } else if (createJobApplicationStatus === FetchStatus.FAILURE)
      toast.error("Failed to Submit");
  }, [createJobApplicationStatus, dispatch]);

  const selectedJob = jobList?.find((job) => job.id === jobId);

  const cvRef = useRef(null);
  const coverLetterRef = useRef(null);
  const attachmentRef = useRef(null);
  const photoRef = useRef(null);
  const dateRef = useRef(null);
  const toastId = useRef<any>(null);

  const handleSave = useFormik({
    initialValues: {
      jobId: jobId,
      name: "",
      designation: "",
      email: "",
      phone: "",
      dob: null,
      address: "",
      coverLetter: "",
      cvUrl: null,
      coverLetterUrl: null,
      attachmentUrl: null,
      photoUrl: null,
      isPublished: Publish.NO,
      isChecked: YesOrNo.NO,
    },

    validationSchema: jobApplicationSchema,

    onSubmit: async (values) => {
      toastId.current = toast.loading("Submitting application...");
      try {
        dispatch(
          jobApplicationActions.createJobApplication({
            request: {
              ...values,
            },
          }),
        );
      } catch (error) {
        throw error;
      }
    },
  });

  // --- CAPTCHA state ---
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [captchaInput, setCaptchaInput] = useState<string>("");
  const [isCaptchaValid, setIsCaptchaValid] = useState<boolean>(false);

  useEffect(() => {
    // Generate random integers 1-9 for CAPTCHA
    setNum1(Math.floor(Math.random() * 9) + 1);
    setNum2(Math.floor(Math.random() * 9) + 1);
  }, []);

  // --- CAPTCHA validation ---
  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCaptchaInput(val);

    if (parseInt(val) === num1 + num2) {
      setIsCaptchaValid(true);
    } else {
      setIsCaptchaValid(false);
    }
  };

  const handleCancel = () => {
    if (photoRef.current) {
      photoRef.current.value = "";
    }

    if (cvRef.current) {
      cvRef.current.value = "";
    }

    if (coverLetterRef.current) {
      coverLetterRef.current.value = "";
    }

    if (attachmentRef.current) {
      attachmentRef.current.value = "";
    }

    if (dateRef.current) {
      dateRef.current.value = "";
    }

    setPhotoPreview(null);

    resetCaptcha();

    handleSave.resetForm();
  };

  const resetCaptcha = () => {
    setCaptchaInput("");
    setIsCaptchaValid(false);
    setNum1(Math.floor(Math.random() * 9) + 1);
    setNum2(Math.floor(Math.random() * 9) + 1);
  };

  const isFormReady =
    handleSave.isValid &&
    isCaptchaValid &&
    handleSave.values.isPublished === Publish.YES;

  return (
    <div className="container apply-job-form-page">
      <div className="row g-3 justify-content-center">
        <div className="col-12 col-sm-12 col-md-7 col-lg-7">
          <div>
            <h5>Apply for this role</h5>
            <p>{selectedJob?.title}</p>
            <div className="job-apply-chip-deck">
              <div className="job-apply-chip">
                <p>Vacancy : {selectedJob?.numberOfVacancy}</p>
              </div>
              <div className="job-apply-chip">
                <p>
                  {selectedJob?.jobtype === "FULLTIME"
                    ? "Full Time"
                    : selectedJob?.jobtype === "PARTTIME"
                      ? "Part Time"
                      : "Contractual"}
                </p>
              </div>
            </div>
          </div>
          <div>
            <form
              onSubmit={handleSave.handleSubmit}
              style={{
                margin: "24px 0px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div className="form-group">
                <label htmlFor="photoUrl">Upload Photo</label>

                {/* Circular Upload Area */}
                <div
                  className="photo-upload-circle"
                  onClick={() => photoRef.current?.click()}
                >
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="photo-preview-circle"
                    />
                  ) : (
                    <div className="camera-icon-wrapper">
                      <Icon
                        icon="streamline-plump:camera-1"
                        width={30}
                        height={30}
                      />
                    </div>
                  )}
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  name="photoUrl"
                  ref={photoRef}
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    handleSave.setFieldValue("photoUrl", file);

                    if (file) setPhotoPreview(URL.createObjectURL(file));
                  }}
                  onBlur={handleSave.handleBlur}
                  style={{ display: "none" }}
                />

                {/* Validation Message */}
                {handleSave.touched.photoUrl && handleSave.errors.photoUrl && (
                  <div style={{ color: "red", fontSize: 12 }}>
                    {handleSave.errors.photoUrl.toString()}
                  </div>
                )}

                <small className="text-red form-text">
                  Allowed Type(s): .jpg, .jpeg, .png
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="fullname">
                  Name of the applicant <span className="must-fill"> *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your Full Name..."
                  value={handleSave.values.name}
                  onChange={handleSave.handleChange}
                  onBlur={handleSave.handleBlur}
                />
                {handleSave.touched.name && handleSave.errors.name && (
                  <div style={{ color: "red", fontSize: 12 }}>
                    {handleSave.errors.name}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="Designation">Designation</label>
                <input
                  type="text"
                  name="designation"
                  className="form-control"
                  placeholder="Enter your Designation..."
                  value={handleSave.values.designation}
                  onChange={handleSave.handleChange}
                  onBlur={handleSave.handleBlur}
                />
                {handleSave.touched.designation &&
                  handleSave.errors.designation && (
                    <div style={{ color: "red", fontSize: 12 }}>
                      {handleSave.errors.designation}
                    </div>
                  )}
              </div>
              <div className="form-group">
                <label htmlFor="mobile">
                  Phone No <span className="must-fill">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Enter your Mobile number..."
                  value={handleSave.values.phone}
                  onChange={handleSave.handleChange}
                  onBlur={handleSave.handleBlur}
                />
                {handleSave.touched.phone && handleSave.errors.phone && (
                  <div style={{ color: "red", fontSize: 12 }}>
                    {handleSave.errors.phone}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="dob">
                  Date of Birth <span className="must-fill">*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  placeholder="Enter your date of birth..."
                  ref={dateRef}
                  value={handleSave.values.dob}
                  onChange={handleSave.handleChange}
                  onBlur={handleSave.handleBlur}
                />
                {handleSave.touched.dob && handleSave.errors.dob && (
                  <div style={{ color: "red", fontSize: 12 }}>
                    {handleSave.errors.dob.toString()}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  E-mail <span className="must-fill">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your e-mail address..."
                  value={handleSave.values.email}
                  onChange={handleSave.handleChange}
                  onBlur={handleSave.handleBlur}
                />
                {handleSave.touched.email && handleSave.errors.email && (
                  <div style={{ color: "red", fontSize: 12 }}>
                    {handleSave.errors.email}
                  </div>
                )}
              </div>
              <div>
                {!handleSave.values.cvUrl ? (
                  <div
                    className="upload-box"
                    onClick={() => cvRef.current?.click()}
                  >
                    <div className="icon-box">
                      <Icon icon="mynaui:file" width={32} height={32} />
                    </div>
                    <p className="upload-title">Upload a CV/Resume</p>
                    <p className="upload-browse">click here to browse</p>
                    <p className="upload-info">Only pdf files & Max Size 2MB</p>
                  </div>
                ) : (
                  <div className="file-preview">
                    <div className="file-preview-content">
                      <div className="file-left">
                        <div className="icon-box pdf-icon">
                          <Icon
                            icon="fa-solid:file-pdf"
                            width={32}
                            height={32}
                          />
                        </div>
                        <div>
                          <div>{handleSave.values.cvUrl.name}</div>
                          <small className="text-muted">
                            {(
                              handleSave.values.cvUrl.size /
                              1024 /
                              1024
                            ).toFixed(2)}{" "}
                            MB
                          </small>
                        </div>
                      </div>

                      <div
                        className="icon-box remove-icon"
                        onClick={() => handleSave.setFieldValue("cvUrl", null)}
                      >
                        <Icon
                          icon="radix-icons:cross-2"
                          width={24}
                          height={24}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  className="d-none"
                  name="cvUrl"
                  ref={cvRef}
                  accept="application/pdf"
                  onChange={(e) => {
                    handleSave.setFieldValue(
                      "cvUrl",
                      e.currentTarget.files?.[0],
                    );
                  }}
                  onBlur={handleSave.handleBlur}
                />

                {handleSave.touched.cvUrl && handleSave.errors.cvUrl && (
                  <div style={{ color: "red", fontSize: 12 }}>
                    {handleSave.errors.cvUrl.toString()}
                  </div>
                )}
              </div>
              <div>
                {!handleSave.values.coverLetterUrl ? (
                  <div
                    className="upload-box"
                    onClick={() => coverLetterRef.current?.click()}
                  >
                    <div className="icon-box">
                      <Icon icon="mynaui:file" width={32} height={32} />
                    </div>
                    <p className="upload-title">Upload Cover Letter</p>
                    <p className="upload-browse">click here to browse</p>
                    <p className="upload-info">Only pdf files & Max Size 2MB</p>
                  </div>
                ) : (
                  <div className="file-preview">
                    <div className="file-preview-content">
                      <div className="file-left">
                        <div className="icon-box pdf-icon">
                          <Icon
                            icon="fa-solid:file-pdf"
                            width={32}
                            height={32}
                          />
                        </div>
                        <div>
                          <div>{handleSave.values.coverLetterUrl.name}</div>
                          <small className="text-muted">
                            {(
                              handleSave.values.coverLetterUrl.size /
                              1024 /
                              1024
                            ).toFixed(2)}{" "}
                            MB
                          </small>
                        </div>
                      </div>

                      <div
                        className="icon-box remove-icon"
                        onClick={() =>
                          handleSave.setFieldValue("coverLetterUrl", null)
                        }
                      >
                        <Icon
                          icon="radix-icons:cross-2"
                          width={24}
                          height={24}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  className="d-none"
                  name="coverLetterUrl"
                  ref={coverLetterRef}
                  accept="application/pdf"
                  onChange={(e) =>
                    handleSave.setFieldValue(
                      "coverLetterUrl",
                      e.currentTarget.files?.[0],
                    )
                  }
                  onBlur={handleSave.handleBlur}
                />

                {handleSave.touched.coverLetterUrl &&
                  handleSave.errors.coverLetterUrl && (
                    <div style={{ color: "red", fontSize: 12 }}>
                      {handleSave.errors.coverLetterUrl.toString()}
                    </div>
                  )}
              </div>
              <div>
                {!handleSave.values.attachmentUrl ? (
                  <div
                    className="upload-box"
                    onClick={() => attachmentRef.current?.click()}
                  >
                    <div className="icon-box">
                      <Icon icon="mynaui:file" width={32} height={32} />
                    </div>
                    <p className="upload-title">Upload Attachment</p>
                    <p className="upload-browse">click here to browse</p>
                    <p className="upload-info">Only pdf files & Max Size 2MB</p>
                  </div>
                ) : (
                  <div className="file-preview">
                    <div className="file-preview-content">
                      <div className="file-left">
                        <div className="icon-box pdf-icon">
                          <Icon
                            icon="fa-solid:file-pdf"
                            width={32}
                            height={32}
                          />
                        </div>
                        <div>
                          <div>{handleSave.values.attachmentUrl.name}</div>
                          <small className="text-muted">
                            {(
                              handleSave.values.attachmentUrl.size /
                              1024 /
                              1024
                            ).toFixed(2)}{" "}
                            MB
                          </small>
                        </div>
                      </div>

                      <div
                        className="icon-box remove-icon"
                        onClick={() =>
                          handleSave.setFieldValue("attachmentUrl", null)
                        }
                      >
                        <Icon
                          icon="radix-icons:cross-2"
                          width={24}
                          height={24}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  className="d-none"
                  name="attachmentUrl"
                  ref={attachmentRef}
                  accept="application/pdf"
                  onChange={(e) =>
                    handleSave.setFieldValue(
                      "attachmentUrl",
                      e.currentTarget.files?.[0],
                    )
                  }
                  onBlur={handleSave.handleBlur}
                />

                {handleSave.touched.attachmentUrl &&
                  handleSave.errors.attachmentUrl && (
                    <div style={{ color: "red", fontSize: 12 }}>
                      {handleSave.errors.attachmentUrl.toString()}
                    </div>
                  )}
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="imp-text"
                  value="approve"
                  checked={handleSave.values.isPublished === Publish.YES}
                  onChange={(e) => {
                    handleSave.setFieldValue(
                      "isPublished",
                      e.target.checked ? Publish.YES : Publish.NO,
                    );
                  }}
                />
                <label className="form-check-label">
                  The information given in this form is correct, accurate and
                  complete.
                </label>
              </div>
              <div className="col-12 mt-3">
                <label className="captcha-lable">
                  CAPTCHA: What is {num1} + {num2} &nbsp; = &nbsp; ?{" "}
                  <span className="must-fill">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={captchaInput}
                  onChange={handleCaptchaChange}
                />
              </div>
              <div className="form-group d-flex justify-content-end">
                <button
                  className="cancel-btn me-3"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className={`submit-btn ${!isFormReady ? "disabled-btn" : ""}`}
                  type="submit"
                  disabled={!isFormReady}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default JobApplicationForm;
