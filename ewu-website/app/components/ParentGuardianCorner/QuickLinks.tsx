"use client";

import { FC } from "react";
import "./ParentGurdianCorner.scss";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface QuickLink {
  title: string;
  description: string;
  url: string;
  icon: string; // icon string for Iconify
  category: string;
}

const quickLinks: QuickLink[] = [
  {
    title: "Degree Programs",
    description: "Explore available undergraduate and graduate programs",
    url: "https://new1.ewubd.edu/pages/card-degree-program",
    icon: "iconoir:graduation-cap-solid",
    category: "Academic Programs",
  },
  {
    title: "University at a Glance",
    description:
      "Overview of the university's mission, vision, and achievements",
    url: "https://new1.ewubd.edu/pages/at-a-glance",
    icon: "uil:book-open",
    category: "About University",
  },
  {
    title: "Faculty Member Search",
    description: "Find and connect with faculty members",
    url: "https://new1.ewubd.edu/pages/faculty-member-search",
    icon: "solar:user-outline",
    category: "Academic Resources",
  },
  {
    title: "Research Culture",
    description: "Learn about research opportunities and academic excellence",
    url: "https://new1.ewubd.edu/pages/research-culture",
    icon: "majesticons:award-line",
    category: "Academic Resources",
  },
  {
    title: "Scholarships & Financial Aid",
    description: "Discover financial assistance opportunities for students",
    url: "https://new1.ewubd.edu/pages/scholarships-financial-aid",
    icon: "majesticons:award-line",
    category: "Financial Information",
  },
  {
    title: "Undergraduate Tuition & Fees",
    description: "View tuition costs for undergraduate programs",
    url: "https://new1.ewubd.edu/pages/tuition-fees?category=Undergraduate",
    icon: "majesticons:award-line",
    category: "Financial Information",
  },
  {
    title: "Graduate Tuition & Fees",
    description: "View tuition costs for graduate programs",
    url: "https://new1.ewubd.edu/pages/tuition-fees?category=Graduate",
    icon: "majesticons:award-line",
    category: "Financial Information",
  },
  {
    title: "Grades, Rules & Regulations",
    description: "Academic policies and grading system information",
    url: "https://new1.ewubd.edu/pages/grades-rules-and-regulation",
    icon: "famicons:document-outline",
    category: "Academic Resources",
  },
  {
    title: "Academic Partners",
    description: "International partnerships and collaboration opportunities",
    url: "https://new1.ewubd.edu/pages/academic-partners?pageId=7",
    icon: "proicons:globe",
    category: "About University",
  },
  {
    title: "Academic Calendar",
    description: "Important dates, semesters, and academic schedules",
    url: "https://new1.ewubd.edu/pages/academic-calendar",
    icon: "uil:calender",
    category: "Academic Resources",
  },
];

const categories = [
  "About University",
  "Academic Programs",
  "Financial Information",
  "Academic Resources",
];

const QuickLinks: FC = () => {
  return (
    <div className="parent-quick-link-section">
      {categories.map((category) => (
        <div key={category} className="category-section mb-4">
          <div className="category-divider"> <h6>{category}</h6><hr className="category-divider" /> </div>
          <div className="row g-3 mt-2">
            {quickLinks
              .filter((link) => link.category === category)
              .map((link, index) => (
                <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-6">
                  <Link
                    href={link.url}
                    className="quick-link-card"
                    target="_blank"
                  >
                    <div className="parent-quick-link-icon-body">
                      <Icon
                        icon={link.icon}
                        width="20px"
                        height="20px"
                        className="parent-quick-link-icon"
                      />
                    </div>
                    <div className="parent-quick-link-content-body">
                      <h5>{link.title}</h5>
                      <p>{link.description}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickLinks;
