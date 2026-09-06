//export const revalidate = 60; // if you want ISR
"use client";


import "./second-home-page.scss";
import Banner from "@/app/components/Banner/Banner";
import News from "@/app/components/Marquee/Marquee";
import NavbarTwo from "@/app/components/NavBarTwo/NavBarTwo";
import FacultyMemberSearch from "@/app/components/FacultyMemberSearch/FacultyMemberSearch";
import ClubsCarousel from "@/app/components/ClubsCarousel/ClubsCarousel";
import PartnershipsOne from "@/app/components/PartnershipsOne/PartnershipsOne";
import ChooseDegreeAndChooseScholarship from "@/app/components/ChooseDegreeAndChooseScholarship/ChooseDegreeAndChooseScholarship";
import SearchCourse from "@/app/components/SearchCourse/SearchCourse";
import ProgramCardTwo from "@/app/components/ProgramCardTwo/ProgramCardTwo";
import QuoteCardTwo from "@/app/components/QuoteCardTwo/QuoteCardTwo";
import WhyChooseTwo from "@/app/components/WhyChooseTwo/WhyChooseTwo";
import CalendarDatesTwo from "@/app/components/CalendarDatesTwo/CalendarDatesTwo";
import NoticeListTwo from "@/app/components/NoticeListTwo/NoticeListTwo";
import EventListTwo from "@/app/components/EventListTwo/EventListTwo";
import NewsAndAchievement from "@/app/components/NewsAndAchievement/NewsAndAchievement";
import FooterTwo from "@/app/components/FooterTwo/FooterTwo";
import SuccessCardTwo from "@/app/components/SuccessCardTwo/SuccessCardTwo";
import AboutUsTwo from "@/app/components/AboutUsTwo/AboutUsTwo";
import CampusLife from "@/app/components/CampusLife/CampusLife";
import Slider from "@/app/components/Slider/Slider";
//import { sliderService } from "@lib/services/slider/slider.service";
//import { pageService } from "@lib/services/page/page.service";

const SecondHomePage:React.FC = () =>{
//export default async function SecondHomePage() {
  
  // const pages = await pageService.getPages({ page: 1, limit: 1000 });
  // const selectedPage = pages?.data?.pages.find(
  //   (el) => el.link === "/pages/second-home-page"
  // );

  // Fetch sliders for this page
  // const sliders = await sliderService.getSliders({ page: 1, limit: 1000 });
  // const pageSliders = sliders?.data?.sliders.filter(
  //   (el) => el.pageId === selectedPage?.id
  // );

  return (
    <div className="second-home-page common-page">
      <News />
      <div className="second-navbar-section">
        <NavbarTwo />
        <Slider />
      </div>
      <ProgramCardTwo />
      <QuoteCardTwo />
      <ChooseDegreeAndChooseScholarship />
      <WhyChooseTwo />
      <SearchCourse />
      <AboutUsTwo />
      <SuccessCardTwo />
      <CalendarDatesTwo />
      <NoticeListTwo />
      <EventListTwo />
      <FacultyMemberSearch />
      <CampusLife />
      <PartnershipsOne />
      <NewsAndAchievement />
      <ClubsCarousel />
      <FooterTwo />
    </div>
  );
}

export default SecondHomePage;
