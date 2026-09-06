import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { YesOrNo } from "@lib/services/slider/slider.service.type";
import { alumniActions } from "@lib/slices/alumni/alumni.slice";
import { courseActions } from "@lib/slices/course/course.slice";
import { departmentActions } from "@lib/slices/department/department.slice";
import { designationActions } from "@lib/slices/designation/designation.slice";
import { facultyActions } from "@lib/slices/faculty/faculty.slice";
import { facultyPersonActions } from "@lib/slices/facultyPerson/facultyPerson.slice";
import { poeActions } from "@lib/slices/poe/poe.slice";
import { programActions } from "@lib/slices/program/program.slice";
import { programCategoryActions } from "@lib/slices/programCategory/programCategory.slice";
import { whyChooseActions } from "@lib/slices/whyChoose/whyChoose.slice";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export function useDepartmentData() {
  const dispatch = useAppDispatch();

  const facultys = useAppSelector(
    (state) => state.faculty.getFacultysResponse?.faculties,
  );

  const departments = useAppSelector(
    (state) => state.department.getDepartmentsResponse?.getDepartments,
  );

  const designations = useAppSelector(
    (state) => state.designation.getDesignationsResponse?.designations,
  );

  const facultyPersons = useAppSelector(
    (state) => state.facultyPerson.getFacultyPersonResponse?.facultyPersons,
  )
    ?.filter((f) => f.isPublished === YesOrNo.YES)
    .sort((a, b) => {
      // 1. Department order
      const departmentA = departments?.find(
        (d) => d.id.toString() === a.departmentId?.toString(),
      );
      const departmentB = departments?.find(
        (d) => d.id.toString() === b.departmentId?.toString(),
      );
      const departmentOrderA = departmentA?.order ?? 0;
      const departmentOrderB = departmentB?.order ?? 0;

      if (departmentOrderA !== departmentOrderB) {
        return departmentOrderA - departmentOrderB;
      }

      // 2. Designation order
      const designationA = designations?.find(
        (d) => d.id.toString() === a.designation?.toString(),
      );
      const designationB = designations?.find(
        (d) => d.id.toString() === b.designation?.toString(),
      );
      const designationOrderA = designationA?.order ?? 0;
      const designationOrderB = designationB?.order ?? 0;

      if (designationOrderA !== designationOrderB) {
        return designationOrderA - designationOrderB;
      }

      // 3. Faculty person order
      return (a?.order ?? 0) - (b?.order ?? 0);
    });

  const programCategories = useAppSelector(
    (state) =>
      state.programCategory.getProgramCategoriesResponse?.programCategories,
  );

  const programs = useAppSelector(
    (state) => state.program.getProgramsResponse?.programs,
  )
    ?.slice()
    .sort((a, b) => a.order - b.order);

  const courses = useAppSelector(
    (state) => state.course.getCoursesResponse?.getCourses,
  )
    ?.slice()
    .sort((a, b) => {
      // Find each course's program
      const programA = programs?.find((p) => p.id === a.programId);
      const programB = programs?.find((p) => p.id === b.programId);

      // First compare by program order
      if (programA?.order !== programB?.order) {
        return (programA?.order ?? 0) - (programB?.order ?? 0);
      }

      // If in the same program, compare by course order
      return a.order - b.order;
    });

  const alumni = useAppSelector(
    (state) => state.alumni.getAlumniResponse?.noteableAlumni,
  );

  const whyChooses = useAppSelector(
    (state) => state.whyChoose.getWhyChoosesResponse?.whyChooseDepartments,
  )
    ?.slice()
    .sort((a, b) => a.order - b.order);

  const poes = useAppSelector((state) => state.poe.getPoesResponse?.poes);

  useEffect(() => {
    dispatch(
      facultyActions.getFacultys({
        request: {
          page: 1,
          limit: 500,
        },
      }),
    );

    dispatch(
      departmentActions.getDepartments({
        request: {
          page: 1,
          limit: 500,
        },
      }),
    );

    dispatch(
      designationActions.getDesignations({
        request: {
          page: 1,
          limit: 500,
        },
      }),
    );

    dispatch(
      facultyPersonActions.getFacultyPersons({
        request: {
          page: 1,
          limit: 1000,
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

    dispatch(
      courseActions.getCourses({
        request: {
          page: 1,
          limit: 10000,
        },
      }),
    );

    dispatch(
      alumniActions.getAlumni({
        request: {
          page: 1,
          limit: 10000,
        },
      }),
    );

    dispatch(
      whyChooseActions.getWhyChooses({
        request: {
          page: 1,
          limit: 1000,
        },
      }),
    );

    dispatch(
      poeActions.getPoes({
        request: {
          page: 1,
          limit: 1000,
        },
      }),
    );
  }, [dispatch]);

  const { slug } = useParams();
  const { id } = useParams();

  const department = departments?.find(
    (department) => department.slug == (slug || id),
  );

  const departmentFacultyPersons = facultyPersons?.filter(
    (dfm) => dfm.departmentId === parseInt(department?.id.toString()),
  );

  const adjFilteredDeptFacultyPersons = departmentFacultyPersons?.filter(
    (adj) => adj?.isAdjunct === YesOrNo.NO,
  );

  const chairperson = departmentFacultyPersons?.find(
    (facultyPerson) => facultyPerson.isChairperson === YesOrNo.YES,
  );

  const coordinator = departmentFacultyPersons?.find(
    (facultyPerson) => facultyPerson.isCoordinator === YesOrNo.YES,
  );

  const chairpersonFaculty = facultys?.find(
    (faculty) => faculty.id == parseInt(chairperson?.facultyId.toString()),
  );

  const chairpersonDepartment = departments?.find(
    (department) =>
      department.id == parseInt(chairperson?.departmentId.toString()),
  );

  const coordinatorDepartment = departments?.find(
    (department) =>
      department.id == parseInt(coordinator?.departmentId.toString()),
  );

  const chairpersonDesignation = designations?.find(
    (designation) =>
      designation.id == parseInt(chairperson?.designation.toString()),
  );

  const coordinatorDesignation = designations?.find(
    (designation) =>
      designation.id == parseInt(coordinator?.designation.toString()),
  );

  const departmentPrograms = programs?.filter(
    (program) => program.departmentId == department?.id,
  );

  const departmentCourses = courses?.filter(
    (course) => course.departmentId == department?.id,
  );

  const departmentAlumni = alumni?.filter(
    (alumni) => alumni.departmentId == department?.id,
  );

  const departmentWhyChooses = whyChooses?.filter(
    (whyChoose) => whyChoose.departmentId == department?.id,
  );

  const departmentPeos = poes?.filter(
    (poe) => poe.departmentId == department?.id,
  );

  return {
    departments,
    designations,
    facultyPersons,
    programCategories,
    programs,
    courses,
    alumni,
    whyChooses,
    poes,
    department,
    departmentFacultyPersons,
    adjFilteredDeptFacultyPersons,
    chairperson,
    coordinator,
    chairpersonFaculty,
    chairpersonDepartment,
    coordinatorDepartment,
    chairpersonDesignation,
    coordinatorDesignation,
    departmentPrograms,
    departmentCourses,
    departmentAlumni,
    departmentWhyChooses,
    departmentPeos,
    facultys,
  };
}
