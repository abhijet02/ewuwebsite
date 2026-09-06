import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { useEffect, useMemo } from "react";
import { newsActions } from "@lib/slices/news/news.slice";
import { Publish, YesOrNo } from "@lib/services/slider/slider.service.type";
import { pageActions } from "@lib/slices/page/page.slice";
import { usePathname, useSearchParams } from "next/navigation";

export function useNewsData() {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  // Selectors with null checks
  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);

  const news = useAppSelector(
    (state) => state.news.getNewsResponse?.allnews
  )?.slice();

  const pageParams = searchParams.get("pageId");
  const pageId =
    pages?.find((page) => page.link === pathName)?.id ||
    pages?.find((page) => page.link.split("?")[0] === pathName)?.id;

  const page = pages?.find((page) => page.id === pageId);

  useEffect(() => {
    dispatch(
      pageActions.getPages({
        request: { page: 0, limit: 1000000 },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (!pages) return;

    if (page) {
      dispatch(
        newsActions.getNews({
          request: { page: 1, limit: 1000, pageId: page.id },
        })
      );
    } else {
      dispatch(
        newsActions.getNews({
          request: { page: 1, limit: 10000000 },
        })
      );
    }
  }, [dispatch, pages, page]);

  const sortedNews = useMemo(() => {
    return news?.sort((a, b) => {
      const aHasOrder = a.order > 0;
      const bHasOrder = b.order > 0;
      if (aHasOrder && bHasOrder) return a.order - b.order;
      if (aHasOrder) return -1;
      if (bHasOrder) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [news]);

  const publishedNews = sortedNews?.filter(
    (n) =>
      n?.isPublished === Publish.YES &&
      n?.isArchived === YesOrNo.NO &&
      (!Array.isArray(n?.isCopiedTo) ||
        n.isCopiedTo.length === 0 ||
        n.isApprovedByAdmin === YesOrNo.YES)
  );

  const pageNews =
    publishedNews?.filter(
      (newsItem) =>
        newsItem?.pageId === pageId ||
        newsItem?.isCopiedTo.includes(pageId) ||
        newsItem?.pageId === page?.contentOf ||
        newsItem?.isCopiedTo.includes(page?.contentOf)
    ) || [];

  const archivedNews = sortedNews?.filter(
    (n) => n?.isPublished === Publish.YES && n?.isArchived === YesOrNo.YES
  );

  return { news, sortedNews, publishedNews, archivedNews, pageNews, pageId };
}
