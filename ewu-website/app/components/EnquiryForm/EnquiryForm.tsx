"use client";

import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { contactSchema } from "@lib/schemas/contactPage.schema";
import { FetchStatus } from "@lib/services/fetch.type";
import { helpDeskActions } from "@lib/slices/helpDesk/helpDesk.slice";
import { inqueryActions } from "@lib/slices/inquery/inquery.slice";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import "./EnquiryForm.scss";
import { YesOrNo } from "@lib/services/slider/slider.service.type";

export function EnquiryForm() {
  const dispatch = useAppDispatch();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);
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
  const helpDesks = useAppSelector(
    (state) => state.helpDesk.getHelpDesksResponse?.allHelpDesk,
  );
  // console.log("helpDesks", helpDesks);

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
  useEffect(() => {
    if (createInqueryStatus === FetchStatus.SUCCESS) {
      toast.success("Submitted Successfully");
      handleSave.resetForm();
      resetCaptcha();
    } else if (createInqueryStatus === FetchStatus.FAILURE) {
      toast.error("Failed to Submit");
      resetCaptcha();
    }
  }, [createInqueryStatus, dispatch]);

  useEffect(() => {
    dispatch(
      helpDeskActions.getHelpDesks({
        request: {
          page: 1,
          limit: 500,
        },
      }),
    );
  }, [dispatch]);

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
      } catch (error) {
        throw error;
      }
      handleSave.resetForm();
    },
  });

  // 🔥 Helper for styling
  const fieldStyle = (touched: any, error: any) => ({
    border: touched && error ? "1px solid red" : "1px solid #ccc",
    backgroundColor: touched && error ? "#ffe6e6" : "white",
    padding: "8px",
    borderRadius: "4px",
    width: "100%",
  });

  const labelStyle = (touched: any, error: any) => ({
    color: touched && error ? "red" : "inherit",
  });

  return (
    <>
      <div
        {...(!isStatic
          ? { "data-aos": window.innerWidth < 800 ? "fade-up" : "fade-right" }
          : {})}
        className="col-lg-4 col-md-12 enquiry-contact-form"
      >
        <form className="m-0" onSubmit={handleSave.handleSubmit}>
          <div style={{ marginBottom: "24px" }}>
            <h2>Department/Section Related Enquiry</h2>
            <p>Submit your query to us</p>
          </div>

          <div className="enquiry-form-input">
            <div className="enquiry-form-input-child">
              <label
                htmlFor="fullName"
                style={labelStyle(
                  handleSave.touched.fullName,
                  handleSave.errors.fullName,
                )}
              >
                Name *
              </label>
              <input
                type="text"
                placeholder="Name"
                name="fullName"
                value={handleSave.values.fullName}
                onChange={handleSave.handleChange}
                onBlur={handleSave.handleBlur}
                style={fieldStyle(
                  handleSave.touched.fullName,
                  handleSave.errors.fullName,
                )}
              />
            </div>

            <div className="enquiry-form-input-child">
              <label
                htmlFor="studentId"
                style={labelStyle(
                  handleSave.touched.studentId,
                  handleSave.errors.studentId,
                )}
              >
                Student ID
              </label>
              <input
                type="text"
                placeholder="Student ID"
                name="studentId"
                value={handleSave.values.studentId}
                onChange={handleSave.handleChange}
                onBlur={handleSave.handleBlur}
                style={fieldStyle(
                  handleSave.touched.studentId,
                  handleSave.errors.studentId,
                )}
              />
            </div>
          </div>

          <div className="enquiry-form-input">
            <div className="enquiry-form-input-child">
              <label
                htmlFor="phoneNumber"
                style={labelStyle(
                  handleSave.touched.phoneNumber,
                  handleSave.errors.phoneNumber,
                )}
              >
                Phone Number *
              </label>
              <input
                type="number"
                placeholder="+8801*********"
                name="phoneNumber"
                value={handleSave.values.phoneNumber}
                onChange={handleSave.handleChange}
                onBlur={handleSave.handleBlur}
                style={fieldStyle(
                  handleSave.touched.phoneNumber,
                  handleSave.errors.phoneNumber,
                )}
              />
            </div>

            <div className="enquiry-form-input-child">
              <label
                htmlFor="studentEmail"
                style={labelStyle(
                  handleSave.touched.studentEmail,
                  handleSave.errors.studentEmail,
                )}
              >
                Email *
              </label>
              <input
                type="text"
                placeholder="Email"
                name="studentEmail"
                value={handleSave.values.studentEmail}
                onChange={handleSave.handleChange}
                onBlur={handleSave.handleBlur}
                style={fieldStyle(
                  handleSave.touched.studentEmail,
                  handleSave.errors.studentEmail,
                )}
              />
            </div>
          </div>

          <div className="enquiry-form-input">
            <div className="enquiry-form-input-child">
              <label
                htmlFor="subject"
                style={labelStyle(
                  handleSave.touched.subject,
                  handleSave.errors.subject,
                )}
              >
                Message Subject *
              </label>
              <input
                type="text"
                placeholder="Message Subject"
                name="subject"
                value={handleSave.values.subject}
                onChange={handleSave.handleChange}
                onBlur={handleSave.handleBlur}
                style={fieldStyle(
                  handleSave.touched.subject,
                  handleSave.errors.subject,
                )}
              />
            </div>

            <div className="enquiry-form-input-child">
              <label
                htmlFor="email"
                style={labelStyle(
                  handleSave.touched.email,
                  handleSave.errors.email,
                )}
              >
                To Help Desk *
              </label>
              <select
                name="email"
                value={handleSave.values.email}
                onChange={handleSave.handleChange}
                onBlur={handleSave.handleBlur}
                style={fieldStyle(
                  handleSave.touched.email,
                  handleSave.errors.email,
                )}
              >
                <option value="" disabled>
                  Select
                </option>
                {helpDesks
                  ?.filter((helpdesk) => helpdesk.isContact === YesOrNo.YES)
                  .map((helpdesk) => (
                    <option key={helpdesk?.id} value={helpdesk?.email}>
                      {helpdesk?.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="enquiry-form-input-child">
            <label
              htmlFor="message"
              style={labelStyle(
                handleSave.touched.message,
                handleSave.errors.message,
              )}
            >
              Your Message *
            </label>
            <textarea
              placeholder="Your Message"
              rows={3}
              name="message"
              value={handleSave.values.message}
              onChange={handleSave.handleChange}
              onBlur={handleSave.handleBlur}
              style={fieldStyle(
                handleSave.touched.message,
                handleSave.errors.message,
              )}
            />
          </div>
          <div className="mb-3">
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
          <div className="enquiry-form-input-child">
            <button type="submit" disabled={!isCaptchaValid}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EnquiryForm;
