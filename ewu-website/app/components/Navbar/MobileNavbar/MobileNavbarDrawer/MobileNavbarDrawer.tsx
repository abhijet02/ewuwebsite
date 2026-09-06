"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useMenuBuild } from "@lib/hooks/useMenuBuild";
import { useMenuData } from "@lib/hooks/useMenuData";
import mobileLogoLight from "@/app/assets/mobile-logo-light.png";
import mobileLogoDark from "@/app/assets/mobile-logo-dark.png";
import { YesOrNo } from "@lib/services/slider/slider.service.type";
import "./MobileNavbarDrawer.scss";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { quickLinkActions } from "@lib/slices/quickLink/quickLink.slice";

interface MenuItem {
  id: number;
  label: string;
  link: string;
  parent: number;
  mobileSort?: number;
  menuType: string;
  isMegaMenu?: YesOrNo;
}

interface MobileNavbarDrawerProps {
  show: boolean;
  closeDrawer: () => void;
  onSearchClick: () => void;
}

const MobileNavbarDrawer: FC<MobileNavbarDrawerProps> = ({
  show,
  closeDrawer,
  onSearchClick,
}) => {
  const { isDark } = useMenuBuild();
  const { defaultHeader: header, defaultMenus: menus } = useMenuData();
  const dispatch = useAppDispatch();

  const quickLinks =
    useAppSelector(
      (state) => state.quickLink.getQuickLinkResponse?.allQuickLinks,
    ) || [];
  useEffect(() => {
    dispatch(
      quickLinkActions.getQuickLink({
        request: {
          page: 1,
          limit: 500,
        },
      }),
    );
  }, [dispatch]);

  const [mounted, setMounted] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const [navigationStack, setNavigationStack] = useState<MenuItem[]>([]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (show) {
      setMounted(true);
      timeout = setTimeout(() => setDrawerVisible(true), 50);
    } else {
      setDrawerVisible(false);
      timeout = setTimeout(() => setMounted(false), 300);
      setNavigationStack([]);
    }

    return () => clearTimeout(timeout);
  }, [show]);

  if (!mounted) return null;

  const logoSrc =
    header?.headerLogoUrl ??
    (isDark === "Dark" ? mobileLogoLight : mobileLogoDark);

  const currentParentId =
    navigationStack.length === 0
      ? 0
      : navigationStack[navigationStack.length - 1].id;

  const footerMenus: MenuItem[] = [
    {
      id: 9991,
      label: "Career",
      link: "/pages/career",
      parent: 9990,
      menuType: "FOOTER",
    },
    {
      id: 9992,
      label: "Admission",
      link: "/pages/admission",
      parent: 9990,
      menuType: "FOOTER",
    },
  ];

  const getChildren = (parentId: number) => {
    // Quick Links first layer
    if (parentId === 9999) {
      const categories = Array.from(new Set(quickLinks.map((q) => q.category)));
      return categories.map(
        (cat, index): MenuItem => ({
          id: 10000 + index,
          label: cat as any,
          link: "#",
          parent: 9999,
          menuType: "QUICK_LINK_CATEGORY",
        }),
      );
    }

    // Quick Links second layer
    if (parentId >= 10000 && parentId < 20000) {
      const category = navigationStack.find((n) => n.id === parentId)?.label;
      if (!category) return [];
      const links = quickLinks.filter((q) => q.category === category);
      return links.map(
        (link): MenuItem => ({
          id: link.id,
          label: link.label as any,
          link: link.url as any,
          parent: parentId,
          menuType: "QUICK_LINK_ITEM",
        }),
      );
    }

    // Normal menus
    let children =
      menus?.filter(
        (m: MenuItem) => m.parent === parentId && m.menuType === "HEADER",
      ) ?? [];

    if (parentId === 9990) {
      children = footerMenus as any;
    }

    return children.sort(
      (a, b) => (a.mobileSort ?? 9999) - (b.mobileSort ?? 9999),
    );
  };

  // Fix: check if Quick Link categories have children
  const hasChildren = (menu: MenuItem) => {
    if (menu.menuType === "QUICK_LINK_CATEGORY") {
      const links = quickLinks.filter((q) => q.category === menu.label);
      return links.length > 0;
    }

    if (menu.menuType === "QUICK_LINK_ITEM") return false;

    return (
      !!menus?.some(
        (m: MenuItem) => m.parent === menu.id && m.menuType === "HEADER",
      ) ||
      menu.id === 9990 || // Apply Now
      menu.id === 9999
    ); // Quick Links button
  };

  const handleItemClick = (item: MenuItem) => {
    if (hasChildren(item)) {
      setNavigationStack((s) => [...s, item]);
    } else {
      closeDrawer();
    }
  };

  const handleBack = () => {
    setNavigationStack((s) => {
      if (s.length <= 1) return [];
      return s.slice(0, s.length - 1);
    });
  };

  const handleClose = () => {
    setNavigationStack([]);
    closeDrawer();
  };

  const currentMenus = getChildren(currentParentId);

  const openQuickLinks = () => {
    setNavigationStack((s) => [
      ...s,
      {
        id: 9999,
        label: "Quick Links",
        link: "",
        parent: 0,
        menuType: "HEADER",
      },
    ]);
  };

  return (
    <div
      className={`mobile-navbar-drawer-overlay ${drawerVisible ? "open" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`mobile-navbar-drawer-body ${drawerVisible ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== HEADER ===== */}
        <div className="mobile-navbar-drawer-header">
          <Link
            className="mobile-navbar-drawer-logo"
            href={header?.headerLogoLink || "/"}
          >
            <Image src={logoSrc} fill sizes="100vw" alt="Logo" />
          </Link>

          <div className="mobile-navbar-button-group">
            <Link
              className="d-flex align-items-center justify-content-center mobile-navbar-drawer-quick-button-body"
              href="/pages/login"
            >
              <Icon icon="si:user-line" width="20" height="20" />
            </Link>

            <Link
              href="/pages/helpdesk"
              className="d-flex align-items-center justify-content-center mobile-navbar-drawer-quick-button-body"
            >
              <Icon icon="la:question" width="24" height="24" />
            </Link>

            <div
              className="d-flex align-items-center justify-content-center mobile-navbar-drawer-quick-button-body"
              onClick={() => onSearchClick?.()}
            >
              <Icon icon="tabler:search" width="24" height="24" />
            </div>

            <div
              className="d-flex align-items-center justify-content-center"
              onClick={handleClose}
            >
              <Icon icon="oui:cross" width="24" height="24" />
            </div>
          </div>
        </div>

        {/* ===== NESTED HEADER ===== */}
        {navigationStack.length > 0 && (
          <div className="mobile-navbar-nested-header" onClick={handleBack}>
            <div className="level-header-left">
              <div className="d-flex align-items-center justify-content-center mobile-navbar-drawer-quick-button-body">
                <Icon
                  icon="material-symbols:arrow-back-ios-new-rounded"
                  width="20"
                  height="20"
                />
              </div>
            </div>

            <div className="level-header-title">
              {navigationStack[navigationStack.length - 1].label}
            </div>
            <div className="level-header-right" />
          </div>
        )}

        {/* ===== MENU ITEMS ===== */}
        <div className="mobile-navbar-drawer-data-body">
          {currentMenus.length > 0 ? (
            currentMenus.map((menu, index) => {
              const itemHasChildren = hasChildren(menu);

              if (menu.menuType === "QUICK_LINK_CATEGORY") {
                return (
                  <div key={menu.id}>
                    <div
                      className="mobile-navbar-drawer-item"
                      onClick={() => handleItemClick(menu)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          handleItemClick(menu);
                      }}
                    >
                      <span>{menu.label}</span>
                      <Icon
                        icon="solar:alt-arrow-right-bold-duotone"
                        width="20"
                        height="20"
                      />
                    </div>
                    {index < currentMenus.length - 1 && (
                      <div className="menu-separator-line" />
                    )}
                  </div>
                );
              }

              if (menu.menuType === "QUICK_LINK_ITEM") {
                return (
                  <div key={menu.id}>
                    <Link
                      href={menu.link}
                      className="mobile-navbar-drawer-item"
                      onClick={handleClose}
                    >
                      <span>{menu.label}</span>
                    </Link>
                    {index < currentMenus.length - 1 && (
                      <div className="menu-separator-line" />
                    )}
                  </div>
                );
              }

              if (itemHasChildren) {
                return (
                  <div key={menu.id}>
                    <div
                      className="mobile-navbar-drawer-item"
                      onClick={() => handleItemClick(menu)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          handleItemClick(menu);
                      }}
                    >
                      <span>{menu.label}</span>
                      <Icon
                        icon="solar:alt-arrow-right-bold-duotone"
                        width="20"
                        height="20"
                      />
                    </div>
                    {index < currentMenus.length - 1 && (
                      <div className="menu-separator-line" />
                    )}
                  </div>
                );
              }

              return (
                <div key={menu.id}>
                  <Link
                    href={menu.link}
                    className="mobile-navbar-drawer-item"
                    onClick={handleClose}
                  >
                    <span>{menu.label}</span>
                  </Link>
                  {index < currentMenus.length - 1 && (
                    <div className="menu-separator-line" />
                  )}
                </div>
              );
            })
          ) : (
            <p style={{ padding: 16, color: "#888" }}>No items available.</p>
          )}
        </div>

        {/* ===== FOOTER ===== */}
        <div className="mobile-navbar-footer">
          <button onClick={openQuickLinks}>Quick Links</button>
          <button
            onClick={() =>
              handleItemClick({
                id: 9990,
                label: "Apply Now",
                link: "#",
                parent: 0,
                menuType: "FOOTER",
              })
            }
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbarDrawer;
