import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { YesOrNo } from "@lib/services/clubMember/clubMember.service.type";
import { clubActions } from "@lib/slices/club/club.slice";
import { clubActivityRankingActions } from "@lib/slices/club/clubActivityRanking.slice";
import { clubMemberActions } from "@lib/slices/clubMember/clubMember.slice";
import { pageActions } from "@lib/slices/page/page.slice";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { usePageData } from "./usePageData";
import { useClubData } from "./useClubData";

const today = new Date();

export function useClubVitalData() {
  const dispatch = useAppDispatch();

  const { clubs } = useClubData();

  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);

  const clubActivityRankings = useAppSelector(
    (state) =>
      state.clubActivityRanking.getClubActivityRankingsResponse
        ?.allClubActivityRanking
  );

  const clubMembers = useAppSelector(
    (state) => state.clubMember.getClubMembersResponse?.clubMembers
  )?.filter(
    (cm) =>
      cm?.isApproved === YesOrNo.YES &&
      // (!cm?.startdate || new Date(cm?.startdate) <= today) &&
      (!cm?.endDate || new Date(cm?.endDate) <= today)
  );

  const pathName = usePathname();
  const { slug } = useParams();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const pageParams = searchParams.get("pageId");

  const pageId =
    pages?.find((page) => page.link == pathName)?.id ||
    pages?.find((page) => page.link.split("?")[0] === pathName)?.id;

  const page = pages?.find((page) => page.id === pageId);

  useEffect(() => {
    dispatch(
      pageActions.getPages({
        request: {
          page: 0,
          limit: 500,
        },
      })
    );

    dispatch(
      clubActivityRankingActions.getClubActivityRankings({
        request: {
          page: 0,
          limit: 500,
        },
      })
    );

    dispatch(
      clubMemberActions.getClubMembers({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );
  }, [dispatch]);

  const club = clubs?.find(
    (club) => club.slug == slug || club.slug == id || club.id == page?.clubId
  );

  const clubActivityRanking = clubActivityRankings?.find(
    (clubActivityRanking) => clubActivityRanking.clubId == club?.id
  );

  const clubMember = clubMembers?.filter(
    (clubMember) => clubMember.clubId == club?.id
  );

  const dynamicStyles = {
    "--primary-color": club?.primaryColor,
    "--secondary-color": club?.secondaryColor,
    "--primary-color-bg": club?.primaryColor,
    "--secondary-color-bg": club?.secondaryColor,
    "--text-color": club?.primaryColor,
  } as React.CSSProperties;

  return {
    clubs,
    clubActivityRankings,
    clubMembers,
    club,
    clubMember,
    clubActivityRanking,
    dynamicStyles,
  };
}
