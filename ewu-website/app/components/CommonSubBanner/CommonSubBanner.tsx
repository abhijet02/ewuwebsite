"use client";

import { Icon } from "@iconify/react";
import "./CommonSubBanner.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePageData } from "@lib/hooks/usePageData";
import { useCommonSubBannerData } from "@lib/hooks/useCommonSubBannerData";

interface ICommonSubBanner {
  link: string[];
  title: string;
}

interface BreadcrumbProps {
  parentMenus: { id: string | number; label: string; link: string }[];
  link: string;
  title: string;
}

function Breadcrumb({ parentMenus, link, title }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-sm font-medium text-gray-600"
    >
      {parentMenus?.map((menu, index) => (
        <span key={menu.id} className="flex items-center">
          <Link href={menu.link} className="breadcrumb-title">
            {menu.label}
          </Link>
          {index < parentMenus.length - 1 && (
            <Icon
              icon="mdi:chevron-right"
              width="18"
              height="18"
              style={{ color: "#ccccccff" }}
            />
          )}
        </span>
      ))}

      {parentMenus?.length > 0 && (
        <Icon
          icon="mdi:chevron-right"
          width="18"
          height="18"
          style={{ color: "#ccccccff" }}
        />
      )}

      <span
        className="text-[#1c4370] font-semibold"
        style={{ fontSize: "12px", color: "#FFF" }}
      >
        {title}
      </span>
    </nav>
  );
}

const CommonSubBanner: React.FC<ICommonSubBanner> = ({ link, title }) => {
  const router = useRouter();
  const { parentMenus, parentPage } = useCommonSubBannerData();
  
  return (
    <>
      <section className="common-sub-banner-part">
        <div className="container">
          <div className="common-sub-banner">
            <h1>{`${ parentPage ? (title!=parentPage?.label? parentPage?.label+':  ': ''): ''}${title}`}</h1>
            <Breadcrumb
              parentMenus={parentMenus}
              link={link[0]}
              title={title}
            />
            <div className="common-sub-link">
              <div className="d-flex align-items-center w-100">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => router.back()}
                >
                  <div
                    style={{
                      borderRight: "1.5px solid rgba(0, 0, 0, 0.2)",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon icon="ep:arrow-left" width="20" height="20" />
                  </div>
                  <div
                    style={{ padding: "8px 16px", margin: 0, fontSize: "14px" }}
                  >
                    Back
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommonSubBanner;
