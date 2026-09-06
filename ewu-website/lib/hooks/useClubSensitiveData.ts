import { usePathname } from "next/navigation";
import { useNewsData } from "./useAnnouncementData";
import { useClubData } from "./useClubData";
import { usePageData } from "./usePageData";

export function useClubSensitiveData() {
  const pathName = usePathname();

  // get pages
  const { pages } = usePageData();

  // get club data
  const { dynamicStyles, clubs, club } = useClubData();

  // find club page id dynamically
  const clubPageId = pages?.find((page) => page?.clubId === club?.id)?.id;

  // trim path name to get only club member part --> to make "Become a Member" button hide on club member page
  const clubMemberTrimmedPathName = pathName.split("/")[2];

  // find club by slug & path name for club member page
  const clubTitleMemberPage = clubs?.find(
    (club) => club.slug == pathName?.split("/")[3]
  );

  // get news, notice, event data dynamically
  const { filteredEvent, filteredNews, filteredNotice } = useNewsData();

  // get club news page (matching page id and isCopiedTo id)
  const clubNewsPage = pages?.find(
    (page) =>
      page?.id === filteredNews?.pageId ||
      filteredNews?.isCopiedTo?.includes(page?.id)
  );

  // get club event page (matching page id and isCopiedTo id)
  const clubEventPage = pages?.find(
    (page) =>
      page?.id === filteredEvent?.pageId ||
      filteredEvent?.isCopiedTo?.includes(page?.id)
  );

  // get club notice page (matching page id and isCopiedTo id)
  const clubNoticePage = pages?.find(
    (page) =>
      page?.id === filteredNotice?.pageId ||
      filteredNotice?.isCopiedTo?.includes(page?.id)
  );

  // get club event page title
  const clubEventDetailsPageTitle = clubs?.find(
    (club) => club?.id === clubEventPage?.clubId
  )?.title;

  // get club news page title
  const clubNewsDetailsPageTitle = clubs?.find(
    (club) => club?.id === clubNewsPage?.clubId
  )?.title;

  // get club notice page title
  const clubNoticeDetailsPageTitle = clubs?.find(
    (club) => club?.id === clubNoticePage?.clubId
  )?.title;

  return {
    dynamicStyles,
    club,
    clubs,
    clubPageId,
    clubMemberTrimmedPathName,
    clubTitleMemberPage,
    filteredEvent,
    filteredNews,
    filteredNotice,
    clubEventPage,
    clubNewsPage,
    clubNoticePage,
    clubEventDetailsPageTitle,
    clubNewsDetailsPageTitle,
    clubNoticeDetailsPageTitle,
  };
}
