"use client";

import "./NoticeList.scss";
import { Icon } from "@iconify/react";
import moment from "moment";
import { FC } from "react";
import Link from "next/link";
import { useNoticeData } from "@lib/hooks/useNoticeData";
import { useViewAllLink } from "@lib/hooks/useViewAllLink";

const NoticeList: FC = () => {
  const { pageNotices: notices } = useNoticeData();
  const viewAllLink = useViewAllLink({ componentName: "NoticeList" });

  if (!notices || notices.length === 0) return null;

  // Group notices by category
  const noticesByCategory = {};

  notices?.forEach((notice) => {
    if (!noticesByCategory[notice.category]) {
      noticesByCategory[notice.category] = [];
    }
    noticesByCategory[notice.category].push(notice);
  });

  // Get category names
  const categoryNames = Object.keys(noticesByCategory);

  // If grouping results in empty categories → hide component
  if (categoryNames.length === 0) return null;

  return (
    <section className="all-notice-part">
      <div className="container">
        <div className="header-with-view-all-button">
          <h2>Notice</h2>
          <Link href={viewAllLink || ""} className="for-all-view-all-button">
            View All
            <Icon icon="si:arrow-right-duotone" width="20" height="20" />
          </Link>
        </div>

        <div className="row mt-4">
          <div className="notice-content">
            {categoryNames.map((category, index) => (
              <div key={index} className="notice-category-column">
                <h2>{category}</h2>

                <div className="category-notices">
                  {noticesByCategory[category]
                    .map((item) => (
                      <Link
                        key={item.id}
                        href={`/pages/notice-details/${item?.slug}`}
                      >
                        <div key={item.id} className="item-box">
                          <div className="item-date">
                            <h2>{moment(item.date).format("DD")}</h2>
                            <p>{moment(item.date).format("MMM")}</p>
                            <p>{moment(item.date).format("YYYY")}</p>
                          </div>
                          <div className="item-info">
                            <p>{item.label}</p>
                          </div>
                        </div>
                      </Link>
                    ))
                    ?.slice(0, 5)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeList;
