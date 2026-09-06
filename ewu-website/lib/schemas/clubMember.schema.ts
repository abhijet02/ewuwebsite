import * as yup from "yup";

export const clubMemberSchema = yup.object().shape({
  fullName: yup.string().trim().required("Full Name is required"),
  studentId: yup
    .string()
    .trim()
    .matches(/^\d+$/, "Student ID must contain only numbers")
    .required("Student ID is required"),
  clubId: yup.number().min(1, "Club ID is required"),
  photoUrl: yup.mixed().nullable(),
  signatureUrl: yup.mixed().nullable(),
  cvUrl: yup.mixed().nullable(),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});
