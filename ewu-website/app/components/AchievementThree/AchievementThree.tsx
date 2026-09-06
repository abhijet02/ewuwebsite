"use client";

import { FC } from "react";
import Image from "next/image";
import "./AchievementThree.scss";
import PartnershipsOne from "../PartnershipsOne/PartnershipsOne";
import { Icon } from "@iconify/react";
import moment from "moment";
import { usePageData } from "@lib/hooks/usePageData";
import Link from "next/link";

const AchievementThree: FC = () => {
  const { pageId, pageAchievements: achievements } = usePageData();

  return (
    <div className="third-partnership-affilates-our-achievements-section">
      <div className="container p-0">
        <div className="row">
          <div className=" col-lg-7">
            <PartnershipsOne />
          </div>

          <div className="col-lg-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="upcoming-event-title">Our Achievements</h2>
              <a
                href={`/pages/achievements?pageId=${pageId}`}
                className="dates-main-btn"
              >
                View All
                <Icon
                  className="dates-arrow"
                  icon="eva:diagonal-arrow-right-up-outline"
                  width="18"
                  height="18"
                />
              </a>
            </div>

            {achievements?.map((item) => (
              <div key={item.id} className="achievement-card">
                <Image
                  src={item?.thumbnail}
                  width={180}
                  height={160}
                  alt="News Banner"
                />{" "}
                <div className="achievement-content">
                  <div className="achievement-date">
                    Achievement On : {moment(item.date).format("DD-MM-YYYY")}
                  </div>
                  <p className="achievement-description">
                    {item.label.slice(0, 85) + "..."}
                  </p>
                  <Link
                    href={`/pages/achievement-details/${item?.slug}`}
                    className="view-details-btn"
                  >
                    View Details{" "}
                    <Icon
                      className="dates-arrow"
                      icon="eva:diagonal-arrow-right-up-outline"
                      width="20"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementThree;
