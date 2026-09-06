import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { MenuType, YesOrNo } from "@lib/services/menu/menu.service.type";
import { Page } from "@lib/services/page/page.service.type";
import { menuActions } from "@lib/slices/menu/menu.slice";
import { pageActions } from "@lib/slices/page/page.slice";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useCommonSubBannerData() {
      const dispatch = useAppDispatch();
      const pathName = usePathname();
      const searchParams = useSearchParams();
    
      // Selectors with null checks
      const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);
      const menus = useAppSelector((state) => state.menu.getMenusResponse?.menus)
        ?.slice()
        .sort((a, b) => a?.sort - b?.sort)
        .sort((a, b) => a?.depth - b?.depth);

      const pageId =
        pages?.find((page) => page.link === pathName)?.id ||
        pages?.find((page) => page.link.split("?")[0] === pathName)?.id;

      

    useEffect(()=> {
          dispatch(
                pageActions.getPages({
                  request: { page: 0, limit: 100000 },
                })
              )
              dispatch(
                menuActions.getMenus({
                  request: { page: 0, limit: 100000 },
                })
              )
    },[dispatch])


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
         
        if( current?.menuType === MenuType.SIDEBAR){
          const parentPage = pages?.find((p) => p.id === currentPage?.groupPageId);
          if(parentPage){
              parents.unshift({
              id: parentPage?.id,
              label:parentPage?.label,
              link: parentPage.link,
            });
          }
       }
    
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
        const currentPage = pages?.find((p) => p.id === pageId);
        const currentPageMenu = menus?.filter(
          (m) =>
            m.link === currentPage?.link &&
            (m.menuType === MenuType.HEADER || MenuType.SIDEBAR)
        );
        const parentMenus =
          currentPageMenu && getAllParents(currentPageMenu, menus, pages);
          const parentPage = pages?.find((p) => p.id === currentPage?.groupPageId);

    return {
        parentMenus, parentPage
    }
}