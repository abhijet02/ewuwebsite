"use client";

import "./Navbar.scss";
import { useEffect, useState } from "react";
import NavbarButton from "./NavbarButton/NavbarButton";
import { useMenuData } from "@lib/hooks/useMenuData";
import NavbarMenuGroup from "./NavbarMenuGroup/NavbarMenuGroup";
import { Icon } from "@iconify/react";
import LogoPart from "./LogoPart/LogoPart";
import MegaMenu from "./MegaMenuModal/MegaMenu";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { quickLinkActions } from "@lib/slices/quickLink/quickLink.slice";
import Drawer from "./Drawer/Drawer";
import MobileNavbar from "./MobileNavbar/MobileNavbar";
import Link from "next/link";
import SearchModal from "./SearchModal/SearchModal";
import { usePathname } from "next/navigation";

interface Menu {
  id: number;
  label: string;
  link: string;
  parent: number;
  isMegaMenu?: "YES" | "NO";
  menuType?: string;
  menuPosition?: string;
}

const Navbar: React.FC = () => {
  const getNestedMenus = (menus: Menu[], parentId: number): Menu[] => {
    let nested: Menu[] = [];
    const children = menus.filter((m) => m.parent === parentId);
    for (const child of children) {
      nested.push(child);
      nested = nested.concat(getNestedMenus(menus, child.id)); // recursive
    }
    return nested;
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMegaMenuId, setActiveMegaMenuId] = useState<number | null>(null);
  const [showQuickLinks, setShowQuickLinks] = useState(false);
  const QUICK_LINK_MENU_ID = "QLM";
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

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

  // Scroll detection for navbar transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mega menu
  const handleMegaMenuOpen = (menuId?: number | string) => {
    // CASE 1: Quick Links Trigger
    if (menuId === QUICK_LINK_MENU_ID) {
      setActiveMegaMenuId(null); // clear normal ID
      setShowQuickLinks(true); // NEW boolean state
      setMenuOpen(true);
      // console.log("Quick Links Data:", quickLinks);

      return;
    }

    // CASE 2: Normal mega menu (existing logic)
    setShowQuickLinks(false); // make sure quicklinks mode is OFF

    setMenuOpen((prev) => {
      if (prev && activeMegaMenuId === menuId) {
        setActiveMegaMenuId(null);
        return false;
      } else {
        if (typeof menuId === "number") {
          // only set for numeric menuIDs
          setActiveMegaMenuId(menuId);
        }
        return true;
      }
    });
  };

  // Prevent background scroll
  useEffect(() => {
    const html = document.documentElement;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      html.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      html.style.overflow = "";
    };
  }, [menuOpen]);
  const [drawerMenuLabel, setDrawerMenuLabel] = useState(""); // store label
  const [drawerMenuData, setDrawerMenuData] = useState<Menu[]>([]); // child menu data

  const handleDrawerOpenForMenu = (menuLabel: string) => {
    setDrawerMenuLabel(menuLabel);
    setMenuOpen(false);
    // Find menu item by label
    const menuItem = menus.find((m) => m.label === menuLabel);

    if (menuItem) {
      // Get child menus based on parent ID
      const childMenus = menus.filter((m) => m.parent === menuItem.id);
      setDrawerMenuData(childMenus);
    } else {
      setDrawerMenuData([]); // fallback
    }

    openDrawer();
  };
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchOpen = () => setIsSearchOpen(true);
  const handleSearchClose = () => setIsSearchOpen(false);

  const pathname = usePathname();

  // Function to get menus which is active based on pathname
  const getActiveMenus = () => {
    // Find the menu that matches pathname
    const currentMenu = menus?.find((menu) => menu.link.startsWith(pathname));

    if (!currentMenu) return menus; // fallback, no active

    // Collect parent chain (top -> child -> grandchild)
    const activeIds = new Set<number>();
    activeIds.add(currentMenu?.id);

    if (currentMenu?.parent > 0) {
      // find the parent of the current menu
      const parentMenu = menus?.find((m) => m.id === currentMenu.parent);

      // if parent found, add to activeIds
      if (parentMenu) {
        activeIds.add(parentMenu.id);

        // check for grandparent
        if (parentMenu.parent > 0) {
          // find grandparent
          const grandParentMenu = menus?.find(
            (m) => m.id === parentMenu.parent,
          );

          // if grandparent found, add to activeIds
          if (grandParentMenu) activeIds.add(grandParentMenu.id);
        }
      }
    }

    // Return menus array with isActive flag
    return menus.map((menu) => ({
      ...menu,
      isActive: activeIds.has(menu.id),
    }));
  };

  // Process menus to include isActive flag
  const processedMenus = getActiveMenus();

  return (
    <div>
      <div
        className={`navbar-container 
          ${isScrolled ? "after-scroll" : ""} 
          ${menuOpen ? "menu-open" : ""}`}
      >
        <div className={`navbar-body ${menuOpen ? "menu-open" : ""}`}>
          <div className="row align-items-center gx-4">
            <div className="col-12 col-sm-12 col-md-5 col-lg-5 navbar-dual-wrapper">
              <div
                className={`navbar-dual-inner ${menuOpen ? "menu-open" : ""}`}
              >
                {/* Top NavbarMenuGroup */}
                <div
                  className={`navbar-top-menugroup ${
                    menuOpen ? "fade-out" : "fade-in"
                  }`}
                >
                  <NavbarMenuGroup
                    onDrawerOpen={(label) => handleDrawerOpenForMenu(label)}
                    onMegaMenuToggle={(id) => handleMegaMenuOpen(id)}
                    menus={processedMenus}
                    menuPosition="TOP"
                  />
                </div>
                {/* Bottom NavbarMenuGroup */}
                <div
                  className={`navbar-bottom-menugroup ${
                    menuOpen ? "fade-in" : "fade-out"
                  }`}
                >
                  <NavbarMenuGroup
                    onDrawerOpen={(label) => handleDrawerOpenForMenu(label)}
                    onMegaMenuToggle={(id) => handleMegaMenuOpen(id)}
                    menus={processedMenus}
                    menuPosition="BOTTOM"
                    sliceStart={0}
                    sliceEnd={4}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-2 col-lg-2">
              <LogoPart />
            </div>
            <div className="col-12 col-sm-12 col-md-5 col-lg-5 navbar-button-wrapper">
              <div className="navbar-button-inner">
                {/* Navbar Button (default visible) */}
                <div
                  className={`navbar-button-block ${
                    menuOpen ? "fade-out" : "fade-in"
                  }`}
                >
                  <NavbarButton
                    onMegaMenuToggle={handleMegaMenuOpen}
                    onDrawerOpen={(label) => handleDrawerOpenForMenu(label)}
                    onSearchClick={handleSearchOpen}
                  />
                </div>

                {/* Navbar Menu Group (visible when menuOpen = true) */}
                <div
                  className={`navbar-menugroup-block ${
                    menuOpen ? "fade-in" : "fade-out"
                  }`}
                >
                  <NavbarMenuGroup
                    onDrawerOpen={(label) => handleDrawerOpenForMenu(label)}
                    onMegaMenuToggle={(id) => handleMegaMenuOpen(id)}
                    menus={processedMenus}
                    menuPosition="TOP"
                    justify="flex-end"
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <hr className="hr" />
            </div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-5 navbar-left-wrapper">
              <div className="navbar-left-inner">
                {/* Navbar Menu Group */}
                <div
                  className={`navbar-left-menugroup ${
                    menuOpen ? "fade-out" : "fade-in"
                  }`}
                >
                  <NavbarMenuGroup
                    onDrawerOpen={(label) => handleDrawerOpenForMenu(label)}
                    onMegaMenuToggle={(id) => handleMegaMenuOpen(id)}
                    menus={processedMenus}
                    menuPosition="BOTTOM"
                    sliceStart={0}
                    sliceEnd={4}
                  />
                </div>
                {/* Heading Section */}
                <div
                  className={`navbar-left-heading ${
                    menuOpen ? "show" : "hide"
                  }`}
                >
                  <h4>{header?.megamenuTitle}</h4>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-2">
              <div className="logo-part-placeholder"></div>
            </div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-5 navbar-right-wrapper">
              {/* Position wrapper holds consistent height */}
              <div className="navbar-right-inner">
                {/* Navbar Menu Group */}
                <div
                  className={`navbar-right-menugroup ${
                    menuOpen ? "fade-out" : "fade-in"
                  }`}
                >
                  <NavbarMenuGroup
                    onDrawerOpen={(label) => handleDrawerOpenForMenu(label)}
                    onMegaMenuToggle={(id) => handleMegaMenuOpen(id)}
                    menus={processedMenus}
                    menuPosition="BOTTOM"
                    sliceStart={4}
                    justify="flex-end"
                  />
                </div>

                {/* Mega Menu Button Group */}
                <div
                  className={`navbar-right-button-group ${
                    menuOpen ? "show" : "hide"
                  }`}
                >
                  <div
                    className="button-group-container"
                    style={{
                      padding: "12px",
                      display: "flex",
                      flexDirection: "row",
                      gap: "12px",
                      justifyContent: "flex-end",
                      marginBottom: "32px",
                    }}
                  >
                    <Link
                      className="megamenu-button megamenu-button-apply-now"
                      href={header?.megaMenuBtn1Link || "/"}
                    >
                      {header?.megaMenuBtn1Title}
                      <Icon
                        icon="pepicons-pencil:arrow-up"
                        width="20"
                        height="20"
                      />
                    </Link>
                    <Link
                      className="megamenu-button megamenu-button-academic-calendar-button"
                      href={header?.megaMenuBtn2Link || "/"}
                    >
                      {header?.megaMenuBtn2Title}
                      <Icon
                        icon="pepicons-pencil:arrow-up"
                        width="20"
                        height="20"
                      />
                    </Link>
                    <Link
                      className="megamenu-button megamenu-button-enquiry-button"
                      href={header?.megaMenuBtn3Link || "/"}
                    >
                      {header?.megaMenuBtn3Title}
                      <Icon
                        icon="pepicons-pencil:arrow-up"
                        width="20"
                        height="20"
                      />
                    </Link>
                    <Icon
                      icon="formkit:close"
                      width="26"
                      height="30"
                      onClick={() => setMenuOpen(false)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Mega Menu */}
          <MegaMenu
            show={menuOpen}
            menus={menus}
            activeMegaMenuId={activeMegaMenuId}
            onClose={() => {
              setMenuOpen(false);
              setActiveMegaMenuId(null);
            }}
            getNestedMenus={getNestedMenus}
            quickLinks={quickLinks.map((ql) => ({
              ...ql,
              label: ql.label.toString(),
              category: ql.category.toString(),
              url: ql.url.toString(),
            }))}
            isQuickLinks={showQuickLinks} // flag to indicate quick links mode
          />
        </div>
      </div>
      {drawerOpen && (
        <Drawer
          closeDrawer={closeDrawer}
          show={drawerOpen}
          menuLabel={drawerMenuLabel}
          menuData={drawerMenuData}
        />
      )}
      <MobileNavbar />
      <SearchModal isOpen={isSearchOpen} onClose={handleSearchClose} />
    </div>
  );
};

export default Navbar;
