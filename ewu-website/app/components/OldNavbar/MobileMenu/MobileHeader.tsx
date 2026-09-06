import "./MobileHeader.scss";
import mobileLogoLight from "@/app/assets/mobile-logo-light.png";
import mobileLogoDark from "@/app/assets/mobile-logo-dark.png";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useMenuBuild } from "../../../../lib/hooks/useMenuBuild";
import { useRouter } from "next/navigation";
import { usePageData } from "@lib/hooks/usePageData";

export function MobileHeader() {
  const { defaultHeader: header } = usePageData();

  const { isDark, isStatic, themeClick, staticClick } = useMenuBuild();

  const router = useRouter();

  return (
    <div className="mobile-header">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          {/* Logo Section */}
          <Link className="logo" href={header?.headerLogoLink || "/"}>
            <Image
              src={
                header?.headerLogoUrl || isDark
                  ? mobileLogoDark
                  : mobileLogoLight
              }
              width={300}
              height={200}
              className="logo"
              alt="EWU Logo"
            />
          </Link>
          {/* Mobile Options */}
          <div>
            <ul className="mobile-header-menu">
              {/* Search Option */}
              <li>
                <button
                  className="search-btn"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasTopSearch"
                  aria-controls="offcanvasTopSearch"
                >
                  <Icon icon="stash:search" width="20" height="20" />
                </button>
              </li>

              {/* Accessibility Options */}
              <li className="btn-group">
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
                <div className="dropdown-menu dropdown-menu-end accessibility-main-dropdown">
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
                        {isStatic ? <span>Dynamic</span> : <span>Static</span>}
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
              </li>

              {/* Login Options */}
              <li className="btn-group">
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
                  <Icon icon="iconamoon:profile" width="20" height="20" />
                </button>
              </li>

              {/* Helpdesk Option */}
              <li>
                <button
                  type="button"
                  className="login-btn"
                  title="Help Desk"
                  data-bs-toggle="dropdown"
                  data-bs-display="static"
                  aria-expanded="false"
                  onClick={() => router.push("/pages/helpdesk")}
                >
                  <Icon icon="la:question" width="24" height="24" />
                </button>
              </li>

              {/* Menu Button */}
              <li>
                <button
                  className="menu-btn"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                >
                  <Icon icon="eva:menu-outline" width="24" height="24" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
