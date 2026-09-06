"use client";

import "./OfficeSidebarMenu.scss";
import { useOfficeData } from "@lib/hooks/useOfficeData";
import { useMenuData } from "@lib/hooks/useMenuData";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const OfficeSidebarMenu = () => {
  const { menus } = useMenuData();

  const officeMenus = menus
    ?.filter(
      (menu) =>
        menu?.label.toLowerCase().includes("office") &&
        !menu?.label.toLowerCase().includes("department") &&
        menu?.label.toLowerCase() !== "office"
    )
    ?.slice()
    .sort((a, b) => a.depth - b.depth);

  const params = useSearchParams();
  const pageId = params.get("pageId");

  const pageMenus = menus?.filter((menu) => menu?.pageId.toString() === pageId);

  let renderMenus;
  pageId ? (renderMenus = pageMenus) : (renderMenus = officeMenus);

  return (
    <div className="sidebar-menu-wrapper">
      <h3 className="title">{"All Offices"}</h3>
      <div className="menu-wrapper">
        {renderMenus?.map((menu) => (
          // <div className="menu-item" key={menu?.id}>
          <Link key={menu.id} className="menu-item" href={`${menu?.link}`}>
            <span>{menu?.label}</span>
          </Link>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default OfficeSidebarMenu;
