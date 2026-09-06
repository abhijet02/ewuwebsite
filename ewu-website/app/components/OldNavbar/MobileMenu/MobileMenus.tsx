import mobileLogoLight from "@/app/assets/mobile-logo-light.png";
import mobileLogoDark from "@/app/assets/mobile-logo-dark.png";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useMenuBuild } from "../../../../lib/hooks/useMenuBuild";
import "./MobileMenus.scss";
import { usePageData } from "@lib/hooks/usePageData";

// Reusable SVG bullet
const BulletIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.84712 1.36052C7.78848 1.38479 7.70401 1.43744 7.65943 1.47755C7.6148 1.51762 7.25915 2.18819 6.86901 2.96767C6.07224 4.55969 5.82522 4.96811 5.40538 5.38753C4.96572 5.82674 4.69141 5.99148 3.02366 6.81799C1.36678 7.63908 1.33325 7.66235 1.33325 7.9924C1.33325 8.31544 1.36915 8.34052 2.99932 9.15582C4.69618 10.0044 4.95751 10.1617 5.39197 10.5957C5.83971 11.043 6.05212 11.3921 6.87869 13.0393C7.56386 14.4047 7.63905 14.5356 7.77515 14.6001C7.9763 14.6955 8.10699 14.6887 8.2805 14.5739C8.40367 14.4925 8.55134 14.2311 9.22189 12.908C9.65931 12.0449 10.0841 11.2433 10.1657 11.1266C10.3779 10.8238 10.8764 10.3337 11.179 10.1304C11.3216 10.0346 12.1147 9.61796 12.9416 9.20443C13.7953 8.7775 14.4916 8.40262 14.5526 8.33709C14.6945 8.18471 14.7064 7.81658 14.5741 7.66983C14.5268 7.61735 13.8304 7.24603 13.0265 6.84461C11.4982 6.08154 11.1376 5.87115 10.7485 5.51589C10.2664 5.07573 10.0945 4.80255 9.24339 3.123C8.70644 2.06347 8.38974 1.48498 8.31911 1.43469C8.18038 1.33592 7.98194 1.30474 7.84712 1.36052Z"
      fill="#1E3E6D"
    />
  </svg>
);

export const MobileMenus = () => {
  const { defaultHeader: header } = usePageData();
  const {
    isDark,
    menus,
    isQuickLink,
    getHeaderMenus,
    sortParentMenus,
    hasChild,
    skipSecondLevelIfThreeLevels,
  } = useMenuBuild();

  return (
    <div
      className="offcanvas offcanvas-start side-mobile-menu"
      tabIndex={-1}
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header">
        <Link className="logo-side" href={header?.headerLogoLink || "/"}>
          <Image
            src={
              header?.headerLogoUrl || isDark ? mobileLogoDark : mobileLogoLight
            }
            width={300}
            height={200}
            className="logo"
            alt="EWU Logo"
          />
        </Link>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="overflow-auto">
        {isQuickLink && (
          <div className="side-menu-body">
            <ul className="side-main-menu">
              {menus &&
                sortParentMenus(getHeaderMenus(menus))
                  .slice()
                  .sort((a, b) => a.mobileSort - b.mobileSort)
                  .map((item) =>
                    hasChild(item, menus) ? (
                      <li key={item.id} className="dropdown nav-item">
                        <Link
                          className="dropdown-hover nav-link"
                          href="#"
                          id="navbarDropdown"
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
                          aria-labelledby="navbarDropdown"
                        >
                          {skipSecondLevelIfThreeLevels(item.id, menus).map(
                            (child) => (
                              <li key={child.id}>
                                <Link
                                  className="dropdown-item"
                                  href={child.link}
                                >
                                  <BulletIcon />
                                  <span>{child.label}</span>
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </li>
                    ) : (
                      <li key={item.id}>
                        <Link className="dropdown-hover" href={item.link}>
                          {item.label}
                        </Link>
                      </li>
                    )
                  )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
