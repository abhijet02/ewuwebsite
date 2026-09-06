"use client";

import { FC, useState } from "react";
import "./EventAll.scss";
import { Icon } from "@iconify/react";
import Image from "next/image";
import moment from "moment";
import { usePageData } from "@lib/hooks/usePageData";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import Pagination from "../Pagination/Pagination";
import LogoLoading from "@/app/assets/logo-loading.jpg";

const ITEMS_PER_PAGE = 12;

const EventAll: FC = () => {
  const { paramEvents: events } = usePageData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");

  if (!events) return null;

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentEvents = filteredEvents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <>
      <section className="all-events-card-deck mt-3">
        <div className="container">
          <div className="latest-news-header">
            <h3>All Events</h3>
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset pagination when searching
              }}
              className="event-search-input"
            />
          </div>

          <div className="row">
            {currentEvents.map((item, index) => (
              <div
                {...(!isStatic
                  ? {
                      "data-aos":
                        window.innerWidth < 800
                          ? "fade-up"
                          : index === 0
                          ? "fade-right"
                          : index === currentEvents.length - 1
                          ? "fade-left"
                          : "zoom-in",
                    }
                  : {})}
                className="col-lg-4 my-4"
                key={index}
              >
                <Link
                  className="latest-news-box"
                  href={`/pages/event-details/${item?.slug}`}
                >
                  <div className="latest-news-img">
                    <Image
                      src={item?.attachmentUrl || LogoLoading}
                      width={400}
                      height={400}
                      alt="news box"
                    />
                  </div>
                  <div className="latest-news-icon">
                    <Icon
                      icon="material-symbols:date-range-outline-rounded"
                      width="16"
                      height="16"
                    />
                    {moment(
                      item.fromDate instanceof Date
                        ? item.fromDate
                        : new Date(item.fromDate)
                    ).format("MMMM D, YYYY")}
                  </div>
                  <h2>{item.title}</h2>
                  <div className="read-event-details">
                    View Details
                    <Icon
                      icon="si:arrow-right-duotone"
                      width="20"
                      height="20"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            className="mt-4"
            maxVisiblePages={3}
            showPrevNext={true}
          />
        </div>
      </section>
    </>
  );
};

export default EventAll;
