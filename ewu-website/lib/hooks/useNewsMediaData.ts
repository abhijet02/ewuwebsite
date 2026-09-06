import { useAppDispatch, useAppSelector } from "@lib/hooks";
import {
  Publish,
  YesOrNo,
} from "@lib/services/newsMedia/newsMedia.service.type";
import { categoryActions } from "@lib/slices/category/category.slice";
import { newsMediaActions } from "@lib/slices/newsMedia/newsMedia.slice";
import { useEffect, useMemo } from "react";

export const useNewsMediaData = () => {
  const dispatch = useAppDispatch();

  const newsMediaData = useAppSelector(
    (state) => state.newsMedia.getNewsMediaResponse?.allNewsMedia
  );

  const categories = useAppSelector(
    (state) => state.category.getCategoriesResponse?.categories
  );

  useEffect(() => {
    dispatch(
      newsMediaActions.getNewsMedia({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );
    dispatch(
      categoryActions.getCategories({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );
  }, [dispatch]);

  // Filter archived news
  const archivedNewsMediaData = newsMediaData?.filter(
    (item) =>
      item?.isPublished === Publish.YES && item?.isArchived === YesOrNo.YES
  );

  // Extract unique news media categories
  const newsMediaCategories = useMemo(() => {
    if (!newsMediaData || !categories) return [];

    // Get category IDs from news items
    const categoryIds = newsMediaData
      .filter(
        (item) =>
          item?.isPublished === Publish.YES && item?.isArchived === YesOrNo.NO
      )
      .map((item) => Number(item?.category)) // convert string IDs to number
      .filter(Boolean);

    // Match IDs with category names from categories array
    const matchedNames = categoryIds
      .map((id) => {
        const match = categories?.find((cat) => cat?.id === id);
        return match ? match.category : null;
      })
      .filter(Boolean); // remove nulls

    // Remove duplicates and add "All"
    return ["All", ...Array.from(new Set(matchedNames))];
  }, [newsMediaData, categories]);

  return {
    newsMediaData,
    archivedNewsMediaData,
    newsMediaCategories,
    categories,
  };
};
