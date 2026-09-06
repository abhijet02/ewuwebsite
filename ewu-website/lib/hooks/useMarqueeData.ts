import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { Publish } from "@lib/services/latestNews/latestNews.service.type";
import { latestNewsActions } from "@lib/slices/latestNews/latestNews.slice";
import { pageActions } from "@lib/slices/page/page.slice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useMarqueeData() {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const today = new Date();
  const pages = useAppSelector(
    (state) => state.page.getPageByLinkResponse?.pageByLink
  );

  const latestNews = useAppSelector(
    (state) => state.latestNews.getLatestNewsResponse?.latestNews
  )
    ?.slice()
    .sort((a, b) => {
      const aHasOrder = a.order > 0;
      const bHasOrder = b.order > 0;

      if (aHasOrder && bHasOrder) {
        // both have order > 0 → sort by order (asc)
        return a.order - b.order;
      } else if (aHasOrder && !bHasOrder) {
        // a has order, b doesn't → a comes first
        return -1;
      } else if (!aHasOrder && bHasOrder) {
        // b has order, a doesn't → b comes first
        return 1;
      } else {
        // both have order === 0 → sort by date (latest first)
        return (
          new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime()
        );
      }
    });

  const pageId =
    pages?.find((page) => page.link === pathName)?.id ||
    pages?.find((page) => page.link.split("?")[0] === pathName)?.id;

  useEffect(() => {
    if (pathName) {
      dispatch(
        pageActions.getPageByLink({
          request: { link: pathName },
        })
      );
    }

    dispatch(
      latestNewsActions.getLatestNews({
        request: { page: 1, limit: 100000 },
      })
    );
  }, [dispatch, pathName]);

  const publishedLatestNews = latestNews?.filter((s) => {
    const entryDate = new Date(s.entryDate);
    const expiryDate = s.expierDate ? new Date(s.expierDate) : null;
    return (
      s.isPublished === Publish.YES && // only published
      new Date(entryDate) <= today && // started already
      (!expiryDate || new Date(expiryDate) >= today) // no expiry OR still active
    );
  });

  const pageLatestNews =
    publishedLatestNews
      ?.filter((ln) => ln.pageId === pageId || ln?.isCopiedTo === pageId)
      .sort((a, b) => a.order - b.order) || [];

  return { pageLatestNews };
}
