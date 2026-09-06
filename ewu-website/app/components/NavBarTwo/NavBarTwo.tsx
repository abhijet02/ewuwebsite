"use client";

import "./NavBarTwo.scss";
import logoBrand from "@/app/assets/mobile-logo-dark.png";
import mobileLogoDark from "@/app/assets/mobile-logo-dark.png";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePageData } from "@lib/hooks/usePageData";
import { useMenuBuild } from "@lib/hooks/useMenuBuild";
import { MegaMenuModal } from "../OldNavbar/MegaMenuModal/MegaMenuModal";
import SearchModal from "../OldNavbar/SearchModal/SearchModal";
import QuickLinksModal from "../OldNavbar/QuickLinksModal/QuickLinksModal";
import { MobileHeader } from "../OldNavbar/MobileMenu/MobileHeader";
import { MobileMenus } from "../OldNavbar/MobileMenu/MobileMenus";

const NavbarTwo: React.FC = () => {
  const { defaultHeader: header } = usePageData();
  const {
    isDark,
    isStatic,
    menus,
    getHeaderMenus,
    getTopMenus,
    getBottomMenus,
    renderMenusTwo,
    themeClick,
    staticClick,
  } = useMenuBuild();

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

  return (
    <>
      <section className={`header-part ${isScrolled ? "scrolled" : ""}`}>
        {/* Desktop Header */}
        <nav className="navbar-part">
          <div className="header-nav">
            <div className="row align-items-center justify-content-between">
              {/* Logo Section */}
              <div className="col-lg-2 col-md-3 col-4">
                <Link
                  className="navbar-brand"
                  href={header?.headerLogoLink || "/"}
                >
                  <div className="logo-img-inside">
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
                  </div>
                </Link>
              </div>

              <div className="col-lg-10">
                <div className="header-merged-menu">
                  {/* Top Row */}
                  <div className="row align-items-center mb-3">
                    {/* Top Left Menus */}
                    <div className="col">
                      <ul className="header-menu d-flex flex-wrap gap-2">
                        {menus &&
                          renderMenusTwo(getTopMenus(getHeaderMenus(menus)))}
                      </ul>
                    </div>

                    {/* Top Right Menus */}
                    <div className="col d-flex align-items-center gap-2 justify-content-end">
                      {/* Accessibility Options*/}
                      <div className="btn-group">
                        <button
                          type="button"
                          className="login-btn dropdown-toggle"
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
                        <div className="accessibility-main-dropdown dropdown-menu">
                          <h1>ACCESSIBILITY OPTION</h1>
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
                              <button className="dropdown-item" type="button">
                                <Icon
                                  icon="fluent:speaker-2-24-regular"
                                  width="30"
                                  height="30"
                                />
                                <span>Audio Transcript</span>
                              </button>
                            </div>
                            <div className="accessibility-item">
                              <button className="dropdown-item" type="button">
                                <Icon
                                  icon="material-symbols:text-fields-rounded"
                                  width="30"
                                  height="30"
                                />
                                <span>Bigger Text</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Login Options*/}
                      <div className="btn-group">
                        <button
                          type="button"
                          className="login-btn dropdown-toggle"
                          title="Log In"
                          style={{ fontSize: "0" }}
                          data-bs-toggle="dropdown"
                          data-bs-display="static"
                          aria-expanded="false"
                        >
                          <Icon
                            icon="iconamoon:profile"
                            width="20"
                            height="20"
                          />
                        </button>
                        <ul className="dropdown-menu login-menu-items custom-dropdown">
                          <li>
                            <div className="login-items">
                              <div className="item">
                                <Link className="dropdown-item" href="">
                                  <Icon
                                    icon="mynaui:users-group-solid"
                                    width="36"
                                    height="36"
                                  />
                                  <span>Staff</span>
                                </Link>
                              </div>
                              <div className="item">
                                <Link className="dropdown-item" href="">
                                  <Icon
                                    icon="mdi:user-tie"
                                    width="36"
                                    height="36"
                                  />
                                  <span>Faculties</span>
                                </Link>
                              </div>
                              <div className="item">
                                <Link className="dropdown-item" href="">
                                  <Icon
                                    icon="ph:student"
                                    width="36"
                                    height="36"
                                  />
                                  <span>Students</span>
                                </Link>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>

                      {/* Helpdesk Option*/}
                      <div>
                        <button
                          type="button"
                          className="login-btn dropdown-toggle"
                          title="Help Desk"
                          style={{ fontSize: "0" }}
                          data-bs-toggle="dropdown"
                          data-bs-display="static"
                          aria-expanded="false"
                        >
                          <Icon icon="la:question" width="24" height="24" />
                        </button>
                      </div>

                      {/* Search Option*/}
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

                      {/* Quick Link Options*/}
                      <div>
                        <button
                          className="quick-btn"
                          type="button"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasTop"
                          aria-controls="offcanvasTop"
                        >
                          Quick Link
                          <Icon
                            className="ms-1"
                            icon="material-symbols:keyboard-arrow-down-rounded"
                            width="16"
                            height="16"
                          />
                        </button>
                      </div>

                      {/* Apply Now Options*/}
                      <div className="dropdown helpdesk-btn onhover-dropdown-custom">
                        <ul>
                          <li>
                            <Link className="dropdown-hover" href="#">
                              Apply Now
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end custom-dropdown end-0">
                              <li>
                                <Link className="dropdown-item" href="">
                                  Admission
                                </Link>
                                <Link className="dropdown-item" href="">
                                  Career
                                </Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="row">
                    {/* Bottom Menus */}
                    <div className="col">
                      <ul className="main-menu d-flex flex-wrap gap-3">
                        {menus &&
                          renderMenusTwo(getBottomMenus(getHeaderMenus(menus)))}
                      </ul>
                    </div>
                  </div>
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
    </>
  );
};

export default NavbarTwo;
