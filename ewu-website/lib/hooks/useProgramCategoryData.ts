import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { programCategoryActions } from "@lib/slices/programCategory/programCategory.slice";
import { useEffect } from "react";

export function useProgramCategoryData() {
  const dispatch = useAppDispatch();
  const degrees = useAppSelector(
    (state) =>
      state.programCategory.getProgramCategoriesResponse?.programCategories ||
      []
  );

  useEffect(() => {
    dispatch(
      programCategoryActions.getProgramCategories({
        request: { page: 1, limit: 500 },
      })
    );
  }, [dispatch]);

  return { degrees };
}
