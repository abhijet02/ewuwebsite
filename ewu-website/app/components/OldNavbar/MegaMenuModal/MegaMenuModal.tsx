import "./MegaMenuModal.scss";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useMenuBuild } from "../../../../lib/hooks/useMenuBuild";
import { YesOrNo } from "@lib/services/menu/menu.service.type";
import { usePageData } from "@lib/hooks/usePageData";

export function MegaMenuModal() {
  const { defaultHeader: header } = usePageData();
  const { menus, sortParentMenus, getChildMenus, hasChild } = useMenuBuild();

  return (
    <>
      {menus &&
        sortParentMenus(menus).map((m) =>
          m.isMegaMenu == YesOrNo.YES ? (
            <div
              key={m.id}
              className="custom-quick-links offcanvas offcanvas-top"
              tabIndex={-1}
              id={m.label}
              aria-labelledby="offcanvasTopLabel"
            >
              {/* Modal Header */}
              <div className="d-flex justify-content-between offcanvas-header quick-links-header">
                <h2>{header?.megamenuTitle}</h2>
                <button
                  className="bg-transparent border-0 text-2 text-white"
                  type="button"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <Icon icon="formkit:close" width="26" height="30" />
                </button>
              </div>

              <div className="offcanvas-body">
                {/* Apply Now and Inquiry Buttons */}
                <div className="d-flex align-items-center justify-content-end mb-5 quick-links-header">
                  <div className="d-flex gap-3">
                    <Link
                      className="apply-btn pt-2"
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
                      className="academic-btn pt-2"
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
                      className="inquiry-btn pt-2"
                      href={header?.megaMenuBtn3Link || "/"}
                    >
                      {header?.megaMenuBtn3Title}
                      <Icon
                        icon="pepicons-pencil:arrow-up"
                        width="20"
                        height="20"
                      />
                    </Link>
                  </div>
                </div>

                {/* Child Menus */}
                <div className="g-5 row quick-menu">
                  <div className="col-lg-4">
                    <div className="quick-menu-left">
                      {hasChild(m, menus) &&
                        getChildMenus(m.id, menus)
                          .splice(0, 3)
                          .map((child) => (
                            <div
                              key={`${child.id}${child.label.trim()}`}
                              className="accordion accordion-flush"
                            >
                              <div className="accordion-item">
                                <h2 className="accordion-header">
                                  <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#${child.label
                                      .trim()
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}`}
                                    aria-expanded="false"
                                    aria-controls={child.label
                                      .trim()
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}
                                  >
                                    {child.label}
                                  </button>
                                </h2>
                                <div
                                  id={child.label
                                    .trim()
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}
                                  className="accordion-collapse collapse"
                                  data-bs-parent="#accordionLeft"
                                >
                                  <div className="accordion-body">
                                    <div className="list-group list-group-flush">
                                      {hasChild(child, menus) && (
                                        <ul>
                                          {getChildMenus(child.id, menus).map(
                                            (grandChild) => (
                                              <li
                                                key={`${
                                                  grandChild.id
                                                }${grandChild.label.trim()}`}
                                              >
                                                <Link
                                                  className={`list-group-item list-group-item-action`}
                                                  href={grandChild.link}
                                                >
                                                  {grandChild.label}
                                                </Link>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                  {hasChild(m, menus) &&
                    getChildMenus(m.id, menus)
                      ?.splice(3, getChildMenus(m.id, menus).length)
                      ?.map((child) => (
                        <div
                          key={`${child.id}${child.label.trim()}`}
                          className="col-lg-4"
                        >
                          <div className="quick-menu-left">
                            <div className="quick-link-right-menus">
                              <h3>
                                <Link href={child.link}>{child.label}</Link>
                              </h3>
                              {hasChild(child, menus) && (
                                <ul>
                                  {getChildMenus(child.id, menus).map(
                                    (grandChild) => (
                                      <li
                                        key={`${
                                          grandChild.id
                                        }${grandChild.label.trim()}`}
                                      >
                                        <Link href={grandChild.link}>
                                          {grandChild.label}
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          ) : (
            <div key={m.id}></div>
          )
        )}
    </>
  );
}
