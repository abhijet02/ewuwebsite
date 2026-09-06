import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { Publish, YesOrNo } from "@lib/services/slider/slider.service.type";
import { eventActions } from "@lib/slices/event/event.slice";
import { pageActions } from "@lib/slices/page/page.slice";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useEventData() {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);
  const events = useAppSelector((state) => state.event.getEventResponse?.events)
    ?.slice()
    .sort((a, b) => {
      const aHasOrder = a.order > 0;
      const bHasOrder = b.order > 0;

      if (aHasOrder && bHasOrder) {
        // both have order > 0 → sort by order asc
        return a.order - b.order;
      } else if (aHasOrder && !bHasOrder) {
        // a has order > 0, b has order 0 → a comes first
        return -1;
      } else if (!aHasOrder && bHasOrder) {
        // b has order > 0, a has order 0 → b comes first
        return 1;
      } else {
        // both have order = 0 → sort by fromDate desc (latest first)
        return new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime();
      }
    });

  const pageParams = searchParams.get("pageId");
  const pageId =
    pages?.find((page) => page.link === pathName)?.id ||
    pages?.find((page) => page.link.split("?")[0] === pathName)?.id;

  const page = pages?.find((page) => page.id === pageId);

  const publishedEvents = events?.filter(
    (e) =>
      e?.isPublished === Publish.YES &&
      e?.isArchived === YesOrNo.NO &&
      (!Array.isArray(e?.isCopiedTo) ||
        e.isCopiedTo.length === 0 ||
        e.isApprovedByAdmin === YesOrNo.YES)
  );

  useEffect(() => {
    dispatch(
      pageActions.getPages({
        request: { page: 0, limit: 1000 },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (!pages) return;

    if (page) {
      dispatch(
        eventActions.getEvents({
          request: { page: 1, limit: 1000, pageId: page.id },
        })
      );
    } else {
      dispatch(
        eventActions.getEvents({
          request: { page: 1, limit: 10000000 },
        })
      );
    }
  }, [dispatch, pages, page]);

  const pageEvents =
    publishedEvents?.filter(
      (event) =>
        event?.pageId === pageId ||
        event?.isCopiedTo.includes(pageId) ||
        event?.pageId === page?.contentOf ||
        event?.isCopiedTo.includes(page?.contentOf)
    ) || [];

  return { pageEvents };
}
