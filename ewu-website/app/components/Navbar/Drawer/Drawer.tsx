"use client";
import { Icon } from "@iconify/react";
import { useMenuBuild } from "@lib/hooks/useMenuBuild";
import { useRef, useEffect, useState } from "react";
import "./Drawer.scss";
import Link from "next/link";
import ScreenReader, { ScreenReaderHandle } from "../../OldNavbar/ScreenReader";

interface DrawerProps {
  closeDrawer: () => void;
  show: boolean;
  menuLabel?: string;
  menuData?: Menu[];
}

interface Menu {
  id: number;
  label: string;
  link: string;
  parent: number;
  isMegaMenu?: "YES" | "NO";
  menuType?: string;
  menuPosition?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  closeDrawer,
  show,
  menuLabel,
  menuData = [],
}) => {
  const {
    isDark,
    isStatic,
    isZoomed,
    showPhoto,
    themeClick,
    staticClick,
    zoomClick,
    photoClick,
    resetAccessibility,
  } = useMenuBuild();

  const screenReaderRef = useRef<ScreenReaderHandle>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    if (!show) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollY);
    };
  }, [show]);

  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => setDrawerVisible(true), 100);
      return () => clearTimeout(timeout);
    } else {
      setDrawerVisible(false);
    }
  }, [show]);

  return (
    <div
      className={`drawer-overlay ${show ? "open" : ""}`}
      onClick={closeDrawer}
    >
      <div
        className={`drawer-body ${drawerVisible ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <p>{menuLabel ? menuLabel : "Accessibility Settings"}</p>
          <div onClick={closeDrawer}>
            <Icon icon="ep:close-bold" width={20} height={20} />
          </div>
        </div>

        <div className="drawer-scroll-content">
          {/* Conditional Content */}
          {menuLabel === "Accessibility Settings" ? (
            <div className="row g-3 drawer-options">
              <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <div
                  className="accessibility-action-button"
                  onClick={themeClick}
                >
                  <Icon icon="f7:cloud-moon-fill" width="32" height="32" />
                  <p>{isDark === "dark" ? "Go Light" : "Go Dark"}</p>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <div
                  className="accessibility-action-button"
                  onClick={staticClick}
                >
                  <Icon icon="clarity:animation-solid" width="32" height="32" />
                  <p>{isStatic ? "Dynamic" : "Static"}</p>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <div
                  className="accessibility-action-button"
                  onClick={() => {
                    screenReaderRef.current?.toggleReading();
                    setIsPlaying((prev) => !prev); // toggle play/stop
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <Icon
                      icon="iconoir:sound-low-solid"
                      width="32"
                      height="32"
                    />
                    <p>{isPlaying ? "Stop" : "Play"}</p>
                  </div>
                  <p>Audio Transcript</p>
                </div>
                <ScreenReader ref={screenReaderRef} />
              </div>

              <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <div
                  className="accessibility-action-button"
                  onClick={zoomClick}
                >
                  <Icon icon="fe:text-size" width="32" height="32" />
                  <p>{isZoomed ? "Smaller Text" : "Bigger Text"}</p>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <div
                  className="accessibility-action-button"
                  onClick={photoClick}
                >
                  <Icon icon="mynaui:image-solid" width="32" height="32" />
                  <p>{showPhoto ? "Hide Photo" : "Show Photo"}</p>
                </div>
              </div>
              <div className="col-12">
                <div className="keyboard-acceessibility-message">
                  <h6>For keyboard navigation</h6>
                  <p>[TAB] — Press Tab to move to the next action</p>

                  <p>[Enter] — Press Enter to activate the selected action</p>

                  <p>[↑] — Press the Up Arrow to go to the top</p>

                  <p>[↓] — Press the Down Arrow to go to the bottom</p>
                </div>
              </div>
              <div className="col-12">
                <div
                  className="accessibility-action-button reset-accessibility"
                  onClick={resetAccessibility}
                >
                  <Icon icon="fontisto:undo" width="20" height="20" /> Reset
                  Accessibility
                </div>
              </div>
            </div>
          ) : menuLabel === "Apply Now" ? (
            <div className="drawer-links">
              <Link
                href="https://admission.ewubd.edu/"
                target="_blank"
                className="drawer-link"
              >
                Admission
                <div>
                  <Icon
                    icon="majesticons:arrow-right-line"
                    width="20"
                    height="20"
                  />
                </div>
              </Link>
              <Link
                href="/pages/career"
                target="_blank"
                className="drawer-link"
              >
                Career
                <div>
                  <Icon
                    icon="majesticons:arrow-right-line"
                    width="20"
                    height="20"
                  />
                </div>
              </Link>
            </div>
          ) : (
            <div className="drawer-links">
              {menuData.map((menu) => (
                <Link
                  key={menu.id}
                  href={menu.link !== "#" ? menu.link : "#"}
                  className="drawer-link"
                >
                  {menu.label}
                  <div>
                    <Icon
                      icon="majesticons:arrow-right-line"
                      width="20"
                      height="20"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
