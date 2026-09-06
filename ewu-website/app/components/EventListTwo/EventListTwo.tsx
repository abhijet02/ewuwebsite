"use client";

import { FC, useEffect, useState } from "react";
import "./EventListTwo.scss";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Event } from "@lib/services/event/event.service.type";
import moment from "moment";
import Link from "next/link";
import { usePageData } from "@lib/hooks/usePageData";

const EventListTwo: FC = () => {
  const { pageEvents: events } = usePageData();

  const now = new Date();

  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();

  const filteredEvents = events?.filter((event: Event) => {
    new Date(event.fromDate).getTime() >= todayStart;
  });

  // Set initial states for countdown
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [currentEvent, setCurrentEvent] = useState(null);

  // Get the change in days, hours, minutes, and seconds
  useEffect(() => {
    if (!filteredEvents || filteredEvents.length === 0) return;

    const sortedUpcomingEvents = filteredEvents
      .filter(
        (item) =>
          item.fromDate && new Date(item.fromDate).getTime() > Date.now()
      )
      .sort(
        (a, b) =>
          new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime()
      );

    if (sortedUpcomingEvents.length === 0) return;

    let currentIndex = 0;
    setCurrentEvent(sortedUpcomingEvents[currentIndex]); // Set first event initially

    const updateCountdown = () => {
      const event = sortedUpcomingEvents[currentIndex];
      const countdownDate = new Date(event.fromDate).getTime();
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance <= 0) {
        currentIndex += 1;
        if (currentIndex >= sortedUpcomingEvents.length) {
          clearInterval(interval);
          setCountdown({
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00",
          });
          setCurrentEvent(null);
          return;
        }
        setCurrentEvent(sortedUpcomingEvents[currentIndex]); // Set next event
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, [filteredEvents]);

  return (
    <div className="second-upcoming-events-section">
      <div className="container">
        <div className="row">
          {/* <!-- Left Event Box --> */}
          <div className="col-md-5">
            <div className="left-box-contents">
              <div className="centered-content">
                <Image
                  src={currentEvent?.attachmentUrl}
                  width={350}
                  height={200}
                  className="why-choose-banner"
                  alt={"Upcoming Event"}
                />
                <h4 className="event-text mt-4">Next Event!</h4>
                <p className="event-description">{currentEvent?.title}</p>

                <div className="event-timer">
                  <span className="time-duration">
                    {countdown?.days}
                    <br />
                    <small className="light-text">Days</small>
                  </span>
                  <span className="time-duration">
                    {countdown?.hours}
                    <br />
                    <small className="light-text">Hrs</small>
                  </span>
                  <span className="time-duration">
                    {countdown?.minutes}
                    <br />
                    <small className="light-text">Min</small>
                  </span>
                  <span className="time-duration">
                    {countdown?.seconds}
                    <br />
                    <small className="light-text">Sec</small>
                  </span>
                </div>
                <div className="text-center">
                  <a href="#" className="book-now-btn">
                    Book Now{" "}
                    <Icon
                      className="diagonal-arrow"
                      icon="eva:diagonal-arrow-right-up-outline"
                      width="18"
                      height="18"
                    />{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Right Upcoming Events --> */}
          <div className="col-md-7">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="upcoming-event-title">Upcoming Events</h2>
              <Link href={`/pages/events`} className="dates-main-btn">
                View All
                <Icon
                  className="dates-arrow"
                  icon="eva:diagonal-arrow-right-up-outline"
                  width="18"
                  height="18"
                />
              </Link>
            </div>

            {/* <!-- Event List --> */}
            {filteredEvents
              ?.map((item, index) => (
                <div
                  className="event-card d-flex align-items-start"
                  key={index}
                >
                  <Image
                    src={item.attachmentUrl}
                    width={120}
                    height={120}
                    className="upcoming-event"
                    alt="Major Event"
                  />
                  <div className="date-box">
                    <span className="modify-date">
                      {moment(item.fromDate).format("D")}
                    </span>
                    <br />
                    <span className="modify-text">
                      {moment(item.fromDate).format("MMM")}
                    </span>
                  </div>
                  <div>
                    <a href="" className="event-details">
                      {item.title}
                    </a>
                    <div className="event-info text-muted">
                      <Icon
                        className="tiny-space"
                        icon="teenyicons:clock-outline"
                        width="14"
                      />
                      {moment(item.fromDate).format("h:mm A")}
                      <span className="use-margin">
                        <Icon icon="fa6-solid:school" width="16" />{" "}
                        {item.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))
              .slice(0, 3)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventListTwo;
