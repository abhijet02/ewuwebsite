"use client";

import Image from "next/image";
import "./CalendarDatesWithImage.scss";
import CalendarDates from "@/app/components/CalendarDates/CalendarDates";
import { RootState } from "@lib/root.reducer";
import { useSelector } from "react-redux";

const CalendarDatesWithImage: React.FC = () => {
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <>
      <section className="important-dates-part">
        <div className="container">
          <div className="important-dates">
            <div
              {...(!isStatic
                ? {
                    "data-aos":
                      window.innerWidth < 800 ? "fade-up" : "fade-left",
                  }
                : {})}
              className="col-lg-6 col-md-12 col-12 z-3"
            >
              <CalendarDates />
            </div>
            <div className="important-dates-bg col-lg-7">
              <Image
                src="https://new1.ewubd.edu/backend/uploads/Temporary-Website-Images/calenderDateImage.webp"
                width={400}
                height={400}
                alt="important dates img"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CalendarDatesWithImage;
