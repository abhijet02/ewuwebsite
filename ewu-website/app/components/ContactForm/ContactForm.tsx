"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { contactSchema } from "@lib/schemas/contactPage.schema";
import { FetchStatus } from "@lib/services/fetch.type";
import { helpDeskActions } from "@lib/slices/helpDesk/helpDesk.slice";
import { inqueryActions } from "@lib/slices/inquery/inquery.slice";
import { useFormik } from "formik";
import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./ContactForm.scss";
import { YesOrNo } from "@lib/services/helpDesk/helpDesk.service.type";
import { usePageData } from "@lib/hooks/usePageData";
import Image from "next/image";

export function ContactForm() {
  const { page } = usePageData();

  const dispatch = useAppDispatch();
  const attachmentRef = useRef<HTMLInputElement | null>(null);

  const [attachmentPreview, setAttachmentPreview] = useState<string | null>(
    null,
  );
  const [attachmentType, setAttachmentType] = useState<string | null>(null);

  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [captchaInput, setCaptchaInput] = useState<string>("");
  const [isCaptchaValid, setIsCaptchaValid] = useState<boolean>(false);

  const helpDesks = useAppSelector(
    (state) => state.helpDesk.getHelpDesksResponse?.allHelpDesk,
  )?.filter((helpdesk) => helpdesk.isContact === YesOrNo.YES);

  const selectedHelpdesk = helpDesks?.find(
    (helpdesk) => helpdesk.departmentId?.toString() === page?.id?.toString(),
  );

  const createInqueryStatus = useAppSelector(
    (state) => state.inquery.createInqueryStatus,
  );

  const resetCaptcha = () => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;

    setNum1(a);
    setNum2(b);
    setCaptchaInput("");
    setIsCaptchaValid(false);
  };
  // --- Formik ---
  const handleSave = useFormik({
    initialValues: {
      fullName: "",
      studentId: "",
      studentEmail: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
      attachmentUrl: null,
    },

    validationSchema: contactSchema,

    onSubmit: async (values) => {
      try {
        dispatch(
          inqueryActions.createInquery({
            request: { ...values },
          }),
        );

        toast.success("Submitted Successfully");

        // Reset all fields
        handleSave.resetForm();
        resetCaptcha();
        setAttachmentPreview(null);
        setAttachmentType(null);

        if (attachmentRef.current) attachmentRef.current.value = "";
      } catch (error) {
        toast.error("Failed to Submit");
      }
    },
  });

  // --- Set selected helpdesk email ---
  useEffect(() => {
    if (selectedHelpdesk) {
      handleSave.setFieldValue("email", selectedHelpdesk.email);
      handleSave.setFieldTouched("email", true);
    }
  }, [selectedHelpdesk]);

  // --- Fetch helpdesks ---
  useEffect(() => {
    dispatch(
      helpDeskActions.getHelpDesks({ request: { page: 1, limit: 500 } }),
    );
  }, [dispatch]);

  // --- CAPTCHA ---
  useEffect(() => {
    setNum1(Math.floor(Math.random() * 9) + 1);
    setNum2(Math.floor(Math.random() * 9) + 1);
  }, []);

  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCaptchaInput(val);
    setIsCaptchaValid(parseInt(val) === num1 + num2);
  };

  // --- Handle attachment change ---
  const handleSingleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      const file = event.currentTarget.files[0];
      handleSave.setFieldValue(event.currentTarget.name, file);

      // Preview
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAttachmentPreview(reader.result as string);
          setAttachmentType("image");
        };
        reader.readAsDataURL(file);
      } else if (file.type === "application/pdf") {
        setAttachmentPreview(null);
        setAttachmentType("pdf");
      } else {
        setAttachmentPreview(null);
        setAttachmentType("other");
      }
    }
  };

  // --- Remove attachment ---
  const removeAttachment = () => {
    handleSave.setFieldValue("attachmentUrl", null);
    setAttachmentPreview(null);
    setAttachmentType(null);
    if (attachmentRef.current) attachmentRef.current.value = "";
  };

  return (
    <div className="form-section">
      <h2 className="caption mb-4">Submit Your Query To Us</h2>
      <form onSubmit={handleSave.handleSubmit}>
        <div className="row gx-3 gy-1">
          {/* Full Name */}
          <div className="col-md-6">
            <label
              className={`form-label ${
                handleSave.touched.fullName && handleSave.errors.fullName
                  ? "label-error"
                  : ""
              }`}
            >
              Full Name <span className="must-fill"> *</span>
            </label>
            <input
              type="text"
              className={`form-control ${
                handleSave.touched.fullName && handleSave.errors.fullName
                  ? "input-error"
                  : ""
              }`}
              placeholder="Enter your Full Name…"
              name="fullName"
              value={handleSave.values.fullName}
              onChange={handleSave.handleChange}
              onBlur={handleSave.handleBlur}
            />
          </div>

          {/* Student ID */}
          <div className="col-md-6">
            <label className="form-label">Student Id</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Student ID..."
              name="studentId"
              value={handleSave.values.studentId}
              onChange={handleSave.handleChange}
              onBlur={handleSave.handleBlur}
            />
            {handleSave.touched.studentId && handleSave.errors.studentId && (
              <div className="text-sm text-red-500">
                {handleSave.errors.studentId}
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div className="col-md-6">
            <label
              className={`form-label ${
                handleSave.touched.phoneNumber && handleSave.errors.phoneNumber
                  ? "label-error"
                  : ""
              }`}
            >
              Phone Number <span className="must-fill"> *</span>
            </label>
            <input
              type="text"
              className={`form-control ${
                handleSave.touched.phoneNumber && handleSave.errors.phoneNumber
                  ? "input-error"
                  : ""
              }`}
              placeholder="+8801*********"
              name="phoneNumber"
              value={handleSave.values.phoneNumber}
              onChange={handleSave.handleChange}
              onBlur={handleSave.handleBlur}
            />
          </div>

          {/* Student Email */}
          <div className="col-md-6">
            <label
              className={`form-label ${
                handleSave.touched.studentEmail &&
                handleSave.errors.studentEmail
                  ? "label-error"
                  : ""
              }`}
            >
              Email*
            </label>
            <input
              type="email"
              className={`form-control ${
                handleSave.touched.studentEmail &&
                handleSave.errors.studentEmail
                  ? "input-error"
                  : ""
              }`}
              placeholder="Enter your Email…"
              name="studentEmail"
              value={handleSave.values.studentEmail}
              onChange={handleSave.handleChange}
              onBlur={handleSave.handleBlur}
            />
          </div>

          {/* Helpdesk Select */}
          <div className="col-12">
            <label
              className={`form-label ${
                handleSave.touched.email && handleSave.errors.email
                  ? "label-error"
                  : ""
              }`}
            >
              Select Helpdesk <span className="must-fill"> *</span>
            </label>
            <select
              className={`form-select ${
                handleSave.touched.email && handleSave.errors.email
                  ? "input-error"
                  : ""
              }`}
              name="email"
              value={handleSave.values.email}
              onChange={(e) =>
                handleSave.setFieldValue("email", e.target.value)
              }
              onBlur={() => handleSave.setFieldTouched("email", true)}
            >
              <option value="">-- Select Helpdesk --</option>
              {helpDesks?.length > 0 ? (
                helpDesks.map((helpdesk) => (
                  <option key={helpdesk.departmentId} value={helpdesk.email}>
                    {" "}
                    {helpdesk.name}{" "}
                  </option>
                ))
              ) : (
                <option value="">No Helpdesk Found</option>
              )}
            </select>
          </div>

          {/* Subject */}
          <div className="col-12">
            <label className="form-label">Message Subject</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Message Subject..."
              name="subject"
              value={handleSave.values.subject}
              onChange={handleSave.handleChange}
              onBlur={handleSave.handleBlur}
            />
            {handleSave.touched.subject && handleSave.errors.subject && (
              <div className="text-sm text-red-500">
                {handleSave.errors.subject}
              </div>
            )}
          </div>

          {/* Message */}
          <div className="col-12">
            <label className="form-label">Your Message</label>
            <textarea
              className="form-control"
              rows={5}
              placeholder="Type your Message..."
              name="message"
              value={handleSave.values.message}
              onChange={handleSave.handleChange}
              onBlur={handleSave.handleBlur}
            />
            {handleSave.touched.message && handleSave.errors.message && (
              <div className="text-sm text-red-500">
                {handleSave.errors.message}
              </div>
            )}
          </div>

          {/* Attachment */}
          <div className="col-12">
            <small className="text-red form-text">
              Attachment if applicable (jpg, png, pdf etc.)
            </small>
            <input
              type="file"
              className="form-control"
              name="attachmentUrl"
              onChange={handleSingleFileChange}
              onBlur={handleSave.handleBlur}
              ref={attachmentRef}
            />
            {handleSave.touched.attachmentUrl &&
              handleSave.errors.attachmentUrl && (
                <div className="text-sm text-red-500">
                  {handleSave.errors.attachmentUrl.toString()}
                </div>
              )}
          </div>

          {/* Attachment Preview */}
          {handleSave.values.attachmentUrl && (
            <div
              className="attachment-preview mt-2"
              style={{ position: "relative" }}
            >
              {attachmentType === "image" && attachmentPreview && (
                <Image
                  src={attachmentPreview}
                  alt="attachment"
                  width={100}
                  height={100}
                  style={{ objectFit: "cover" }}
                />
              )}
              {attachmentType === "pdf" && (
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Icon icon="mdi:file-pdf-box" width={40} height={40} />
                  <span>{(handleSave.values.attachmentUrl as File).name}</span>
                </div>
              )}
              {attachmentType === "other" && (
                <span>{(handleSave.values.attachmentUrl as File).name}</span>
              )}

              {/* Remove button */}
              <button
                type="button"
                onClick={removeAttachment}
                style={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  border: "none",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>
          )}

          {/* CAPTCHA */}
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

          {/* Submit */}
          <div className="col-12 mt-2">
            <button
              className="send-message-btn"
              type="submit"
              disabled={!isCaptchaValid}
            >
              Send Message
              <Icon
                className="send-message-btn-icon"
                icon="emojione-monotone:up-arrow"
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
