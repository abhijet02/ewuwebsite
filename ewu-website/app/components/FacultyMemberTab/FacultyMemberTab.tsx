"use client";

import React, { useState, useEffect } from "react";
import "./FacultyMemberTab.scss";
import dynamic from "next/dynamic";
import LazyLoader from "@/app/components/LayLoader";
const LazyFacultyMemberTabMobile = dynamic(() => import("@/app/components/FacultyMemberTab/Components/FacultyMemberTabMobile"));
//import FacultyMemberTabMobile from "./Components/FacultyMemberTabMobile";
const LazyFacultyMemberTabDesktop = dynamic(() => import("@/app/components/FacultyMemberTab/Components/FacultyMemberTabDesktop"));
//import FacultyMemberTabDesktop from "./Components/FacultyMemberTabDesktop";

const FacultyMemberTab: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Function to check screen width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991); // <= 767px is considered mobile
    };

    // Initial check
    handleResize();

    // Listen to resize
    window.addEventListener("resize", handleResize);

    // Clean up listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section>
      {!isMobile 
      ? <LazyLoader height="300px" threshold={0.1}><LazyFacultyMemberTabDesktop /></LazyLoader> 
      : <LazyLoader height="300px" threshold={0.1}><LazyFacultyMemberTabMobile /></LazyLoader> }
    </section>
  );
};

export default FacultyMemberTab;
