import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { liveSessionActions } from "@lib/slices/liveSession/liveSession.slice";
import { useEffect } from "react";

export function useLiveSessionData() {
  const dispatch = useAppDispatch();

  const liveSessions = useAppSelector(
    (state) => state.liveSession.getLiveSessionsResponse?.liveSessions
  );

  useEffect(() => {
    dispatch(
      liveSessionActions.getLiveSessions({
        request: { page: 1, limit: 10000 },
      })
    );
  }, [dispatch]);

  return { liveSessions };
}
