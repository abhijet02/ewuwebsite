//export const revalidate = 60; // if you want ISR
"use client";

import "./third-home-page.scss";
import Banner from "@/app/components/Banner/Banner";
import News from "@/app/components/Marquee/Marquee";
import NavbarThree from "@/app/components/NavBarThree/NavBarThree";
import FacultyMemberSearch from "@/app/components/FacultyMemberSearch/FacultyMemberSearch";
import ClubsCarousel from "@/app/components/ClubsCarousel/ClubsCarousel";
import QuoteCardThree from "@/app/components/QuoteCardThree/QuoteCardThree";
import ProgramCardThree from "@/app/components/ProgramCardThree/ProgramCardThree";
import WhyChooseThree from "@/app/components/WhyChooseThree/WhyChooseThree";
import CalendarDatesThree from "@/app/components/CalendarDatesThree/CalendarDatesThree";
import EventListThree from "@/app/components/EventListThree/EventListThree";
import NoticeListThree from "@/app/components/NoticeListThree/NoticeListThree";
import NewsListThree from "@/app/components/NewsListThree/NewsListThree";
import AchievementThree from "@/app/components/AchievementThree/AchievementThree";
import FooterThree from "@/app/components/FooterThree/FooterThree";
import SuccessCardThree from "@/app/components/SuccessCardThree/SuccessCardThree";
import AboutUsThree from "@/app/components/AboutUsThree/AboutUsThree";
import ChooseDegreeAndChooseScholarship from "@/app/components/ChooseDegreeAndChooseScholarship/ChooseDegreeAndChooseScholarship";
import CampusLife from "@/app/components/CampusLife/CampusLife";
//import { sliderService } from "@lib/services/slider/slider.service";
//import { pageService } from "@lib/services/page/page.service";
import Slider from "@/app/components/Slider/Slider";

const ThirdHomePage: React.FC = () => {
  //export default async function ThirdHomePage() {

  //  const pages = await pageService.getPages({ page: 1, limit: 1000 });
  //       const selectedPage = pages?.data?.pages.find(
  //         (el) => el.link === "/pages/second-home-page"
  //       );

  // Fetch sliders for this page
  // const sliders = await sliderService.getSliders({ page: 1, limit: 1000 });
  // const pageSliders = sliders?.data?.sliders.filter(
  //   (el) => el.pageId === selectedPage?.id
  // );

  return (
    <div className="third-home-page common-page">
      <News />
      <div>
        <NavbarThree />
        <Slider />

      </div>
      <ProgramCardThree />
      <QuoteCardThree />
      <WhyChooseThree />
      <AboutUsThree />
      <SuccessCardThree />
      <CalendarDatesThree />
      <EventListThree />
      <ChooseDegreeAndChooseScholarship />
      <FacultyMemberSearch />
      <CampusLife />
      <NoticeListThree />
      <AchievementThree />
      <NewsListThree />
      <ClubsCarousel />
      <FooterThree />
    </div>
  );
};

export default ThirdHomePage;
