"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import "./ClubNotices.scss";
import { usePageData } from "@lib/hooks/usePageData";
import Link from "next/link";
import { useClubData } from "@lib/hooks/useClubData";
import { useParams } from "next/navigation";

const ClubNotices: React.FC = () => {
  const { pageNotices, pageId } = usePageData();

  const { slug } = useParams();

  // Group notices by category
  const noticesByCategory = {};
  pageNotices?.forEach((notice) => {
    if (!noticesByCategory[notice.category]) {
      noticesByCategory[notice.category] = [];
    }
    noticesByCategory[notice.category].push(notice);
  });

  // Get category names
  const categoryNames = Object.keys(noticesByCategory);

  const { dynamicStyles } = useClubData();

  return (
    <>
      <section className="clubs-notice-part" style={dynamicStyles}>
        <div className="container">
          <div className="clubs-notice-title">
            <h1>Clubs Notice</h1>
            <Link href={`/pages/club-notice-all/${slug}?pageId=${pageId}`}>
              {" "}
              View All{" "}
              <Icon icon="si:arrow-right-duotone" width="20" height="20" />
            </Link>
          </div>
          {categoryNames?.map((category) => (
            <div key={category} className="clubs-notice-items">
              <div className="clubs-notice-main-title">
                <h2>{category}</h2>
              </div>
              <div className="clubs-notice-main-items">
                <div className="important-dates-items">
                  {noticesByCategory[category].map((notice, index) => (
                    <div key={notice.id} className="important-dates-box">
                      <div className="important-dates-number">
                        <h1>{index + 1}</h1>
                      </div>
                      <div className="important-dates-info">
                        <h4>{notice.label}</h4>
                        <p className="d-flex align-items-center gap-1">
                          <Icon
                            icon="stash:data-date-light"
                            width="22"
                            height="22"
                          />
                          <span>{new Date(notice.date).toDateString()}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ClubNotices;
