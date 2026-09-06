"use client";

import { FC, useState } from "react";
import "./AchievementAll.scss";
import { Icon } from "@iconify/react";
import Image from "next/image";
import moment from "moment";
import { usePageData } from "@lib/hooks/usePageData";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import Pagination from "@/app/components/Pagination/Pagination";
import PlaceHolder from "public/placeholder.png";
const ITEMS_PER_PAGE = 12;

const AchievementAll: FC = () => {
  const { paramAchievements: achievements } = usePageData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  // extract unique categories
  const categories = [
    "All",
    ...new Set(achievements?.map((a) => a.category).filter(Boolean)),
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // filter by category
  const filteredAchievements = achievements
    ?.filter((a) =>
      selectedCategory === "All" ? true : a?.category === selectedCategory
    )
    .filter((a) => a?.label.toLowerCase().includes(searchTerm.toLowerCase()));

  // pagination calculations
  const totalPages = Math.ceil(filteredAchievements?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAchievements = filteredAchievements?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <section className="achievement-all-section">
      <div className="container">
        <div className="header-wrapper">
          <h2>Achievements</h2>
        </div>

        <div className="achivement-tabs-wrapper">
          <div className="achivement-tabs-wrapper d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <div className="achivement-tabs d-flex flex-wrap gap-2">
              {categories?.map((item) => (
                <button
                  key={item}
                  className={`achivement-tab ${
                    selectedCategory === item ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory(item);
                    setCurrentPage(1);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Search achievements..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="achievement-search-input"
              style={{ minWidth: "200px" }}
            />
          </div>
        </div>

        <div className="row g-4">
          {currentAchievements?.map((data, index) => (
            <div
              key={index}
              {...(!isStatic
                ? {
                    "data-aos":
                      window.innerWidth < 800
                        ? "fade-up"
                        : index === 0
                        ? "fade-right"
                        : index === currentAchievements.length - 1
                        ? "fade-left"
                        : "zoom-in",
                  }
                : {})}
              className="col-12 col-sm-12 col-md-4 col-lg-4"
            >
              <Link
                className="data-card"
                href={`/pages/achievement-details/${data?.slug}`}
              >
                <div className="achievement-image">
                  {data?.thumbnail && (
                    <Image
                      src={data?.thumbnail || PlaceHolder}
                      alt={data?.label || "achievement"}
                      fill
                      style={{
                        objectFit: "cover",
                        overflow: "hidden",
                        borderRadius: "16px",
                      }}
                    />
                  )}
                </div>

                <div className="achievement-date">
                  <Icon
                    icon="material-symbols:date-range-outline-rounded"
                    width="16"
                    height="16"
                  />
                  {moment(
                    data.date instanceof Date ? data.date : new Date(data.date)
                  ).format("MMMM D, YYYY")}
                </div>

                <h2 className="data-title">{data.label}</h2>

                <div className="data-view">
                  View Details
                  <Icon icon="si:arrow-right-duotone" width="20" height="20" />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            className="mt-4"
            maxVisiblePages={3}
            showPrevNext={true}
          />
        )}
      </div>
    </section>
  );
};

export default AchievementAll;
