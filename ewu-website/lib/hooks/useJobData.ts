import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { jobActions } from "@lib/slices/job/job.slice";
import { useEffect } from "react";

export function useJobData() {
  const dispatch = useAppDispatch();

  const jobList = useAppSelector((state) => state.job.getJobResponse?.jobs);

  useEffect(() => {
    dispatch(
      jobActions.getJobs({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );
  }, [dispatch]);

  return { jobList };
}
