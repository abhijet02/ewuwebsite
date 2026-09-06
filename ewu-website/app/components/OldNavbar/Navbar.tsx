"use client";

import "./Navbar.scss";
import logoLight from "@/app/assets/logo-light.png";
import logoBrand from "@/app/assets/mobile-logo-dark.png";
import mobileLogoDark from "@/app/assets/mobile-logo-dark.png";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SearchModal from "./SearchModal/SearchModal";
import QuickLinksModal from "./QuickLinksModal/QuickLinksModal";
import { useRouter } from "next/navigation";
import ScreenReader, { ScreenReaderHandle } from "./ScreenReader";
import { useMenuBuild } from "../../../lib/hooks/useMenuBuild";
import { MobileMenus } from "./MobileMenu/MobileMenus";
import { MobileHeader } from "./MobileMenu/MobileHeader";
import { MegaMenuModal } from "./MegaMenuModal/MegaMenuModal";
import { usePageData } from "@lib/hooks/usePageData";
import { useMenuData } from "@lib/hooks/useMenuData";

const Navbar: React.FC = () => {
  const { defaultHeader: header, defaultMenus: menus } = useMenuData();
  const {
    isDark,
    isStatic,
    getHeaderMenus,
    getTopMenus,
    getBottomMenus,
    renderMenus,
    themeClick,
    staticClick,
    resetAccessibility,
  } = useMenuBuild();

  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);

  const screenReaderRef = useRef<ScreenReaderHandle>(null);

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

  return (
   <section className={`header-part ${isScrolled ? "scrolled" : ""}`}>
        <nav className="navbar-part">
          <div className="header-nav">
            {/* Menu Options Start */}
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid" style={{ padding: "0" }}>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  {/* Top Row */}
                  <div className="menubar-row">
                    {/* Top Left Menus */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      {menus && renderMenus(getTopMenus(getHeaderMenus(menus)))}
                    </ul>

                    {/* Top Right Menus */}
                    <ul className="navbar-nav mb-2 mb-lg-0">
                      {/* Accessibility Options*/}
                      <li className="nav-item">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="dropdown-toggle login-btn"
                            title="Accessibility"
                            style={{ fontSize: "0" }}
                            data-bs-toggle="dropdown"
                            data-bs-display="static"
                            aria-expanded="false"
                          >
                            <Icon
                              icon="ion:accessibility-outline"
                              width="20"
                              height="20"
                            />
                          </button>
                          <div className="dropdown-menu accessibility-main-dropdown">
                            <h1>ACCESSIBILITY OPTIONS</h1>
                            <div className="accessibility-dropdown">
                              <div className="accessibility-item">
                                <button
                                  onClick={() => themeClick()}
                                  className="dropdown-item"
                                  type="button"
                                >
                                  {isDark ? (
                                    <Icon
                                      icon="iconoir:sun-light"
                                      width="30"
                                      height="30"
                                    />
                                  ) : (
                                    <Icon
                                      icon="iconamoon:mode-dark-light"
                                      width="30"
                                      height="30"
                                    />
                                  )}
                                  {isDark ? (
                                    <span>Light Mode</span>
                                  ) : (
                                    <span>Dark Mode</span>
                                  )}
                                </button>
                              </div>
                              <div className="accessibility-item">
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  onClick={() => staticClick()}
                                >
                                  <Icon
                                    icon="fluent:row-triple-20-regular"
                                    width="30"
                                    height="30"
                                  />
                                  {isStatic ? (
                                    <span>Dynamic</span>
                                  ) : (
                                    <span>Static</span>
                                  )}
                                </button>
                              </div>
                              <div className="accessibility-item">
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  onClick={() =>
                                    screenReaderRef.current?.toggleReading()
                                  }
                                >
                                  <Icon
                                    icon="fluent:speaker-2-24-regular"
                                    width="30"
                                    height="30"
                                  />
                                  <span>Audio Transcript</span>
                                </button>
                                <ScreenReader ref={screenReaderRef} />
                              </div>
                              <div className="accessibility-item">
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  onClick={() => resetAccessibility()}
                                >
                                  <Icon
                                    icon="grommet-icons:power-reset"
                                    width="30"
                                    height="30"
                                  />
                                  <span>Reset Accessibility</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      {/* Login Options*/}
                      <li className="nav-item">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="dropdown-toggle login-btn"
                            title="Log In"
                            style={{ fontSize: "0" }}
                            data-bs-toggle="dropdown"
                            data-bs-display="static"
                            aria-expanded="false"
                            onClick={() => router.push("/pages/login")}
                          >
                            <Icon
                              icon="si:user-line"
                              width="20"
                              height="20"
                              style={{ color: "#1c4370" }}
                            />
                          </button>
                        </div>
                      </li>

                      {/* Helpdesk Option*/}
                      <li className="nav-item">
                        <div>
                          <button
                            type="button"
                            className="dropdown-toggle login-btn"
                            title="Help Desk"
                            style={{ fontSize: "0" }}
                            data-bs-toggle="dropdown"
                            data-bs-display="static"
                            aria-expanded="false"
                            onClick={() => router.push("/pages/helpdesk")}
                          >
                            <Icon icon="la:question" width="24" height="24" />
                          </button>
                        </div>
                      </li>

                      {/* Search Option*/}
                      <li className="nav-item">
                        <div className="desktop-search">
                          <button
                            className="desktop-search-btn"
                            type="button"
                            title="Search"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasTopSearch"
                            aria-controls="offcanvasTopSearch"
                          >
                            <Icon icon="tabler:search" width="20" height="20" />
                          </button>
                        </div>
                      </li>

                      {/* Quick Link Options*/}
                      <li className="nav-item">
                        <a
                          className="nav-link quick-btn dropdown-toggle"
                          href="#"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasTop"
                          aria-controls="offcanvasTop"
                        >
                          Quick Link
                        </a>
                      </li>

                      {/* Apply Now Options*/}
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link apply-now-nav dropdown-toggle"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Apply Now
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <a
                              className="dropdown-item"
                              href="https://admission.ewubd.edu/"
                            >
                              Admission
                            </a>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/pages/career"
                            >
                              Career
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  {/* Bottom Row */}
                  <div className="menubar-row">
                    {/* Bottom Left Menus */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      {menus &&
                        renderMenus(
                          getBottomMenus(getHeaderMenus(menus))
                        ).slice(0, 4)}
                    </ul>

                    {/* Bottom Right Menus */}
                    <ul className="navbar-nav mb-2 mb-lg-0">
                      {menus &&
                        renderMenus(
                          getBottomMenus(getHeaderMenus(menus))
                        ).slice(4)}
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
            {/* Logo Section */}
            <div className="logo-part">
              <div className="logo-img">
                <Image
                  src={logoLight}
                  width={300}
                  height={200}
                  className="logo logo-bg"
                  alt="EWU Logo Wrapper"
                />
                <div className="logo-img-inside">
                  <Link href={header?.headerLogoLink || "/pages/landing-page"}>
                    <Image
                      src={
                        header?.headerLogoUrl || isDark
                          ? mobileLogoDark
                          : logoBrand
                      }
                      width={300}
                      height={200}
                      className="logo"
                      alt="EWU Logo"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Mega Menu Modal */}
        <MegaMenuModal />

        {/* Search Modal */}
        <SearchModal />

        {/* Quick Links Modal */}
        <QuickLinksModal />

        {/* Mobile Header */}
        <MobileHeader />

        {/* Mobile Menus */}
        <MobileMenus />
      </section>
  );
};

export default Navbar;
