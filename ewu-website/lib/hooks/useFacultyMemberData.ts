import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { departmentActions } from "@lib/slices/department/department.slice";
import { designationActions } from "@lib/slices/designation/designation.slice";
import { facultyActions } from "@lib/slices/faculty/faculty.slice";
import { facultyPersonActions } from "@lib/slices/facultyPerson/facultyPerson.slice";
import { publicationActions } from "@lib/slices/publication/publication.slice";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDepartmentData } from "./useDepartmentData";
import { facultyMemberDocumentActions } from "@lib/slices/facultyMemberDocument/facultyMemberDocument.slice";

export function useFacultyMemberData() {
  const dispatch = useAppDispatch();

  const facultys = useAppSelector(
    (state) => state.faculty.getFacultysResponse?.faculties
  );

  const departments = useAppSelector(
    (state) => state.department.getDepartmentsResponse?.getDepartments
  );

  const designations = useAppSelector(
    (state) => state.designation.getDesignationsResponse?.designations
  );

  const { facultyPersons } = useDepartmentData();

  const publications = useAppSelector(
    (state) => state.publication.getPublicationsResponse?.publications
  );

  const facultyMemberDocuments = useAppSelector(
    (state) =>
      state.facultyMemberDocument.getFacultyMemberDocumentsResponse
        ?.facultyMemberDocuments
  );

  useEffect(() => {
    dispatch(
      facultyActions.getFacultys({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );

    dispatch(
      departmentActions.getDepartments({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );

    dispatch(
      designationActions.getDesignations({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );

    dispatch(
      facultyPersonActions.getFacultyPersons({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );

    dispatch(
      publicationActions.getPublications({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );

    dispatch(
      facultyMemberDocumentActions.getFacultyMemberDocuments({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );
  }, [dispatch]);

  const { id } = useParams();

  const facultyPerson = facultyPersons?.find((fp) => fp.slug.toString() == id);

  const faculty = facultys?.find((f) => f.id === facultyPerson?.facultyId);

  const department = departments?.find(
    (d) => d.id == facultyPerson?.departmentId
  );

  const designation = designations?.find(
    (d) => d.id.toString() === facultyPerson?.designation
  );

  const publication =
    publications?.filter((p) => p.facultyPersonId == facultyPerson?.id) || [];

  const document =
    facultyMemberDocuments?.filter((d) => d.facultyId === facultyPerson?.id) ||
    [];

  return {
    facultyPerson,
    faculty,
    department,
    designation,
    publication,
    document,
  };
}
