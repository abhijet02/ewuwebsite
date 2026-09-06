"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./ScrollToTopButton.scss";

const ScrollToTopButton: React.FC = () => {
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setRotate(scrollY > 600); // rotate if scrolled past 600px
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top-button ${!rotate ? "rotate" : ""}`}
    >
      <Icon
        className="arrow-icon"
        icon="tabler:arrow-up"
        width="32px"
        height="32px"
      />
    </button>
  );
};

export default ScrollToTopButton;
