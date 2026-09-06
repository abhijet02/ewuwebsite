import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { galleryActions } from "@lib/slices/gallery/gallery.slice";
import { useEffect } from "react";
import { usePageData } from "./usePageData";
import { usePathname } from "next/navigation";
import { categoryActions } from "@lib/slices/category/category.slice";

export function useGalleryData() {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(
    (state) => state.category.getCategoriesResponse?.categories
  );

  const gallerys = useAppSelector(
    (state) => state.gallery.getGallerysResponse?.galleries
  );

  const { pages } = usePageData();

  const pathName = usePathname();

  const pageId = pages?.find((page) => page.link === pathName)?.id;

  const convocationGallery = gallerys?.filter((gal) => gal?.pageId === pageId);

  const galleryHighlights = gallerys?.filter((gal) => gal?.pageId === pageId);

  useEffect(() => {
    dispatch(
      galleryActions.getGallerys({
        request: { page: 1, limit: 1000000 },
      })
    );
    dispatch(
      categoryActions.getCategories({
        request: { page: 1, limit: 1000000 },
      })
    );
  }, [dispatch]);

  return { gallerys, convocationGallery, galleryHighlights };
}
