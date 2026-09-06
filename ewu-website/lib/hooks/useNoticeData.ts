import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { Publish, YesOrNo } from "@lib/services/notice/notice.service.type";
import { noticeActions } from "@lib/slices/notice/notice.slice";
import { pageActions } from "@lib/slices/page/page.slice";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useNoticeData() {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const today = new Date();

  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);
  const notices = useAppSelector(
    (state) => state.notice.getNoticeResponse?.getAllNotices
  )
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
        // both have order = 0 → sort by date desc (latest first)
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  const pageParams = searchParams.get("pageId");
  const pageId =
    pages?.find((page) => page.link === pathName)?.id ||
    pages?.find((page) => page.link.split("?")[0] === pathName)?.id;
  const page = pages?.find((page) => page.id === pageId);

  useEffect(() => {
    dispatch(
      pageActions.getPages({
        request: { page: 0, limit: 100000 },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (!pages) return;

    if (page) {
      dispatch(
        noticeActions.getNotices({
          request: {
            page: 1,
            limit: 1000,
            pageId: page?.contentOf || page?.id,
          },
        })
      );
    } else {
      dispatch(
        noticeActions.getNotices({
          request: { page: 1, limit: 10000000 },
        })
      );
    }
  }, [dispatch, pages, page]);

  const publishedNotices = notices?.filter(
    (n) =>
      n?.isPublished === Publish.YES &&
      n?.isArchived === YesOrNo.NO &&
      (!Array.isArray(n?.isCopiedTo) ||
        n.isCopiedTo.length === 0 ||
        n.isApprovedByAdmin === YesOrNo.YES) &&
      new Date(n.date) <= today
  );

  const paramNotices =
    publishedNotices?.filter(
      (notice) =>
        notice?.pageId === pageId ||
        notice?.pageId.toString() === pageParams ||
        notice?.isCopiedTo.includes(Number(pageParams)) ||
        notice?.pageId === page?.contentOf ||
        notice?.isCopiedTo.includes(page?.contentOf)
    ) || [];

  const pageNotices =
    publishedNotices?.filter(
      (notice) =>
        notice?.pageId === pageId ||
        notice?.isCopiedTo.includes(pageId) ||
        notice?.pageId === page?.contentOf ||
        notice?.isCopiedTo.includes(page?.contentOf)
    ) || [];

  console.log("publishedNotices", publishedNotices);

  return { pageNotices, paramNotices };
}
