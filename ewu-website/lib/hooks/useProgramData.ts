import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { programActions } from "@lib/slices/program/program.slice";
import { useEffect } from "react";

export function useProgramData() {
  const dispatch = useAppDispatch();

  const programs = useAppSelector(
    (state) => state.program.getProgramsResponse?.programs || []
  );

  useEffect(() => {
    dispatch(
      programActions.getPrograms({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );
  }, [dispatch]);

  return { programs };
}
