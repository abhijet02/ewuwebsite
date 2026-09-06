import * as yup from "yup";

export const jobApplicationSchema = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  dob: yup
    .date()
    .typeError("Invalid date format")
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future")
    .test("age-limit", "You must be at least 18 years old", function (value) {
      if (!value) return false;
      const today = new Date();
      const ageDiff = today.getFullYear() - value.getFullYear();
      const m = today.getMonth() - value.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < value.getDate())) {
        return ageDiff - 1 >= 18;
      }
      return ageDiff >= 18;
    }),

  // coverLetter: yup.mixed().nullable(),
  cvUrl: yup
    .mixed()
    .nullable()
    .test("fileType", "Unsupported file format", (value: any) => {
      if (!value) return true;

      const allowedExtensions = [".pdf"];
      const fileName = value.name?.toLowerCase() || "";

      return allowedExtensions.some((ext) => fileName.endsWith(ext));
    }),

  coverLetterUrl: yup
    .mixed()
    .nullable()
    .test("fileType", "Unsupported file format", (value: any) => {
      if (!value) return true;

      const allowedExtensions = [".pdf"];
      const fileName = value.name?.toLowerCase() || "";

      return allowedExtensions.some((ext) => fileName.endsWith(ext));
    }),

  attachmentUrl: yup
    .mixed()
    .nullable()
    .test("fileType", "Unsupported file format", (value: any) => {
      if (!value) return true;

      const allowedExtensions = [".pdf"];
      const fileName = value.name?.toLowerCase() || "";

      return allowedExtensions.some((ext) => fileName.endsWith(ext));
    }),

  photoUrl: yup
    .mixed()
    .nullable()
    .test("fileType", "Unsupported file format", (value: any) => {
      if (!value) return true;

      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      const fileName = value.name?.toLowerCase() || "";

      return allowedExtensions.some((ext) => fileName.endsWith(ext));
    }),

  isPublished: yup
    .string()
    .oneOf(["YES", "NO"])
    .required("Checking this is required"),
});
