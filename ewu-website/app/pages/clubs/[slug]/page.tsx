"use client";

import ClubDetails from "@/app/components/ClubDetails/ClubDetails";
import ClubNavbar from "@/app/components/ClubNavbar/ClubNavbar";
import Slider from "@/app/components/Slider/Slider";
import ClubEvents from "@/app/components/ClubEvents/ClubEvents";
import ClubNotices from "@/app/components/ClubNotices/ClubNotices";
import ClubsGoals from "@/app/components/ClubGoals/ClubGoals";
import ClubFooter from "@/app/components/ClubFooter/ClubFooter";

import "../clubs.scss";
import ClubNewsList from "@/app/components/ClubNewsList/ClubNewsList";
import { usePageData } from "@lib/hooks/usePageData";
import ClubMarquee from "../ClubMarquee/ClubMarquee";
import { useSliderData } from "@lib/hooks/useSliderData";

const ClubDetailsPage: React.FC = () => {

  return (
    <>
      <div className="common-page clubs-common-page" style={{paddingBottom:"40px"}}>
        <ClubNavbar />
        <Slider />
        <ClubDetails />
        <ClubEvents />
        <ClubNotices />
        <ClubsGoals />
        <ClubNewsList />
        <ClubFooter />
        <ClubMarquee />
      </div>
    </>
  );
};

export default ClubDetailsPage;
