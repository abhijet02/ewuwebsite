"use client";

import { Menu } from "@lib/services/menu/menu.service.type";
import "./SidebarMenuCopy.scss";
import { Icon } from "@iconify/react";
import { usePageData } from "@lib/hooks/usePageData";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import { useFacultyData } from "@lib/hooks/useFacultyData";
import Link from "next/link";

const SidebarMenuCopy = () => {
  const { pageSidebarMenus } = usePageData();
  const { department } = useDepartmentData();
  const { faculty } = useFacultyData();

  type MenuWithChildren = Menu & { children: MenuWithChildren[] };

  const buildMenuTree = (menus: Menu[]): MenuWithChildren[] => {
    const menuMap = new Map<number, MenuWithChildren>();
    const tree: MenuWithChildren[] = [];

    // Initialize the map with children arrays
    menus?.forEach((menu) => {
      menuMap.set(menu.id, { ...menu, children: [] });
    });

    // Build the tree structure
    menus?.forEach((menu) => {
      const node = menuMap.get(menu.id)!;
      if (menu.parent === 0) {
        tree.push(node);
      } else {
        const parent = menuMap.get(menu.parent);
        if (parent) {
          parent.children.push(node);
        }
      }
    });

    // Recursively sort by `sort` field
    const sortMenus = (menuList: MenuWithChildren[]) => {
      menuList?.sort((a, b) => a?.sort - b?.sort);
      menuList?.forEach((m) => sortMenus(m.children));
    };

    sortMenus(tree);
    return tree;
  };

  return (
    <section className="sidebar-section">
      <div className="container ">
        <div className="sidebar-menu-wrapper">
          <h3 className="title mb-0">
            {department?.name || faculty?.name || "East West University"}
          </h3>
          <div className="menu-wrapper border">
            {pageSidebarMenus &&
              buildMenuTree(pageSidebarMenus).map(
                (menu) =>
                  // <div className="menu-item" key={menu?.id}>
                  menu?.children.length > 0 ? (
                    <>
                      <Link
                        className="item"
                        data-bs-toggle="collapse"
                        href={`#menu-${menu?.id}`}
                        role="button"
                        aria-expanded="false"
                        aria-controls={`menu-${menu?.id}`}
                      >
                        <span>{menu?.label}</span>
                        <Icon icon="prime:angle-down" width="24" height="24" />
                      </Link>
                      <div
                        className="collapse drop-down-wrapper"
                        id={`menu-${menu?.id}`}
                      >
                        <ul>
                          {menu?.children.map((child) => (
                            <li key={child.id}>
                              <Link href={`${child.link}`}>{child.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link key={menu.id} className="item" href={`${menu?.link}`}>
                      <span>{menu?.label}</span>
                    </Link>
                  )
                // </div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SidebarMenuCopy;
