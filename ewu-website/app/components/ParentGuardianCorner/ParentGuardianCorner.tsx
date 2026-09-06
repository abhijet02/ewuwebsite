"use client";

import { FC } from "react";
import "./ParentGurdianCorner.scss";
import HeroSection from "./HeroSection";
import QuickLinks from "./QuickLinks";


const ParentGurdianCorner: FC = () => {
 

  return (
    <div className="parent-gurdian-corner-section">
        <HeroSection/>
        <QuickLinks/>
    </div>
  );
};

export default ParentGurdianCorner;
