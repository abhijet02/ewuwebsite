"use client";

import "./MobileNavbar.scss";
import mobileLogoLight from "@/app/assets/mobile-logo-light.png";
import mobileLogoDark from "@/app/assets/mobile-logo-dark.png";
import Link from "next/link";
import Image from "next/image";
import { usePageData } from "@lib/hooks/usePageData";
import { useMenuBuild } from "@lib/hooks/useMenuBuild";
import { useEffect, useState, FC } from "react";
import MobileNavbarButtonGroup from "./MobileNavbarButtonGroup/MobileNavbarButtonGroup";
import MobileNavbarDrawer from "./MobileNavbarDrawer/MobileNavbarDrawer";
import Drawer from "../Drawer/Drawer";
import SearchModal from "../SearchModal/SearchModal";
import { useMenuData } from "@lib/hooks/useMenuData";

const MobileNavbar: FC = () => {
  /** Page data */
  const { defaultHeader: header } = useMenuData();

  /** Menu global settings */
  const { isDark } = useMenuBuild();

  /** Drawer state */
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const [showAccessibilityDrawer, setShowAccessibilityDrawer] = useState(false);

  /** Prevent background scroll when drawer is open */
  useEffect(() => {
    const html = document.documentElement;

    if (isDrawerOpen) {
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
  }, [isDrawerOpen]);

  /** ✅ Decide which logo to show correctly */
  const logoSrc = header?.headerLogoUrl
    ? header.headerLogoUrl
    : isDark === "Dark"
    ? mobileLogoDark
    : mobileLogoDark;
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
    const handleSearchOpen = () => setIsSearchOpen(true);
    const handleSearchClose = () => setIsSearchOpen(false);

  return (
    <div>
      <div
        className={`mobile-navbar-header ${
          isScrolled ? "mobile-navbar-after-scroll" : ""
        }`}
      >
        <Link
          className="mobile-navbar-logo"
          href={header?.headerLogoLink || "/"}
        >
          <Image src={logoSrc} fill sizes="100vw" alt="EWU Logo" />
        </Link>

        {/* Menu button group (theme toggle, static toggle, drawer button) */}
        <MobileNavbarButtonGroup
          openDrawer={openDrawer}
          openAccessibilityDrawer={() => setShowAccessibilityDrawer(true)}
        />
      </div>

      {/* Drawer */}
      {isDrawerOpen && (
        <MobileNavbarDrawer closeDrawer={closeDrawer} show={isDrawerOpen}           onSearchClick={handleSearchOpen}
/>
      )}

      <Drawer
        show={showAccessibilityDrawer}
        closeDrawer={() => setShowAccessibilityDrawer(false)}
        menuLabel="Accessibility Settings"
      />
      <SearchModal isOpen={isSearchOpen} onClose={handleSearchClose} />
    </div>
  );
};

export default MobileNavbar;
