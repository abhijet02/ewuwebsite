import { useAppDispatch } from "@lib/hooks";
import { RootState } from "@lib/root.reducer";
import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import {
  Menu,
  MenuPosition,
  MenuType,
  YesOrNo,
} from "@lib/services/menu/menu.service.type";
import { useMenuData } from "./useMenuData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { accessibilityActions } from "@lib/slices/accessibility/accessibility.slice";

export function useMenuBuild() {
  const dispatch = useAppDispatch();

  const { menus, defaultMenus } = useMenuData();

  const isDark = useSelector((state: RootState) => state.accessibility.theme);
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);
  const isZoomed = useSelector((state: RootState) => state.accessibility.zoom);
  const showPhoto = useSelector(
    (state: RootState) => state.accessibility.photo
  );

  const [isQuickLink, setIsQuickLink] = useState(true);

  const themeClick = () => {
    dispatch(accessibilityActions.toggleMode());
  };

  const staticClick = () => {
    dispatch(accessibilityActions.toggleStatic());
  };

  const zoomClick = () => {
    dispatch(accessibilityActions.toggleZoom());
  };

  const photoClick = () => {
    dispatch(accessibilityActions.togglePhotoView());
  };

  const resetAccessibility = () => {
    dispatch(accessibilityActions.resetTheme());
    dispatch(accessibilityActions.resetStatic());
    dispatch(accessibilityActions.resetZoom());
    dispatch(accessibilityActions.resetPhotoView());
  };

  const quickLinks = () => {
    setIsQuickLink(false);
  };

  const quickLinksBack = () => {
    setIsQuickLink(true);
  };

  const getHeaderMenus = (menus: Menu[]) => {
    return menus?.filter((m) => m.menuType == MenuType.HEADER && m.pageId == 0);
  };

  const sortParentMenus = (menus: Menu[]) => {
    const parentMenus = menus?.filter((m) => m.parent === 0);
    return parentMenus?.sort((a, b) => a.sort - b.sort);
  };

  const getChildMenus = (parentId: number, menus: Menu[]) => {
    const childMenus = menus?.filter((m) => m.parent === parentId);
    return childMenus.sort((a, b) => a.depth - b.depth);
  };

  const hasChild = (menu: Menu, menus: Menu[]) => {
    const filteredMenus = menus?.filter((m) => m.parent == menu.id);
    return filteredMenus.length > 0 ? true : false;
  };

  const getTopMenus = (menus: Menu[]) => {
    return menus?.filter((m) => m.menuPosition == MenuPosition.TOP);
  };

  const getBottomMenus = (menus: Menu[]) => {
    return menus?.filter((m) => m.menuPosition == MenuPosition.BOTTOM);
  };

  const getMegaMenus = (menus: Menu[]) => {
    return menus?.filter((m) => m.isMegaMenu === YesOrNo.YES);
  };

  const getNotMegaMenus = (menus: Menu[]) => {
    return menus?.filter((m) => m.isMegaMenu === YesOrNo.NO);
  };

  function skipSecondLevelIfThreeLevels(parentId, menus) {
    const firstLevelChildren = getChildMenus(parentId, menus);

    return firstLevelChildren.flatMap((child) => {
      const grandchildren = getChildMenus(child.id, menus);
      // If the child has grandchildren, skip it and return grandchildren
      return grandchildren.length > 0 ? grandchildren : [child];
    });
  }

  const renderMenus = (menus: Menu[]) => {
    return sortParentMenus(menus)?.map((m) =>
      m.isMegaMenu === YesOrNo.YES ? (
        <li key={m.id} className="nav-item">
          <a
            className="nav-link quick-btn nav-item-trans dropdown-toggle"
            href="#"
            data-bs-toggle="offcanvas"
            data-bs-target={`#${m.label}`}
            aria-controls={m.label}
          >
            {m.label}
          </a>
        </li>
      ) : (
        <li
          key={m.id}
          className={hasChild(m, menus) ? "nav-item dropdown" : "nav-item"}
        >
          {hasChild(m, menus) && (
            <Link
              className={"nav-link dropdown-toggle"}
              href={m.link}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {m.label}
            </Link>
          )}
          {!hasChild(m, menus) && (
            <Link className={"nav-link"} href={m.link}>
              {m.label}
            </Link>
          )}
          {hasChild(m, menus) && (
            <ul
              className={
                getBottomMenus(menus)?.length > 4
                  ? "dropdown-menu dropdown-menu-end"
                  : "dropdown-menu"
              }
            >
              {getChildMenus(m.id, menus).map((m) => (
                <li key={m.id}>
                  <Link className="dropdown-item" href={m.link}>
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      )
    );
  };

  const renderMenusTwo = (menus: Menu[]) => {
    return sortParentMenus(menus).map((m) =>
      m.isMegaMenu === YesOrNo.YES ? (
        <li key={m.id}>
          <div className="dropdown onhover-dropdown-custom">
            <Link
              className="dropdown-hover"
              href={m.link}
              data-bs-toggle="offcanvas"
              data-bs-target={`#${m.label}`}
              aria-controls={m.label}
            >
              {m.label}
              <Icon
                icon="iconamoon:arrow-down-2-light"
                width="16"
                height="16"
              />
            </Link>
          </div>
        </li>
      ) : (
        <li key={m.id}>
          <div className="dropdown onhover-dropdown-custom">
            <Link className="dropdown-hover" href="#">
              {m.label}
              {hasChild(m, menus) && (
                <Icon
                  icon="iconamoon:arrow-down-2-light"
                  width="16"
                  height="16"
                />
              )}
            </Link>
            {hasChild(m, menus) && (
              <ul
                className={
                  getBottomMenus(menus)?.length > 4
                    ? "dropdown-menu custom-dropdown end-0"
                    : "dropdown-menu custom-dropdown"
                }
              >
                {getChildMenus(m.id, menus).map((child) => (
                  <li key={child.id}>
                    <Link className="dropdown-item" href={child.link}>
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      )
    );
  };

  const renderMenusThree = (menus: Menu[]) => {
    return sortParentMenus(menus).map((m) =>
      m.isMegaMenu === YesOrNo.YES ? (
        <li key={m.id}>
          <div className="dropdown onhover-dropdown-custom">
            <Link
              className="dropdown-hover"
              href={m.link}
              data-bs-toggle="offcanvas"
              data-bs-target={`#${m.label}`}
              aria-controls={m.label}
            >
              {m.label}
              <Icon
                icon="iconamoon:arrow-down-2-light"
                width="16"
                height="16"
              />
            </Link>
          </div>
        </li>
      ) : (
        <li key={m.id}>
          <div className="dropdown onhover-dropdown-custom">
            <Link className="dropdown-hover" href="#">
              {m.label}
              {hasChild(m, menus) && (
                <Icon
                  icon="iconamoon:arrow-down-2-light"
                  width="16"
                  height="16"
                />
              )}
            </Link>
            {hasChild(m, menus) && (
              <ul
                className={
                  getBottomMenus(menus)?.length > 4
                    ? "dropdown-menu custom-dropdown end-0"
                    : "dropdown-menu custom-dropdown"
                }
              >
                {getChildMenus(m.id, menus).map((child) => (
                  <li key={child.id}>
                    <Link className="dropdown-item" href={child.link}>
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      )
    );
  };

  return {
    isDark,
    isStatic,
    isZoomed,
    showPhoto,
    themeClick,
    staticClick,
    zoomClick,
    photoClick,
    resetAccessibility,
    menus,
    defaultMenus,
    isQuickLink,
    getHeaderMenus,
    sortParentMenus,
    getChildMenus,
    hasChild,
    getTopMenus,
    getBottomMenus,
    getMegaMenus,
    getNotMegaMenus,
    renderMenus,
    renderMenusTwo,
    renderMenusThree,
    skipSecondLevelIfThreeLevels,
    quickLinks,
    quickLinksBack,
  };
}
