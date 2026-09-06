import * as yup from "yup";

export const contactSchema = yup.object().shape({
  fullName: yup.string().trim().required("Name is required"),
  studentId: yup.string(),
  phoneNumber: yup.string().required("Phone number is required"),
  studentEmail: yup.string().email().required("Email is required"),
  email: yup.string().required("Helpdesk is required"),
  subject: yup.string(),
  message: yup.string(),
  attachmentUrl: yup
    .mixed()
    .nullable()
    .test("fileType", "Unsupported file format", (value: any) => {
      if (!value) return true;
      return ["image/jpeg", "image/png", "application/pdf"].includes(
        value.type,
      );
    }),
});
