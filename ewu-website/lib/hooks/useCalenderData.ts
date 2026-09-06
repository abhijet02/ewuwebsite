import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { Publish } from "@lib/services/calender/calenderDate.service.type";
import { calenderDateActions } from "@lib/slices/calender/calenderDate.slice";
import { programCalenderActions } from "@lib/slices/calender/programCalender.slice";
import { semesterCalenderActions } from "@lib/slices/calender/semesterCalender.slice";
import { useEffect } from "react";

export function useCalenderData() {
  const dispatch = useAppDispatch();

  // Get all program calenders
  const programCalenders = useAppSelector(
    (state) =>
      state.programCalender.getProgramCalendersResponse?.ProgramCalenders
  )
    ?.slice()
    ?.sort((a, b) => a?.year - b?.year)
    ?.sort((a, b) => a?.order - b?.order);

  // Get all semester calenders
  const semesterCalenders = useAppSelector(
    (state) =>
      state.semesterCalender.getSemesterCalendersResponse?.SemesterCalenders
  )
    ?.slice()
    ?.sort((a, b) => a?.order - b?.order);

  // Get semester calender id
  const semesterCalenderId = useAppSelector(
    (state) => state.semesterCalender.selectedSemeserId
  );

  // Find selected semester by id
  const selectedSemester = semesterCalenders?.find(
    (sd) => sd.id === semesterCalenderId
  );

  // Get all calender dates
  const calenderDates = useAppSelector(
    (state) => state.calenderDate.getCalenderDatesResponse?.calenderDates
  )
    ?.filter((d) => d?.isPublished === Publish.YES)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .sort((a, b) => a.order - b.order);

  // Filter dates by selected semester
  const filteredDates = calenderDates?.filter(
    (cd) => cd.semesterId === selectedSemester?.id
  );

  // Filter important dates
  const importantDates = [...(calenderDates ?? [])]
    ?.filter((item) => item.isImportantDate === "YES")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Fetch data at render
  useEffect(() => {
    dispatch(
      programCalenderActions.getProgramCalenders({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );

    dispatch(
      semesterCalenderActions.getSemesterCalenders({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );

    dispatch(
      calenderDateActions.getCalenderDates({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );
  }, [dispatch]);

  // Get unique programs
  const uniquePrograms = Array.from(
    new Map(programCalenders?.map((item) => [item.label.trim(), item])).values()
  );

  return {
    programCalenders,
    semesterCalenders,
    semesterCalenderId,
    selectedSemester,
    calenderDates,
    filteredDates,
    importantDates,
    uniquePrograms,
  };
}
