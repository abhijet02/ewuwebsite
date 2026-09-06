import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { campusLifeActions } from "@lib/slices/campusLife/campusLife.slice";
import { useEffect } from "react";

export const useCampusLifeData = () => {
  const dispatch = useAppDispatch();

  const campusLifes = useAppSelector(
    (state) => state.campusLife.getCampusLifesResponse?.campusLifeContents
  );

  useEffect(() => {
    dispatch(
      campusLifeActions.getCampusLifes({
        request: {
          page: 1,
          limit: 100,
        },
      })
    );
  }, [dispatch]);

  return { campusLifes };
};
