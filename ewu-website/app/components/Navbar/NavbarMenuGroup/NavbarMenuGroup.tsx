"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import "../Navbar.scss";
import { usePathname } from "next/navigation";
interface MenuItem {
  id: number;
  label: string;
  link: string;
  menuType?: string;
  menuPosition?: string;
  parent?: number;
  isMegaMenu?: "YES" | "NO";
  isActive?: boolean;
}

interface NavbarMenuGroupProps {
  menus: MenuItem[];
  menuPosition: "TOP" | "BOTTOM";
  sliceStart?: number;
  sliceEnd?: number;
  justify?: "flex-start" | "flex-end" | "center";
  onMegaMenuToggle?: (menuId?: number) => void;
  onDrawerOpen?: (menuLabel: string) => void;
}

const NavbarMenuGroup: React.FC<NavbarMenuGroupProps> = ({
  menus,
  menuPosition,
  sliceStart,
  sliceEnd,
  justify = "flex-start",
  onMegaMenuToggle,
  onDrawerOpen,
}) => {
  const filteredMenus = menus
    ?.filter(
      (data) =>
        data.menuType === "HEADER" &&
        data.menuPosition === menuPosition &&
        data.parent === 0
    )
    .slice(sliceStart, sliceEnd);
  const pathname = usePathname();

  const handleClick = (menu: MenuItem, e: React.MouseEvent) => {
    if (menu.isMegaMenu === "YES") {
      e.preventDefault();
      if (onMegaMenuToggle) onMegaMenuToggle(menu.id);
    } else if (menu.isMegaMenu === "NO" && menu.link === "#") {
      e.preventDefault(); // prevent default navigation
      if (onDrawerOpen) {
        onDrawerOpen(menu.label); // pass label to drawer
      } else {
        console.warn("Drawer open function is not provided!");
      }
    }
  };

  return (
    <div className="navbar-menu-deck" style={{ justifyContent: justify }}>
      {filteredMenus?.map((data, index) => {
        const isMega = data.isMegaMenu === "YES";
        return (
          <Link
            className={`nav-pill ${isMega ? "has-mega-menu" : ""} ${
              data.isActive ? "active" : ""
            }`}
            key={index}
            href={isMega ? "#" : data.link}
            onClick={(e) => handleClick(data, e)}
          >
            <div className="nav-pointer"></div>
            <div className="nav-label">
              <p>{data.label}</p>
              {(data.link === "#" || isMega) && (
                <Icon icon="dashicons:arrow-down" width="18" height="18" />
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default NavbarMenuGroup;
