import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { YesOrNo } from "@lib/services/clubMember/clubMember.service.type";
import { clubActions } from "@lib/slices/club/club.slice";
import { clubActivityRankingActions } from "@lib/slices/club/clubActivityRanking.slice";
import { clubMemberActions } from "@lib/slices/clubMember/clubMember.slice";
import { pageActions } from "@lib/slices/page/page.slice";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const today = new Date();

export function useClubData() {
  const dispatch = useAppDispatch();

  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);

  const clubs = useAppSelector((state) => state.club.getClubsResponse?.allClub)
    ?.slice()
    .sort((a, b) => a?.order - b?.order);

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
      (!cm?.endDate || new Date(cm?.endDate) >= today)
  );

  const pathName = usePathname();

  const searchParams = useSearchParams();

  const pageId =
    pages?.find((page) => page.link == pathName)?.id ||
    pages?.find((page) => page.link.split("?")[0] === pathName)?.id;
  const pageParams = searchParams.get("pageId");

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
      clubActions.getClubs({
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

  const { slug } = useParams();

  const { id } = useParams();

  const club = clubs?.find(
    (club) => club.slug == slug || club.slug == id || club.id == page?.clubId
  );

  const clubActivityRanking = clubActivityRankings?.find(
    (clubActivityRanking) => clubActivityRanking.clubId == club?.id
  );

  const clubMember = clubMembers?.filter(
    (clubMember) => clubMember.clubId == club?.id
  );

  // find club page as object
  const clubPage = pages?.find((page) => page.id.toString() === pageParams);

  // find club page name parts as array - ['', 'pages', 'clubs', 'agro']
  const clubPageParts = clubPage?.link.split("/");

  // find club page name from the array - ['agro']
  const clubPageLengthSegment = clubPageParts?.[clubPageParts.length - 1];

  // find all data of the club
  const clubDetail = clubs?.find((club) => club.slug === clubPageLengthSegment);

  // Define styles that will use the club colors
  const dynamicStyles = {
    "--primary-color": club?.primaryColor || clubDetail?.primaryColor,
    "--secondary-color": club?.secondaryColor || clubDetail?.secondaryColor,
    "--primary-color-bg": club?.primaryColor || clubDetail?.primaryColor,
    "--secondary-color-bg": club?.secondaryColor || clubDetail?.secondaryColor,
    "--text-color": clubDetail?.primaryColor,
  } as React.CSSProperties;

  return { clubs, club, clubMember, clubActivityRanking, dynamicStyles };
}
