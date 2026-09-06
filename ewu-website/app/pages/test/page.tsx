"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import Marquee from "@/app/components/Marquee/Marquee";
import "./pages.scss";

import Image from "next/image";
import CommonSubBanner from "@/app/components/CommonSubBanner/CommonSubBanner";
import SurveyForm from "@/app/components/SurveyForm/SurveryForm";

const HomePage: React.FC = () => {
  return (
    <div className="common-page">
      <Marquee />
      <Navbar />
      <CommonSubBanner link={["Survey"]} title="Survey" />
      <SurveyForm/>
    </div>
  );
};

export default HomePage;
