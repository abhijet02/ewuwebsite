"use client";

import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { Menu, MenuType } from "@lib/services/menu/menu.service.type";
import { menuActions } from "@lib/slices/menu/menu.slice";
import { pageActions } from "@lib/slices/page/page.slice";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo/*, useCallback*/ } from "react";
import { headerActions } from "@lib/slices/header/header.slice";
import { Header } from "@lib/services/header/header.service.type";

// const menuCache = {
//   lastFetch: 0,
//   cacheDuration: 5 * 60 * 1000, // 5 minutes
// };

export function useMenuData() {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);
  const menus = useAppSelector((state) => state.menu.getMenusResponse?.menus)
    ?.slice()
    .sort((a, b) => a?.sort - b?.sort)
    .sort((a, b) => a?.depth - b?.depth);
  const defaultMenus = useAppSelector(
    (state) => state.menu.getMenusWithPageIdZeroResponse?.menusWithPageIdZero
  )
    ?.slice()
    .sort((a, b) => a?.sort - b?.sort)
    .sort((a, b) => a?.depth - b?.depth);

  const headers = useAppSelector(
    (state) => state.header.getHeadersResponse?.allHeader
  );

  const pageParams = searchParams.get("pageId");
  const pageId =
    pages?.find((p) => p.link === pathName)?.id ||
    pages?.find((p) => p.link.split("?")[0] === pathName)?.id;
  const page = pages?.find((p) => p.id === pageId);

  // const fetchMenus = useCallback(() => {
  //   const now = Date.now();
  //   if (now - menuCache.lastFetch < menuCache.cacheDuration) return;

  //   Promise.all([
  //     dispatch(
  //       pageActions.getPages({
  //         request: { page: 0, limit: 1000 },
  //       })
  //     ),
  //     dispatch(
  //       menuActions.getMenus({
  //         request: { page: 0, limit: 1000 },
  //       })
  //     ),
  //     dispatch(
  //       headerActions.getHeaders({
  //         request: { page: 0, limit: 500 },
  //       })
  //     ),
  //     dispatch(
  //       menuActions.getMenusWithPageIdZero({
  //         request: { page: 0, limit: 1000 },
  //       })
  //     ),
  //   ]);

  //   menuCache.lastFetch = now;
  // }, [dispatch]);

  useEffect(() => {
    //fetchMenus();
      // if(pathName){
        dispatch(
          pageActions.getPages({
            request: { page: 1, limit: 1000}
          })
        )
      //}
      dispatch(
        menuActions.getMenus({
          request: { page: 0, limit: 1000 },
        })
      ),
      dispatch(
        headerActions.getHeaders({
          request: { page: 0, limit: 500 },
        })
      )
      dispatch(
        menuActions.getMenusWithPageIdZero({
          request: { page: 0, limit: 1000 },
        })
      )
  }, [dispatch, pathName]);


  const defaultHeader = headers?.find((header: Header) => header.pageId === 0);

  const menuData = useMemo(() => {
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

    // const parentMenus =
    // currentPageMenu && getAllParents(currentPageMenu, menus, pages);

    let pageMenus: Menu[] = [];
    let paramMenus: Menu[] = [];

    if (currentPage?.groupPageId && currentPage.groupPageId !== 0) {
      pageMenus = menuLookup[currentPage.groupPageId] || [];
      if (pageMenus.length === 0) pageMenus = menuLookup[pageId] || [];
    } else {
      pageMenus = menuLookup[pageId] || [];
    }

    if (pageParams) {
      const paramPage = pages?.find((p) => p.id.toString() === pageParams);
      if (paramPage?.groupPageId && paramPage.groupPageId !== 0) {
        paramMenus = menuLookup[paramPage.groupPageId] || [];
        if (paramMenus.length === 0) paramMenus = menuLookup[pageParams] || [];
      } else {
        paramMenus = menuLookup[pageParams] || [];
      }
    }

    return {
      pageMenus,
      paramMenus,
      currentPageMenu,
      //parentMenus,
      pageHeaderMenus:
        pageMenus?.filter((menu: Menu) => menu.menuType === MenuType.HEADER) ||
        [],
      pageFooterMenus:
        pageMenus?.filter((menu: Menu) => menu.menuType === MenuType.FOOTER) ||
        [],
      pageSidebarMenus:
        pageMenus?.filter((menu: Menu) => menu.menuType === MenuType.SIDEBAR) ||
        [],

      // parentPageSidebarMenus:
      //   menus?.filter(
      //     (menu: Menu) => menu.link === parentPageForSidebar?.link
      //   ) || [],
    };
  }, [menus, pages, pageId, pageParams]);

  return {
    menus,
    pages,
    defaultMenus,
    defaultHeader,
    pageId,
    pageParams,
    page,
    ...menuData,
  };
}
