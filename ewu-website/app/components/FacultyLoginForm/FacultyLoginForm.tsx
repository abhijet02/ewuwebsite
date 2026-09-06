"use client";

import React, { FC, useState } from "react";
import "./FacultyLoginForm.scss";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { Icon } from "@iconify/react/dist/iconify.js";
import RequestForm from "./RequestForm";

const FacultyLoginForm: FC = () => {
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const LoginDetails = [
    {
      id: 1,
      category: "Faculty",
      links: [
        {
          id: 1,
          name: "CMS",
          url: "http://new1admin.ewubd.edu/",
          icon: "eos-icons:admin-outlined",
        },
        {
          id: 2,
          name: "Email",
          url: "https://mail.google.com/a/ewubd.edu",
          icon: "ic:outline-email",
        },
        {
          id: 3,
          name: "Portal",
          url: "https://faportal.ewubd.edu/Account/Login",
          icon: "material-symbols:captive-portal-rounded",
        },
        {
          id: 4,
          name: "FileTracker",
          url: "https://filetracker.ewubd.edu/auth/login",
          icon: "mdi:file-outline",
        },
      ],
    },
    {
      id: 2,
      category: "Staff",
      links: [
        {
          id: 1,
          name: "CMS",
          url: "http://new1.ewubd.edu:3001/",
          icon: "eos-icons:admin-outlined",
        },
        {
          id: 2,
          name: "Email",
          url: "https://mail.google.com/a/ewubd.edu",
          icon: "ic:outline-email",
        },
        {
          id: 3,
          name: "Portal",
          url: "https://faportal.ewubd.edu/Account/Login",
          icon: "material-symbols:captive-portal-rounded",
        },
        {
          id: 4,
          name: "FileTracker",
          url: "https://filetracker.ewubd.edu/auth/login",
          icon: "mdi:file-outline",
        },
      ],
    },
    {
      id: 3,
      category: "Student",
      links: [
        {
          id: 1,
          name: "Email",
          url: "https://mail.google.com/a/std.ewubd.edu",
          icon: "ic:outline-email",
        },
        {
          id: 2,
          name: "Portal",
          url: "https://portal.ewubd.edu/",
          icon: "material-symbols:captive-portal-rounded",
        },
        {
          id: 3,
          name: "Convocation Registration",
          url: "https://portal.ewubd.edu/",
          icon: "charm:graduate-cap",
        },
      ],
    },
    {
      id: 4,
      category: "Sign up form",
      links: [], // no links needed
    },
  ];

  const [activeTab, setActiveTab] = useState<number>(1);

  // Find active category
  const activeCategory = LoginDetails.find((item) => item.id === activeTab);

  return (
    <section
      className="login-details-tabs-part"
      {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
    >
      <div className="login-details-tabs">
        <div className="login-info-tabs">
          {/* Tabs */}
          <div className="login-tabs">
            {LoginDetails.map((item) => (
              <button
                key={item.id}
                className={`login-tab ${activeTab === item.id ? "active" : ""}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.category}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="login-tab-content">
            {/* If "Sign up form" tab is active → show form */}
            {activeCategory?.category === "Sign up form" ? (
              <RequestForm />
            ) : (
              // Replaced inline style with CSS class: login-link-cards-container
              <div className="login-link-cards-container">
                {activeCategory?.links.map((link, index) => (
                  // Replaced inline style with CSS class: login-link-card and dynamic primary/secondary classes
                  <div
                    key={link.id}
                    className={`login-link-card ${
                      index % 2 === 0 ? "primary" : "secondary"
                    }`}
                  >
                    <div className="login-card-content">
                      <div className="login-icon-wrapper">
                        <Icon
                          icon={link.icon}
                          width="24"
                          height="24"
                          color="#fff"
                        />
                      </div>
                      <p className="login-title">{link.name}</p>
                    </div>
                    <div className="login-button-wrapper">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="login-button"> Go to link</button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacultyLoginForm;
