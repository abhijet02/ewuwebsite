"use client";

import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { quickLinkActions } from "@lib/slices/quickLink/quickLink.slice";
import "./QuickLinksModal.scss";
import Link from "next/link";
import { usePageData } from "@lib/hooks/usePageData";

const QuickLinksModal = () => {
  const { defaultHeader: header } = usePageData();

  const dispatch = useAppDispatch();

  const quickLinks =
    useAppSelector(
      (state) => state.quickLink.getQuickLinkResponse?.allQuickLinks
    ) || [];

  useEffect(() => {
    dispatch(
      quickLinkActions.getQuickLink({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );
  }, [dispatch]);

  // Get unique categories from quickLinks
  const categories = [...new Set(quickLinks.map((link) => link.category))];

  // Split categories: first categories go to accordion, last 2 go to columns
  const firstCategories =
    categories.length <= 2 ? categories : categories.slice(0, -2);
  const lastTwoCategories = categories.length <= 2 ? [] : categories.slice(-2);

  // Group links by category
  const linksByCategory = quickLinks.reduce((acc, link) => {
    if (!acc[link.category.toString()]) {
      acc[link.category.toString()] = [];
    }
    acc[link.category.toString()].push(link);
    return acc;
  }, {});

  return (
    <div
      className="offcanvas offcanvas-top custom-quick-links"
      tabIndex={-1}
      id="offcanvasTop"
      aria-labelledby="offcanvasTopLabel"
    >
      {/* Modal Header */}
      <div className="offcanvas-header d-flex justify-content-between quick-links-header">
        <h2>{header?.megamenuTitle}</h2>
        <button
          className="bg-transparent border-0 text-white text-2"
          type="button"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <Icon icon="formkit:close" width="26" height="30" />
        </button>
      </div>

      <div className="offcanvas-body">
        {/* Apply Now and Inquiry Buttons */}
        <div className="quick-links-header d-flex align-items-center justify-content-end mb-5">
          <div className="d-flex gap-3">
            <Link
              className="apply-btn pt-2"
              href={header?.megaMenuBtn1Link || "/"}
            >
              {header?.megaMenuBtn1Title}
              <Icon icon="pepicons-pencil:arrow-up" width="20" height="20" />
            </Link>
            <Link
              className="academic-btn pt-2"
              href={header?.megaMenuBtn2Link || "/"}
            >
              {header?.megaMenuBtn2Title}
              <Icon icon="pepicons-pencil:arrow-up" width="20" height="20" />
            </Link>
            <Link
              className="inquiry-btn pt-2"
              href={header?.megaMenuBtn3Link || "/"}
            >
              {header?.megaMenuBtn3Title}
              <Icon icon="pepicons-pencil:arrow-up" width="20" height="20" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-menu row g-5">
          {/* First Column - Accordion for first categories */}
          {firstCategories.length > 0 && (
            <div className="col-lg-4">
              <div className="quick-menu-left">
                <div className="accordion accordion-flush" id="accordionLeft">
                  {firstCategories.map((category, index) => {
                    const categoryLinks = linksByCategory[category.toString()];
                    const collapseId = `flush-collapse${category.replace(
                      /\s+/g,
                      ""
                    )}${index}`;

                    return (
                      <div className="accordion-item" key={category.toString()}>
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${collapseId}`}
                            aria-expanded="false"
                            aria-controls={collapseId}
                          >
                            {category}
                          </button>
                        </h2>
                        <div
                          id={collapseId}
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionLeft"
                        >
                          <div className="accordion-body">
                            <div className="list-group list-group-flush">
                              {categoryLinks.map((link, linkIndex) => (
                                <a
                                  key={link.id}
                                  href={link.url}
                                  className={`list-group-item list-group-item-action ${
                                    linkIndex === 0 ? "active" : ""
                                  }`}
                                  aria-current={
                                    linkIndex === 0 ? "true" : undefined
                                  }
                                >
                                  {link.label}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Last Two Columns - for last 2 categories */}
          {lastTwoCategories.map((category, index) => {
            const categoryLinks = linksByCategory[category.toString()];

            return (
              <div className="col-lg-4" key={category.toString()}>
                <div className="quick-link-right-menus">
                  <h3>{category}</h3>
                  <ul>
                    {categoryLinks.map((link) => (
                      <li key={link.id}>
                        <a href={link.url}>{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickLinksModal;
