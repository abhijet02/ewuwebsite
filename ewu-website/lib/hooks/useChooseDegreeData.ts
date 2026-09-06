import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { programActions } from "@lib/slices/program/program.slice";
import { programCategoryActions } from "@lib/slices/programCategory/programCategory.slice";
import { useEffect } from "react";

export function useChooseDegreeData() {
  const dispatch = useAppDispatch();

  const degrees = useAppSelector(
    (state) =>
      state.programCategory.getProgramCategoriesResponse?.programCategories
  );

  const programs = useAppSelector(
    (state) => state.program.getProgramsResponse?.programs
  );

  useEffect(() => {
    dispatch(
      programCategoryActions.getProgramCategories({
        request: {
          page: 1,
          limit: 100,
        },
      })
    );

    dispatch(
      programActions.getPrograms({
        request: {
          page: 1,
          limit: 100,
        },
      })
    );
  }, [dispatch]);

  return { degrees, programs };
}
