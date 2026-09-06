"use client";

import { Menu } from "@lib/services/menu/menu.service.type";
import "./SidebarMenu.scss";
import { useMenuData } from "@lib/hooks/useMenuData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const SidebarMenu = () => {
  const { page, pages, pageSidebarMenus } = useMenuData();
  const pathname = usePathname();
  const parentPage = pages?.find((p) => p.id === page?.groupPageId);

  type MenuWithChildren = Menu & { children: MenuWithChildren[] };

  const buildMenuTree = (menus: Menu[]): MenuWithChildren[] => {
    const menuMap = new Map<number, MenuWithChildren>();
    const tree: MenuWithChildren[] = [];

    menus?.forEach((menu) => {
      menuMap.set(menu.id, { ...menu, children: [] });
    });

    menus?.forEach((menu) => {
      const node = menuMap.get(menu.id)!;
      if (menu.parent === 0) {
        tree.push(node);
      } else {
        const parent = menuMap.get(menu.parent);
        if (parent) parent.children.push(node);
      }
    });

    const sortMenus = (menuList: MenuWithChildren[]) => {
      menuList?.sort((a, b) => a?.sort - b?.sort);
      menuList?.forEach((m) => sortMenus(m.children));
    };

    sortMenus(tree);
    return tree;
  };

  const stripQuery = (url: string) => url.split("?")[0];

  const isMenuActive = (menuLink: string) => {
    if (!menuLink) return false;

    const cleanPath = stripQuery(pathname);
    const cleanLink = stripQuery(menuLink);

    if (cleanPath === cleanLink) return true;
    if (cleanPath === cleanLink + "/" || cleanPath + "/" === cleanLink)
      return true;
    if (
      cleanLink !== "/" &&
      cleanPath.startsWith(cleanLink) &&
      (cleanPath.length === cleanLink.length ||
        cleanPath[cleanLink.length] === "/")
    ) {
      return true;
    }

    return false;
  };

  const findActivePath = (menu: MenuWithChildren): number[] | null => {
    if (!menu) return null;

    if (isMenuActive(menu.link)) return [menu.id];

    if (menu.children && menu.children.length > 0) {
      for (let child of menu.children) {
        const childPath = findActivePath(child);
        if (childPath) return [menu.id, ...childPath];
      }
    }

    return null;
  };

  const menuTree = pageSidebarMenus?.length
    ? buildMenuTree(pageSidebarMenus || [])
    : [];

  let activePathIds: number[] = [];
  menuTree.forEach((menu) => {
    const path = findActivePath(menu);
    if (path) activePathIds = path;
  });

  const isInActivePath = (id: number) => activePathIds.includes(id);

  const renderMenu = (
    menu: MenuWithChildren,
    level = 0,
    isLastChild = false,
    isLastParent = false,
  ) => {
    const hasChildren = menu.children && menu.children.length > 0;
    const marginLeft = 16 * level;
    const isActive = menu.children?.length === 0 && isMenuActive(menu.link);

    return (
      <div
        className={`sidebar-menu-item ${isActive ? "active" : ""}`}
        key={menu.id}
        style={{ marginLeft }}
      >
        {hasChildren ? (
          <>
            <Link
              className={`sidebar-menu-link dropdown-toggle`}
              data-bs-toggle="collapse"
              href={`#menu-${menu.id}`}
              role="button"
              aria-expanded={isInActivePath(menu.id) ? "true" : "false"}
              aria-controls={`menu-${menu.id}`}
            >
              <span>{menu.label}</span>
            </Link>
            {!isLastParent && <hr className="sidebar-divider" />}
            <div
              className={`collapse drop-down-wrapper ${
                isInActivePath(menu.id) ? "show" : ""
              }`}
              id={`menu-${menu.id}`}
            >
              <ul>
                {menu.children.map((child, index) =>
                  renderMenu(
                    child,
                    level + 1,
                    index === menu.children.length - 1,
                    false,
                  ),
                )}
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link
              className={`sidebar-menu-link ${isActive ? "active" : ""}`}
              href={menu.link}
            >
              <span>{menu.label}</span>
            </Link>
            {!isLastChild && !isLastParent && (
              <hr className="sidebar-divider" />
            )}
          </>
        )}
      </div>
    );
  };

  const isLoading =
    !pages || !page || !pageSidebarMenus || pageSidebarMenus.length === 0;

  // ✅ Pagination State for TOP-LEVEL only
  const pageSize = 10;

  // Determine initial page based on active menu
  const topLevelActiveIndex = menuTree.findIndex((menu) =>
    activePathIds.includes(menu.id),
  );
  const initialPage =
    topLevelActiveIndex >= 0
      ? Math.floor(topLevelActiveIndex / pageSize) + 1
      : 1;

  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(menuTree.length / pageSize);

  // Ensure pagination updates when route changes
  useEffect(() => {
    const topLevelActiveIndex = menuTree.findIndex((menu) =>
      activePathIds.includes(menu.id),
    );
    const newPage =
      topLevelActiveIndex >= 0
        ? Math.floor(topLevelActiveIndex / pageSize) + 1
        : 1;
    setCurrentPage(newPage);
  }, [pathname, menuTree.join(","), activePathIds.join(",")]);

  const paginatedMenus = menuTree.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="sidebar-menu">
      <div className="sidebar-menu-header">
        {isLoading ? (
          <div className="skeleton skeleton-title"></div>
        ) : (
          <h3 style={{ textAlign: "left" }}>
            {parentPage?.label || page?.label || "East West University"}
          </h3>
        )}
      </div>

      <div className="sidebar-menu-body">
        {isLoading ? (
          <div className="sidebar-skeleton-list">
            {Array.from({ length: 5 }).map((_, i) => (
              <div className="sidebar-skeleton-item" key={i}>
                <div className="skeleton skeleton-text"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {paginatedMenus.map((menu, index) =>
              renderMenu(menu, 0, false, index === paginatedMenus.length - 1),
            )}

            {/* ✅ Pagination Controls (Bottom Only) */}
            {totalPages > 1 && (
              <div className="sidebar-pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Previous
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarMenu;
