"use client";

import { useState } from "react";
import Image from "next/image";
import "./NewsMedia.scss";
import Link from "next/link";
import moment from "moment";
import {
  Publish,
  YesOrNo,
} from "@lib/services/newsMedia/newsMedia.service.type";
import { useNewsMediaData } from "@lib/hooks/useNewsMediaData";
import Placeholder from "public/placeholder.png";

const NewsMedia: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { newsMediaData, newsMediaCategories, categories } = useNewsMediaData();

  const filteredData = newsMediaData
    ?.filter(
      (item) =>
        item.isPublished === Publish.YES && item.isArchived === YesOrNo.NO
    )
    ?.filter((item) => {
      if (filter === "All") return true;

      const matchedCategory = categories?.find(
        (cat) => cat.id === Number(item.category)
      );

      return matchedCategory?.category === filter;
    })
    ?.filter((item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const stripHTML = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div className="container">
      <section className="mt-5 mb-5">
        <div className="all-news-media-header">
          <h4 className="m-0">News Media</h4>
          <div className="all-news-media-filter">
            <select
              className="form-select"
              style={{ width: "180px" }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {/* Replace hardcoded options with dynamic categories */}
              {newsMediaCategories?.map((category) => (
                <option key={category} value={category}>
                  {category === "All"
                    ? "All"
                    : category?.charAt(0) + category?.slice(1).toLowerCase()}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search news media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="news-media-search-input"
              style={{ width: "250px" }}
            />
          </div>
        </div>

        <div className="row mt-5 mb-5 g-5">
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div className="news-media-card">
                  <div className="news-media-card-image">
                    <Image
                      src={item?.thumbnail ? item?.thumbnail : Placeholder}
                      alt={item?.label || "news thumbnail"}
                      fill
                      sizes="100vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="news-media-card-content">
                    <div className="news-media-card-content-top">
                      <h5>{item?.label}</h5>
                      <p>
                        {stripHTML(item?.description)
                          .split(" ")
                          .slice(0, 30)
                          .join(" ")}
                      </p>
                    </div>
                    <div className="news-media-card-content-bottom">
                      <p>{moment(item?.date).format("MMM D, YYYY")}</p>

                      <Link
                        href={`/pages/news-media-details/${item?.id}`}
                        className="primary-button-contain button-contain"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-muted">No Data Available</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsMedia;
