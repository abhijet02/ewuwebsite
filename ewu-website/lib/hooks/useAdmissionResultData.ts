import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { YesOrNo } from "@lib/services/admissionResult/admissionResult.service.type";
import { admissionResultActions } from "@lib/slices/admissionResult/admissionResult.slice";
import { facultyActions } from "@lib/slices/faculty/faculty.slice";
import { programCategoryActions } from "@lib/slices/programCategory/programCategory.slice";
import { semesterActions } from "@lib/slices/semester/semester.slice";
import { useEffect } from "react";

export function useAdmissionResultData() {
  const dispatch = useAppDispatch();

  const admissionResults = useAppSelector(
    (state) =>
      state.admissionResult.getAdmissionResultsResponse?.admissionResults
  );

  const programCategory = useAppSelector(
    (state) =>
      state.programCategory.getProgramCategoriesResponse?.programCategories
  );

  const semesters = useAppSelector(
    (state) => state.semester.getSemestersResponse?.semesters
  );

  const faculties = useAppSelector(
    (state) => state.faculty.getFacultysResponse?.faculties
  );

  useEffect(() => {
    dispatch(
      admissionResultActions.getAdmissionResults({
        request: { page: 1, limit: 10000 },
      })
    );
    dispatch(
      programCategoryActions.getProgramCategories({
        request: { page: 1, limit: 10000 },
      })
    );
    dispatch(
      semesterActions.getSemesters({
        request: { page: 1, limit: 10000 },
      })
    );
    dispatch(
      facultyActions.getFacultys({
        request: { page: 1, limit: 10000 },
      })
    );
  }, [dispatch]);

  const archivedAdmissionResults = admissionResults?.filter(
    (result) =>
      result?.isPublished === YesOrNo.YES && result?.isArchived === YesOrNo.YES
  );

  const nonArchivedAdmissionResults = admissionResults?.find(
    (result) => result?.isArchived === YesOrNo.NO
  );

  return {
    admissionResults,
    programCategory,
    semesters,
    faculties,
    archivedAdmissionResults,
    nonArchivedAdmissionResults,
  };
}
