import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { YesOrNo } from "@lib/services/slider/slider.service.type";
import { programActions } from "@lib/slices/program/program.slice";
import { programCategoryActions } from "@lib/slices/programCategory/programCategory.slice";
import { publicationActions } from "@lib/slices/publication/publication.slice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDepartmentData } from "./useDepartmentData";

export function useFacultyData() {
  const dispatch = useAppDispatch();

  const { facultys, departments, designations, facultyPersons } =
    useDepartmentData();

  const publications = useAppSelector(
    (state) => state.publication.getPublicationsResponse?.publications,
  );

  const programCategories = useAppSelector(
    (state) =>
      state.programCategory.getProgramCategoriesResponse?.programCategories,
  );

  const programs = useAppSelector(
    (state) => state.program.getProgramsResponse?.programs,
  );

  useEffect(() => {
    dispatch(
      publicationActions.getPublications({
        request: {
          page: 1,
          limit: 10000,
        },
      }),
    );

    dispatch(
      programCategoryActions.getProgramCategories({
        request: {
          page: 1,
          limit: 500,
        },
      }),
    );

    dispatch(
      programActions.getPrograms({
        request: {
          page: 1,
          limit: 500,
        },
      }),
    );
  }, [dispatch]);

  const { slug } = useParams();
  const { id } = useParams();

  const faculty = facultys?.find((faculty) => faculty.slug == (slug || id));

  const facultyDepartments = departments?.filter(
    (dep) => dep.facultyId === faculty?.id,
  );

  const facultyFacultyPersons = facultyPersons?.filter(
    (dfm) => dfm.facultyId === parseInt(faculty?.id.toString()),
  );

  const facultyChairpersons = facultyFacultyPersons?.filter(
    (facultyPerson) => facultyPerson.isChairperson === YesOrNo.YES,
  );
  const facultyCoordinator = facultyFacultyPersons?.filter(
    (facultyPerson) => facultyPerson.isCoordinator === YesOrNo.YES,
  );
  const dean = facultyFacultyPersons?.find(
    (facultyPerson) => facultyPerson.isDean === YesOrNo.YES,
  );

  const deanFaculty = facultys?.find(
    (faculty) => faculty.id == parseInt(dean?.facultyId.toString()),
  );

  const deanDepartment = departments?.find(
    (department) => department.id == parseInt(dean?.departmentId?.toString()),
  );

  const deanDesignation = designations?.find(
    (designation) => designation.id == parseInt(dean?.designation.toString()),
  );

  return {
    facultys,
    departments,
    designations,
    facultyPersons,
    publications,
    faculty,
    facultyDepartments,
    facultyFacultyPersons,
    facultyChairpersons,
    facultyCoordinator,
    dean,
    deanFaculty,
    deanDesignation,
    deanDepartment,
    programCategories,
    programs,
  };
}
