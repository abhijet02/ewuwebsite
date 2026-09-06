"use client";

import "./ClubNavbar.scss";
import Link from "next/link";
import Image from "next/image";
import logobg from "../../assets/club-navbar-logo-bg.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useClubSensitiveData } from "@lib/hooks/useClubSensitiveData";
import { usePageData } from "@lib/hooks/usePageData";
import { MenuType } from "@lib/services/menu/menu.service.type";

const ClubNavbar: React.FC = () => {
  const {
    dynamicStyles,
    club,
    clubPageId,
    clubMemberTrimmedPathName,
    clubTitleMemberPage,
    clubEventDetailsPageTitle,
    clubNewsDetailsPageTitle,
    clubNoticeDetailsPageTitle,
  } = useClubSensitiveData();

  const { menus, headers, pages } = usePageData();

  const { id } = useParams();
  const { slug } = useParams();

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const pageParams = searchParams.get("pageId");

  const page = pages?.find((page) => page?.link?.toString() === pathName);

  const pageHeader = headers?.find(
    (header) =>
      header?.pageId === page?.id ||
      header?.pageId === page?.contentOf ||
      header?.pageId.toString() === pageParams
  );

  const header = pageHeader;

  const pageMenus = menus?.filter((menu) => {
    if (
      menu?.menuType === MenuType.HEADER &&
      (menu?.pageId === page?.id ||
        menu?.pageId === page?.contentOf ||
        menu?.pageId.toString() === pageParams)
    ) {
      return menu;
    }
  });

  function buildMenuTree(menus: any[]) {
    const menuMap: Record<number, any> = {};
    const tree: any[] = [];

    // Clone and initialize each menu
    const clonedMenus = menus?.map((menu) => ({ ...menu }));

    // Populate map
    clonedMenus?.forEach((menu) => {
      menuMap[menu.id] = menu;
    });

    // Build tree structure
    clonedMenus?.forEach((menu) => {
      if (menu.parent && menuMap[menu.parent]) {
        if (!menuMap[menu.parent].child) {
          menuMap[menu.parent].child = [];
        }
        menuMap[menu.parent].child.push(menu);
      } else {
        tree.push(menu);
      }
    });

    return tree;
  }

  return (
    <div className="club-navbar-part" style={dynamicStyles}>
      <div className="desktop-menu">
        <div className="navbar-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <p
                  style={{
                    height: "40px",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    fontSize: "24px",
                    color: "#fff",
                    fontWeight: 500,
                    textTransform: "uppercase",
                  }}
                >
                  {club?.title ||
                    clubTitleMemberPage?.title ||
                    clubEventDetailsPageTitle ||
                    clubNewsDetailsPageTitle ||
                    clubNoticeDetailsPageTitle}
                </p>
              </div>
              <div className="col-lg-6">
                <div className="become-member-button">
                  {clubMemberTrimmedPathName !== "club-member" && (
                    <Link href={`/pages/club-member/${slug || id}`}>
                      Become a Member
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="navbar-bottom-left">
                  <ul>
                    {pageMenus &&
                      buildMenuTree(pageMenus)
                        .slice(0, 4)
                        .map((item) => (
                          <li key={item.id}>
                            {item.child ? (
                              <div className="dropdown onhover-dropdown-custom">
                                <Link className="dropdown-hover" href="#">
                                  {item.label}{" "}
                                  <Icon
                                    icon="material-symbols:keyboard-arrow-down-rounded"
                                    width="16"
                                    height="16"
                                  />
                                </Link>
                                <ul className="dropdown-menu custom-dropdown">
                                  {item.child.map((child) => (
                                    <li key={child.id}>
                                      <Link
                                        className="dropdown-item"
                                        href={`${child.link}`}
                                      >
                                        {child.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <Link className="dropdown-hover" href={item.link}>
                                {item.label}
                              </Link>
                            )}
                          </li>
                        ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="navbar-bottom-right">
                  <ul>
                    {pageMenus &&
                      buildMenuTree(pageMenus)
                        .slice(4)
                        .map((item) => (
                          <li key={item.id}>
                            {item.child ? (
                              <div className="dropdown onhover-dropdown-custom">
                                <Link className="dropdown-hover" href="#">
                                  {item.label}{" "}
                                  <Icon
                                    icon="material-symbols:keyboard-arrow-down-rounded"
                                    width="16"
                                    height="16"
                                  />
                                </Link>
                                <ul className="dropdown-menu custom-dropdown">
                                  {item.child.map((child) => (
                                    <li key={child.id}>
                                      <Link
                                        className="dropdown-item"
                                        href={child.link}
                                      >
                                        {child.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <Link className="dropdown-hover" href={item.link}>
                                {item.label}
                              </Link>
                            )}
                          </li>
                        ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="logo-part">
          <div className="logo-img">
            <Image
              src={logobg}
              width={300}
              height={200}
              className="logo logo-bg"
              alt="BG Logo"
            />
            <div className="logo-img-inside">
              <Link href={`${header?.headerLogoLink}`}>
                <Image
                  src={header?.headerLogoUrl}
                  width={300}
                  height={200}
                  className="logo"
                  alt="Club Logo"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="mobile-header">
        <div className="d-flex justify-content-start club-name-mobile"></div>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="logo">
              <Link href={`${header?.headerLogoLink}`}>
                <Image
                  src={header?.headerLogoUrl}
                  width={300}
                  height={200}
                  className="logo"
                  alt="Picture of the author"
                />
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <p style={{ margin: 0 }}>
                {club?.title ||
                  clubTitleMemberPage?.title ||
                  clubEventDetailsPageTitle ||
                  clubNewsDetailsPageTitle ||
                  clubNoticeDetailsPageTitle}
              </p>
              <button
                className="menu-btn"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
              >
                <Icon icon="eva:menu-outline" width="24" height="24" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div
        className="offcanvas offcanvas-start side-mobile-menu"
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <div className="logo-side">
            <Link href={`${header?.headerLogoLink}`}>
              <Image
                src={header?.headerLogoUrl}
                width={300}
                height={200}
                className="logo"
                alt="Picture of the author"
              />
            </Link>
          </div>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="overflow-auto">
          <div className="side-menu-body">
            <ul className="side-main-menu">
              {pageMenus &&
                buildMenuTree(pageMenus).map((item) =>
                  item.child ? (
                    <li key={item.id} className="dropdown nav-item">
                      <Link
                        className="dropdown-hover nav-link"
                        href="#"
                        id={`navbarDropdown-${item.id}`}
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {item.label}{" "}
                        <Icon
                          icon="material-symbols:keyboard-arrow-down-rounded"
                          width="16"
                          height="16"
                        />
                      </Link>
                      <ul
                        className="dropdown-menu side-menu-dropdown"
                        aria-labelledby={`navbarDropdown-${item.id}`}
                      >
                        {item.child.map((child) => (
                          <li key={child.id}>
                            <Link className="dropdown-item" href={child.link}>
                              <Icon icon="bi:dot" width="16" height="16" />
                              <span>{child.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li key={item.id}>
                      <Link
                        className="dropdown-hover"
                        href={item.link}
                        style={{ width: "100%" }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                )}
              <li style={{ padding: "16px" }}>
                <div className="become-member-button">
                  {clubMemberTrimmedPathName !== "club-member" && (
                    <Link
                      href={`/pages/club-member/${slug || id}?pageId=${
                        clubPageId || page?.id || parseInt(pageParams)
                      }`}
                      style={{
                        color: "#fff",
                        padding: "0 20px",
                        height: "40px",
                        borderRadius: "4px",
                        background: "var(--primary-color-bg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: " 16px",
                      }}
                    >
                      Become a Member
                    </Link>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubNavbar;
