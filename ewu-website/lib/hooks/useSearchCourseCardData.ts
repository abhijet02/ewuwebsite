import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { searchCourseCardActions } from "@lib/slices/searchCourseCard/searchCourseCard.slice";
import { useEffect } from "react";

export function useSearchCourseCardData() {
  const dispatch = useAppDispatch();

  const searchCourseCardData = useAppSelector(
    (state) =>
      state.searchCourseCard.getSearchCourseCardResponse?.searchCourseCards
  );

  useEffect(() => {
    dispatch(
      searchCourseCardActions.getSearchCourseCard({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );
  }, [dispatch]);

  return { searchCourseCardData };
}
