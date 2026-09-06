"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useState } from "react";
import "./MegaMenuModal.scss";
interface Menu {
  id: number;
  label: string;
  link: string;
  parent: number;
  isMegaMenu?: "YES" | "NO";
  menuType?: string;
  menuPosition?: string;
}

interface MegaMenuProps {
  show: boolean;
  menus: Menu[];
  activeMegaMenuId: number | null;
  onClose: () => void;
  getNestedMenus: (menus: Menu[], parentId: number) => Menu[];
  itemsPerColumn?: number;
  quickLinks?: QuickLink[]; // NEW
  isQuickLinks?: boolean; // NEW
}

interface QuickLink {
  id: number;
  label: string;
  url: string;
  category: string;
}
const MegaMenu: React.FC<MegaMenuProps> = ({
  show,
  menus,
  activeMegaMenuId,
  onClose,
  getNestedMenus,
  itemsPerColumn = 10,
  isQuickLinks = false,
  quickLinks,
}) => {
  const [expandedParentIds, setExpandedParentIds] = useState<number[]>([]);

  const firstLevelMenus = activeMegaMenuId
    ? menus.filter((m) => m.parent === activeMegaMenuId)
    : [];

  const toggleExpand = (id: number) => {
    setExpandedParentIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <div className={`megamenu-body ${show ? "show" : ""}`}>
      <div className="row g-5" style={{ height: "100%" }}>
        {isQuickLinks && quickLinks ? (
          // ✅ Quick Links Mode
          [...new Set(quickLinks.map((ql) => ql.category))].map((category) => {
            const links = quickLinks.filter((ql) => ql.category === category);

            return (
              <div key={category} className="col-12 col-sm-6 col-md-3 col-lg-3">
                {/* Section Title */}
                <div className="megamenu-title">
                  <h6>{category}</h6>
                </div>

                {/* Child Links */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    padding: "12px 0px",
                  }}
                >
                  {links.map((link) => (
                    <Link
                      key={link.id}
                      href={link.url}
                      onClick={onClose}
                      className="megamenu-link"
                    >
                      <div className="icon-body">
                        <Icon
                          icon="solar:map-arrow-right-bold-duotone"
                          width={16}
                          height={16}
                        />
                      </div>
                      <p>{link.label}</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })
        ) : firstLevelMenus.length > 0 ? (
          // ✅ Normal Menu Mode
          firstLevelMenus.map((parent) => {
            const allChildren = getNestedMenus(menus, parent.id);
            const isExpanded = expandedParentIds.includes(parent.id);
            const visibleChildren = isExpanded
              ? allChildren
              : allChildren.slice(0, itemsPerColumn);

            return (
              <div
                key={parent.id}
                className="col-12 col-sm-6 col-md-3 col-lg-3"
              >
                <div className="megamenu-title">
                  <h6>{parent.label}</h6>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    padding: "12px 0px",
                  }}
                >
                  {visibleChildren.map((child) => (
                    <Link
                      key={child.id}
                      href={child.link}
                      onClick={onClose}
                      className="megamenu-link"
                    >
                      <div className="icon-body">
                        <Icon
                          icon="solar:map-arrow-right-bold-duotone"
                          width={16}
                          height={16}
                        />
                      </div>
                      {child.label}
                    </Link>
                  ))}
                  {/* Show More / Less Button */}{" "}
                  {allChildren.length > itemsPerColumn && (
                    <button
                      onClick={() => toggleExpand(parent.id)}
                      style={{
                        color: "#00baff",
                        background: "transparent",
                        border: "none",
                        fontSize: "15px",
                        fontWeight: 500,
                        cursor: "pointer",
                        marginTop: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      {" "}
                      {isExpanded ? (
                        <div
                          style={{
                            border: "1px solid #fff",
                            color: "#fff",
                            padding: "2px 8px",
                          }}
                        >
                          {" "}
                          Show Less{" "}
                          <Icon
                            icon="line-md:minus"
                            width={18}
                            height={18}
                          />{" "}
                        </div>
                      ) : (
                        <div
                          style={{
                            border: "1px solid #fff",
                            color: "#fff",
                            padding: "2px 8px",
                          }}
                        >
                          {" "}
                          Show More{" "}
                          <Icon
                            icon="line-md:plus"
                            width={18}
                            height={18}
                          />{" "}
                        </div>
                      )}{" "}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12">
            <p style={{ color: "#fff" }}>No child menus found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MegaMenu;
