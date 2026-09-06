"use client";

import EventList from "../EventList/EventList";
import EventSocialMedia from "@/app/components/EventSocialMedia/EventSocialMedia";
import "./EventListWithSocialMedia.scss";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";

const EventListWithSocialMedia: React.FC = () => {
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <>
      <section className="event-social-part ">
        <div className="container">
          <div
            {...(!isStatic ? { "data-aos": "fade-up" } : {})}
            className="row align-items-stretch"
          >
            <div className="col-lg-8">
              <EventList />
            </div>
            <div className="col-lg-4 social-part">
              <EventSocialMedia />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventListWithSocialMedia;
