import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { Publish } from "@lib/services/latestNews/latestNews.service.type";
import { pageActions } from "@lib/slices/page/page.slice";
import { partnershipActions } from "@lib/slices/partnership/partnership.slice";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function usePatnershipData() {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const today = new Date();
  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);

    const partnerships = useAppSelector(
      (state) => state.partnership.getPartnershipResponse?.patnerships
    )?.filter((s) => s?.isPublished === Publish.YES);

    const pageParams = searchParams.get("pageId");
    const pageId =
    pages?.find((page) => page.link === pathName)?.id ||
    pages?.find((page) => page.link.split("?")[0] === pathName)?.id;

    const page = pages?.find((page) => page.id === pageId);

    useEffect(()=>{
       dispatch(
            pageActions.getPages({
              request: { page: 0, limit: 100000 },
            })
          );
      dispatch(
          partnershipActions.getPartnerships({
            request: { page: 1, limit: 1000 },
          })
        );
    },[dispatch])

    const pagePartnerships =partnerships?.filter(
          (p) => p.pageId === pageId || p.pageId === page?.groupPageId
        ) || [];

    
    return {pageId, pagePartnerships }

}