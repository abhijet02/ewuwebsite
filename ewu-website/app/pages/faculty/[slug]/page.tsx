"use client";

import "./faculty.scss";
import CommonSubBanner from "@/app/components/CommonSubBanner/CommonSubBanner";
import ChairpersonList from "@/app/components/ChairpersonList/ChairpersonList";
import DeanMessage from "@/app/components/DeanMessage/DeanMessage";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import FacultyDepartmentList from "@/app/components/FacultyDepartmentList/FacultyDepartmentList";
import { useFacultyData } from "@lib/hooks/useFacultyData";
import SideBarMenu from "@/app/components/SideBarMenu/SidebarMenu";
import ProgramListCard from "@/app/components/ProgramListCard/ProgramListCard";
import CalendarDates from "@/app/components/CalendarDates/CalendarDates";
import EventList from "@/app/components/EventList/EventList";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import Populated from "@/app/components/populated/Populated";

const FacultyPage: React.FC = () => {
  const { faculty } = useFacultyData();

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <div
      className="common-page"
      style={{ background: "rgba(30, 62, 109, 0.05)" }}
    >
      <Navbar />
      <CommonSubBanner link={["Faculty"]} title={faculty?.name || ""} />
      <section className="chairperson-message-part">
        <div className="container">
          <div className="row flex-column-reverse flex-lg-row">
            <div className="col-lg-3 col-md-12 my-2">
              <SideBarMenu />
            </div>
            <div className="col-lg-9 col-md-12 my-2">
              <DeanMessage />
            </div>
          </div>
        </div>
      </section>
      <Populated />
      <ChairpersonList />
      <section className="facultics-notice-events-part">
        <div className="container">
          <div className="row g-3 mt-4 mb-4">
            <div
              {...(!isStatic
                ? {
                    "data-aos":
                      window.innerWidth < 800 ? "fade-up" : "fade-right",
                  }
                : {})}
              className="col-xs-12 col-sm-12 col-md-12 col-lg-6"
            >
              <EventList />
            </div>
            <div
              {...(!isStatic
                ? {
                    "data-aos":
                      window.innerWidth < 800 ? "fade-up" : "fade-left",
                  }
                : {})}
              className="col-xs-12 col-sm-12 col-md-12 col-lg-6"
            >
              <CalendarDates />
            </div>
          </div>
        </div>
      </section>
      <FacultyDepartmentList />
      <ProgramListCard />
      <Footer />
    </div>
  );
};

export default FacultyPage;
