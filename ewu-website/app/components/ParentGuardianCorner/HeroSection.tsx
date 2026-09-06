"use client";

import { FC } from "react";
import "./ParentGurdianCorner.scss";

const HeroSection: FC = () => {
  // ---- Dummy data stored in same file ----
  const infoCards = [
    {
      id: 1,
      title: "Stay Informed",
      subtitle: "Access important academic information and university policies",
    },
    {
      id: 2,
      title: "Financial Planning",
      subtitle:
        "Explore tuition details, fees, and financial aid opportunities",
    },
    {
      id: 3,
      title: "Academic Excellence",
      subtitle: "Learn about our programs, faculty, and research initiatives",
    },
  ];

  return (
    <div className="parent-hero-section">
      <div className="parent-her-section-title">
        <h3>Parent & Guardian Resources</h3>
        <p>
          Welcome to the Parent and Guardian portal. Here you&apos;ll find
          essential information and quick access to resources that will help you
          support your student&apos;s academic journey. From understanding our
          programs to managing tuition and exploring financial aid options,
          we&apos;ve organized everything you need in one convenient location.
        </p>
      </div>

      <div className="row g-3 mt-4">
        {infoCards.map((card, i) => (
          <div key={card.id} className="col-12 col-sm-6 col-md-6 col-lg-4">
            <div
              className={`parent-info-card ${
                i % 2 === 0 ? "parent-info-card-even" : "parent-info-card-odd"
              }`}
            >
                <div className="parent-info-card-bg" />
              <h5>{card.title}</h5>
              <p>{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
