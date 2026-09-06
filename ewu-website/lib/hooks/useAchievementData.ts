import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { useEffect, useMemo } from "react";
import { Publish, YesOrNo } from "@lib/services/slider/slider.service.type";
import { pageActions } from "@lib/slices/page/page.slice";
import { usePathname, useSearchParams } from "next/navigation";
import { achievementActions } from "@lib/slices/achievement/achievement.slice";

export function useAchievementData() {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  // Selectors with null checks
  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);

  const achievements = useAppSelector(
    (state) => state.achievement.getAchievementsResponse?.allAchievements
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
  const publishedAchievements = achievements?.filter(
    (a) => a?.isPublished === Publish.YES && a?.isArchived === YesOrNo.NO
  );

  useEffect(() => {
    dispatch(
      pageActions.getPages({
        request: { page: 0, limit: 10000 },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (!pages) return;

    if (page) {
      dispatch(
        achievementActions.getAchievements({
          request: { page: 1, limit: 1000, pageId: page.id },
        })
      );
    } else {
      dispatch(
        achievementActions.getAchievements({
          request: { page: 1, limit: 10000000 },
        })
      );
    }
  }, [dispatch, pages, page]);

  const pageAchievements =
    publishedAchievements?.filter(
      (achievement) =>
        achievement?.pageId === pageId ||
        achievement?.isCopiedTo.includes(pageId) ||
        achievement?.pageId === page?.contentOf ||
        achievement?.isCopiedTo.includes(page?.contentOf)
    ) || [];
  const paramAchievements =
    publishedAchievements?.filter(
      (achievement) =>
        achievement?.pageId === pageId ||
        achievement.pageId.toString() === pageParams ||
        achievement?.isCopiedTo.includes(Number(pageParams)) ||
        achievement?.pageId === page?.contentOf ||
        achievement?.isCopiedTo.includes(page?.contentOf)
    ) || [];

  return { pageAchievements, pageId };
}
