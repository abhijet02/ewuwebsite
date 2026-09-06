import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { Accordion } from "@lib/services/accordion/accordion.service.type";
import { Achievement } from "@lib/services/achievement/achievement.service.type";
import { CampusLife } from "@lib/services/campusLife/campusLife.service.type";
import { Description } from "@lib/services/description/description.service.type";
import { Event } from "@lib/services/event/event.service.type";
import { Faq } from "@lib/services/faq/faq.service.type";
import { Footer } from "@lib/services/footer/footer.service.type";
import { Gallery } from "@lib/services/gallery/gallery.service.type";
import { Header } from "@lib/services/header/header.service.type";
import { LatestNews } from "@lib/services/latestNews/latestNews.service.type";
import { Menu, MenuType } from "@lib/services/menu/menu.service.type";
import { News } from "@lib/services/news/news.service.type";
import { Notice } from "@lib/services/notice/notice.service.type";
import { Page } from "@lib/services/page/page.service.type";
import { Quote } from "@lib/services/quote/quote.service.type";
import {
  Publish,
  Slider,
  YesOrNo,
} from "@lib/services/slider/slider.service.type";
import { StudentsSay } from "@lib/services/studentsSay/studentsSay.service.type";
import { accordionActions } from "@lib/slices/accordion/accordion.slice";
import { achievementActions } from "@lib/slices/achievement/achievement.slice";
import { campusLifeActions } from "@lib/slices/campusLife/campusLife.slice";
import { descriptionActions } from "@lib/slices/description/description.slice";
import { eventActions } from "@lib/slices/event/event.slice";
import { faqActions } from "@lib/slices/faq/faq.slice";
import { footerActions } from "@lib/slices/footer/footer.slice";
import { galleryActions } from "@lib/slices/gallery/gallery.slice";
import { headerActions } from "@lib/slices/header/header.slice";
import { latestNewsActions } from "@lib/slices/latestNews/latestNews.slice";
import { menuActions } from "@lib/slices/menu/menu.slice";
import { newsActions } from "@lib/slices/news/news.slice";
import { noticeActions } from "@lib/slices/notice/notice.slice";
import { pageActions } from "@lib/slices/page/page.slice";
import { partnershipActions } from "@lib/slices/partnership/partnership.slice";
import { quickLinkActions } from "@lib/slices/quickLink/quickLink.slice";
import { quoteActions } from "@lib/slices/quote/quote.slice";
import { sliderActions } from "@lib/slices/slider/slider.slice";
import { studentsSayActions } from "@lib/slices/studentsSay/studentsSay.slice";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useCallback } from "react";

//Cache to prevent refetching on every hook call
const dataCache = {
  lastFetch: 0,
  cacheDuration: 5 * 60 * 1000, // 5 minutes
};

const today = new Date();

export function usePageData() {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  // Selectors with null checks
  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);
  const menus = useAppSelector((state) => state.menu.getMenusResponse?.menus)
    ?.slice()
    .sort((a, b) => a?.sort - b?.sort)
    .sort((a, b) => a?.depth - b?.depth);
  const menusWithPageIdZero = useAppSelector(
    (state) => state.menu.getMenusWithPageIdZeroResponse?.menusWithPageIdZero
  )
    ?.slice()
    .sort((a, b) => a?.sort - b?.sort)
    .sort((a, b) => a?.depth - b?.depth);
  const quickLinks = useAppSelector(
    (state) => state.quickLink.getQuickLinkResponse?.allQuickLinks
  );
  const headers = useAppSelector(
    (state) => state.header.getHeadersResponse?.allHeader
  );
  const footers = useAppSelector(
    (state) => state.footer.getFootersResponse?.allFooter
  );
  const sliders = useAppSelector(
    (state) => state.slider.getSlidersResponse?.sliders
  )?.filter((s) => s?.isPublished === Publish.YES);

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
  const news = useAppSelector((state) => state.news.getNewsResponse?.allnews)
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
  const events = useAppSelector((state) => state.event.getEventResponse?.events)
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
        // both have order = 0 → sort by fromDate desc (latest first)
        return new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime();
      }
    });
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

  const descriptions = useAppSelector(
    (state) => state.description.getDescriptionResponse?.descriptions
  );
  const accordions = useAppSelector(
    (state) => state.accordion.getAccordionsResponse?.accordions
  )?.filter((d) => d?.isPublished === Publish.YES);
  const gallerys = useAppSelector(
    (state) => state.gallery.getGallerysResponse?.galleries
  );

  const campusLifeData = useAppSelector(
    (state) => state.campusLife.getCampusLifesResponse?.campusLifeContents
  );

  const quotes = useAppSelector(
    (state) => state.quote.getQuotesResponse?.Quotes
  );
  const studentsSays = useAppSelector(
    (state) => state.studentsSay.getStudentsSaysResponse?.allfeedbackOfStudent
  )
    ?.filter((d) => d?.isPublished === Publish.YES)
    .sort((a, b) => a?.order - b?.order);
  const faqs = useAppSelector((state) => state.faq.getFaqResponse?.faqs)
    ?.filter((f) => f?.isPublished === Publish.YES)
    .sort((a, b) => a?.order - b?.order);
  const partnerships = useAppSelector(
    (state) => state.partnership.getPartnershipResponse?.patnerships
  )?.filter((s) => s?.isPublished === Publish.YES);

  // Calculate pageId, pageParams, and page synchronously without side effects
  const pageParams = searchParams.get("pageId");
  const pageId =
    pages?.find((page) => page.link === pathName)?.id ||
    pages?.find((page) => page.link.split("?")[0] === pathName)?.id;

  const page = pages?.find((page) => page.id === pageId);

  // Dispatch actions in useEffect to avoid side effects during render
  useEffect(() => {
    if (!pages) return; // Optional: wait for pages to load

    dispatch(
      menuActions.getMenusWithPageIdZero({
        request: {
          page: 0,
          limit: 10000,
        },
      })
    );

    dispatch(
      quickLinkActions.getQuickLink({
        request: {
          page: 0,
          limit: 500,
        },
      })
    );
  }, [dispatch, pages, pathName, searchParams]);

  // Optimized data fetching with caching
  const fetchData = useCallback(() => {
    const now = Date.now();

    if (now - dataCache.lastFetch < dataCache.cacheDuration) {
      return;
    }

    const essentialPromises = [
      dispatch(
        pageActions.getPages({
          request: { page: 0, limit: 1000 },
        })
      ),
      dispatch(
        menuActions.getMenus({
          request: { page: 0, limit: 1000 },
        })
      ),
      dispatch(
        headerActions.getHeaders({
          request: { page: 0, limit: 500 },
        })
      ),
      dispatch(
        footerActions.getFooters({
          request: { page: 0, limit: 500 },
        })
      ),
    ];

    Promise.all(essentialPromises).then(() => {
      setTimeout(() => {
        dispatch(
          quickLinkActions.getQuickLink({
            request: { page: 0, limit: 500 },
          })
        );
        dispatch(
          sliderActions.getSliders({
            request: { page: 1, limit: 1000 },
          })
        );

        dispatch(
          latestNewsActions.getLatestNews({
            request: { page: 1, limit: 10000 },
          })
        );
        dispatch(
          newsActions.getNews({
            request: { page: 1, limit: 10000 },
          })
        );
        dispatch(
          noticeActions.getNotices({
            request: { page: 1, limit: 10000 },
          })
        );
        dispatch(
          eventActions.getEvents({
            request: { page: 1, limit: 10000 },
          })
        );
        dispatch(
          achievementActions.getAchievements({
            request: { page: 1, limit: 10000 },
          })
        );

        dispatch(
          descriptionActions.getDescriptions({
            request: { page: 1, limit: 1000 },
          })
        );
        dispatch(
          accordionActions.getAccordions({
            request: { page: 1, limit: 1000 },
          })
        );
        dispatch(
          galleryActions.getGallerys({
            request: { page: 1, limit: 1000 },
          })
        );

        dispatch(
          campusLifeActions.getCampusLifes({
            request: { page: 1, limit: 100 },
          })
        );

        dispatch(
          quoteActions.getQuotes({
            request: { page: 1, limit: 100 },
          })
        );
        dispatch(
          studentsSayActions.getStudentsSays({
            request: { page: 1, limit: 500 },
          })
        );
        dispatch(
          faqActions.getFaq({
            request: { page: 1, limit: 1000 },
          })
        );
        dispatch(
          partnershipActions.getPartnerships({
            request: { page: 1, limit: 1000 },
          })
        );
      }, 100);
    });

    dataCache.lastFetch = now;
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoize filtered data

  function getAllParents(item: any, allMenus: any[], pages: Page[]) {
    const parents: any[] = [];
    let current = item[0];

    while (current) {
      // let sideBarParentPage = "";
      // sideBarParentPage =
      //   current.menuType === MenuType.SIDEBAR
      //     ? pages.find(
      //         (p) => p.id == pages.find((p) => p.link === pathName).groupPageId
      //       )?.link
      //     : "";
      // Decide which field to use for the parent
      let parentId = current?.parent;
      // current.menuType === MenuType.SIDEBAR
      //   ? current?.parent ||
      //     menus.find((e) => e.link == sideBarParentPage)?.id
      //   : current?.parent;

      if (!parentId) {
        break;
        // if (MenuType.SIDEBAR) {
        //   parentId = menus.find((e) => e.link == sideBarParentPage)?.id;
        // } else break;
      }

      const parentItem = allMenus.find((m) => m.id === parentId);

      if (!parentItem) break;

      parents.push(parentItem);
      current = parentItem;
    }

    parents.reverse();

    // Add "Home" if needed
    const homePage = pages?.find((p) => p.isHomePage === YesOrNo.YES);
    if (
      homePage &&
      (parents.length === 0 || parents[0].link !== homePage.link)
    ) {
      parents.unshift({
        id: "home",
        label: "Home",
        link: homePage.link,
      });
    }

    return parents;
  }

  const publishedLatestNews = latestNews?.filter((s) => {
    const entryDate = new Date(s.entryDate);
    const expiryDate = s.expierDate ? new Date(s.expierDate) : null;
    return (
      s.isPublished === Publish.YES && // only published
      new Date(entryDate) <= today && // started already
      (!expiryDate || new Date(expiryDate) >= today) // no expiry OR still active
    );
  });
  const publishedNews = news?.filter(
    (n) =>
      n?.isPublished === Publish.YES &&
      n?.isArchived === YesOrNo.NO &&
      (!Array.isArray(n?.isCopiedTo) ||
        n.isCopiedTo.length === 0 ||
        n.isApprovedByAdmin === YesOrNo.YES)
  );
  const archivedNews = news?.filter(
    (s) => s?.isPublished === Publish.YES && s?.isArchived === YesOrNo.YES
  );
  const publishedNotices = notices?.filter(
    (n) =>
      n?.isPublished === Publish.YES &&
      n?.isArchived === YesOrNo.NO &&
      (!Array.isArray(n?.isCopiedTo) ||
        n.isCopiedTo.length === 0 ||
        n.isApprovedByAdmin === YesOrNo.YES) &&
      new Date(n.date) <= today
  );
  const archivedNotices = notices?.filter(
    (n) => n?.isPublished === Publish.YES && n?.isArchived === YesOrNo.YES
  );
  const publishedEvents = events?.filter(
    (e) =>
      e?.isPublished === Publish.YES &&
      e?.isArchived === YesOrNo.NO &&
      (!Array.isArray(e?.isCopiedTo) ||
        e.isCopiedTo.length === 0 ||
        e.isApprovedByAdmin === YesOrNo.YES)
  );
  const archivedEvents = events?.filter(
    (e) => e?.isPublished === Publish.YES && e?.isArchived === YesOrNo.YES
  );
  const publishedAchievements = achievements?.filter(
    (a) => a?.isPublished === Publish.YES && a?.isArchived === YesOrNo.NO
  );
  const archivedAchievements = achievements?.filter(
    (a) =>
      a?.isPublished === Publish.YES &&
      a?.isArchived === YesOrNo.YES &&
      (!Array.isArray(a?.isCopiedTo) ||
        a.isCopiedTo.length === 0 ||
        a.isApprovedByAdmin === YesOrNo.YES)
  );

  const pageData = useMemo(() => {
    const menuLookup =
      menus?.reduce((acc, menu) => {
        const key = menu.pageId;
        if (!acc[key]) acc[key] = [];
        acc[key].push(menu);
        return acc;
      }, {} as Record<string, Menu[]>) || {};

    const currentPage = pages?.find((p) => p.id === pageId);
    const currentPageMenu = menus?.filter(
      (m) =>
        m.link === currentPage?.link &&
        (m.menuType === MenuType.HEADER || MenuType.SIDEBAR)
    );
    const parentMenus =
      currentPageMenu && getAllParents(currentPageMenu, menus, pages);

    const paramPage = pages?.find((p) => p.id.toString() === pageParams);

    let pageMenus: Menu[] = [];
    let paramMenus: Menu[] = [];

    if (currentPage?.groupPageId && currentPage.groupPageId !== 0) {
      pageMenus = menuLookup[currentPage.groupPageId] || [];
      if (pageMenus.length === 0) {
        pageMenus = menuLookup[pageId] || [];
      }
    } else {
      pageMenus = menuLookup[pageId] || [];
    }

    if (paramPage?.groupPageId && paramPage.groupPageId !== 0) {
      paramMenus = menuLookup[paramPage.groupPageId] || [];
      if (paramMenus.length === 0) {
        paramMenus = menuLookup[pageParams] || [];
      }
    } else {
      paramMenus = menuLookup[pageParams] || [];
    }

    return {
      pageMenus,
      paramMenus,
      currentPageMenu,
      parentMenus,
      pageHeaderMenus:
        pageMenus?.filter((menu: Menu) => menu.menuType === MenuType.HEADER) ||
        [],
      pageFooterMenus:
        pageMenus?.filter((menu: Menu) => menu.menuType === MenuType.FOOTER) ||
        [],
      pageSidebarMenus:
        pageMenus?.filter((menu: Menu) => menu.menuType === MenuType.SIDEBAR) ||
        [],
      defaultHeader: headers?.find((header: Header) => header.pageId === 0),
      pageHeader: headers?.find((header: Header) => header.pageId === pageId),
      paramHeader: pageParams
        ? headers?.find(
            (header: Header) => header.pageId === parseInt(pageParams)
          )
        : null,
      defaultFooter: footers?.find((footer: Footer) => footer.pageId === 0),
      pageFooter: footers?.find(
        (footer: Footer) =>
          footer.pageId === pageId || footer.pageId === page?.contentOf
      ),
      paramFooter: pageParams
        ? footers?.find(
            (footer: Footer) => footer.pageId.toString() === pageParams
          )
        : null,
      pageSliders:
        sliders
          ?.filter((slider: Slider) => slider.pageId === pageId)
          .sort((a, b) => a.id - b.id) || [],

      pageLatestNews:
        publishedLatestNews
          ?.filter(
            (ln: LatestNews) =>
              ln.pageId === pageId || ln?.isCopiedTo === pageId
          )
          .sort((a, b) => a.order - b.order) || [],
      pageNews:
        publishedNews?.filter(
          (newsItem: News) =>
            newsItem?.pageId === pageId ||
            newsItem?.isCopiedTo.includes(pageId) ||
            newsItem?.pageId === page?.contentOf ||
            newsItem?.isCopiedTo.includes(page?.contentOf)
        ) || [],
      paramNews:
        publishedNews?.filter(
          (newsItem: News) =>
            newsItem?.pageId === pageId ||
            newsItem?.pageId.toString() === pageParams ||
            newsItem?.isCopiedTo.includes(Number(pageParams)) ||
            newsItem?.pageId === page?.contentOf ||
            newsItem?.isCopiedTo.includes(page?.contentOf)
        ) || [],
      pageNotices:
        publishedNotices?.filter(
          (notice: Notice) =>
            notice?.pageId === pageId ||
            notice?.isCopiedTo.includes(pageId) ||
            notice?.pageId === page?.contentOf ||
            notice?.isCopiedTo.includes(page?.contentOf)
        ) || [],
      paramNotices:
        publishedNotices?.filter(
          (notice: Notice) =>
            notice?.pageId === pageId ||
            notice?.pageId.toString() === pageParams ||
            notice?.isCopiedTo.includes(Number(pageParams)) ||
            notice?.pageId === page?.contentOf ||
            notice?.isCopiedTo.includes(page?.contentOf)
        ) || [],
      pageEvents:
        publishedEvents?.filter(
          (event: Event) =>
            event?.pageId === pageId ||
            event?.isCopiedTo.includes(pageId) ||
            event?.pageId === page?.contentOf ||
            event?.isCopiedTo.includes(page?.contentOf)
        ) || [],
      paramEvents:
        publishedEvents?.filter(
          (event: Event) =>
            event?.pageId === pageId ||
            event?.pageId.toString() === pageParams ||
            event?.isCopiedTo.includes(Number(pageParams)) ||
            event?.pageId === page?.contentOf ||
            event?.isCopiedTo.includes(page?.contentOf)
        ) || [],
      pageAchievements:
        publishedAchievements?.filter(
          (achievement: Achievement) =>
            achievement?.pageId === pageId ||
            achievement?.isCopiedTo.includes(pageId) ||
            achievement?.pageId === page?.contentOf ||
            achievement?.isCopiedTo.includes(page?.contentOf)
        ) || [],
      paramAchievements:
        publishedAchievements?.filter(
          (achievement: Achievement) =>
            achievement?.pageId === pageId ||
            achievement.pageId.toString() === pageParams ||
            achievement?.isCopiedTo.includes(Number(pageParams)) ||
            achievement?.pageId === page?.contentOf ||
            achievement?.isCopiedTo.includes(page?.contentOf)
        ) || [],
      pageDescription:
        descriptions?.filter(
          (description: Description) => description.pageId === pageId
        ) || [],
      pageAccordions:
        accordions?.filter(
          (accordion: Accordion) => accordion.pageId === pageId
        ) || [],
      pageGallerys:
        gallerys?.filter((gallery: Gallery) => gallery.pageId === pageId) || [],

      pageCampusLifes:
        campusLifeData?.filter(
          (campusLife: CampusLife) => campusLife.pageId === pageId
        ) || [],

      pageQuotes:
        quotes?.filter((quote: Quote) => quote.pageId === pageId) || [],
      pageStudentsSays:
        studentsSays?.filter(
          (studentsSay: StudentsSay) => studentsSay.pageId === pageId
        ) || [],
      pageFaqs: faqs?.filter((faq: Faq) => faq.pageId === pageId) || [],
      pagePartnerships:
        partnerships?.filter(
          (p) => p.pageId === pageId || p.pageId === page?.groupPageId
        ) || [],
      paramPartnerships: pageParams
        ? partnerships?.filter((p) => p.pageId.toString() === pageParams) || []
        : [],
    };
  }, [
    pageId,
    pageParams,
    menus,
    headers,
    footers,
    sliders,
    latestNews,
    news,
    notices,
    events,
    achievements,
    descriptions,
    accordions,
    gallerys,
    quotes,
    studentsSays,
    faqs,
    partnerships,
  ]);

  return {
    // Raw data
    pages,
    menus,
    menusWithPageIdZero,
    quickLinks,
    headers,
    sliders,
    footers,
    notices,
    latestNews,
    news,
    events,
    quotes,
    studentsSays,
    achievements,
    descriptions,
    gallerys,
    faqs,
    partnerships,

    // Page info
    pageId,
    pageParams,
    page,

    // Filtered page data
    ...pageData,

    archivedNews,
    archivedNotices,
    archivedEvents,
    archivedAchievements,
  };
}
