"use client";

import Link from "next/link";
import { FC } from "react";
import { Icon } from "@iconify/react";
import "./MobileNavbarButtonGroup.scss";
import LiveSession from "@/app/components/LiveSession/LiveSession";

interface MobileNavbarButtonGroupProps {
  openDrawer: () => void;
  openAccessibilityDrawer: () => void;
  
}

const MobileNavbarButtonGroup: FC<MobileNavbarButtonGroupProps> = ({
  openDrawer,
  openAccessibilityDrawer,
}) => {
  return (
    <div className="mobile-navbar-button-group">
      <LiveSession/>
      {/* Accessibility button */}
      <div
        className="d-flex align-items-center justify-content-center mobile-navbar-quick-button-body"
        style={{ cursor: "pointer" }}
        onClick={openAccessibilityDrawer}
      >
        <Icon icon="ion:accessibility-outline" width="20" height="20" />
      </div>

      {/* Drawer toggle button */}
      <div
        className="d-flex align-items-center justify-content-center mobile-navbar-quick-button-body"
        style={{ cursor: "pointer" }}
        onClick={openDrawer}
      >
        <Icon icon="quill:hamburger-sidebar" width="24" height="24" />
      </div>
    </div>
  );
};

export default MobileNavbarButtonGroup;
