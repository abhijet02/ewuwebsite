"use client";

import { Icon } from "@iconify/react";
import "./NavbarButton.scss";
import Link from "next/link";
import { useState } from "react";

interface NavbarButtonProps {
  onMegaMenuToggle?: (menuId?: number | string) => void;
  onDrawerOpen?: (label: string) => void;
  onSearchClick?: () => void;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({
  onMegaMenuToggle,
  onDrawerOpen,
  onSearchClick
}) => {
  // handle Quick Link click
  const handleQuickLinkClick = () => {
    if (onMegaMenuToggle) onMegaMenuToggle("QLM");
  };
const [isSearchOpen, setIsSearchOpen] = useState(false);
const handleSearchClick = () => {
  setIsSearchOpen(true);
};



  return (
    <div className="quick-button-deck">
      <div
        className="d-flex align-items-center justify-content-center quick-button-body"
        style={{ cursor: "pointer" }}
        onClick={() => onDrawerOpen?.("Accessibility Settings")}
      >
        <Icon
          icon="ion:accessibility-outline"
          className="navbar-button-group-size"
        />
      </div>
      <Link
        className="d-flex align-items-center justify-content-center quick-button-body"
        href="/pages/login"
      >
        <Icon icon="si:user-line" className="navbar-button-group-size" />
      </Link>
      <Link
        href="/pages/helpdesk"
        className="d-flex align-items-center justify-content-center quick-button-body"
        style={{ cursor: "pointer" }}
      >
        <Icon icon="la:question" width="24" height="24" />
      </Link>
      <div
        className="d-flex align-items-center justify-content-center quick-button-body"
        style={{ cursor: "pointer" }}
        onClick={() => onSearchClick?.()}
      >
        <Icon icon="tabler:search" className="navbar-button-group-size" />
      </div>

      {/* ✅ Mega menu trigger button */}
      <button className="quick-link-button" onClick={handleQuickLinkClick}>
        Quick Link
        <Icon
          icon="dashicons:arrow-down"
          className="navbar-button-group-size"
        />
      </button>

      <button
        className="apply-link-button"
        onClick={() => onDrawerOpen?.("Apply Now")}
      >
        Apply Now
        <Icon
          icon="dashicons:arrow-down"
          className="navbar-button-group-size"
        />
      </button>
    </div>
  );
};

export default NavbarButton;
