"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Page } from "@lib/services/page/page.service.type";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { pageActions } from "@/lib/slices/page/page.slice";
import { builderActions } from "@/lib/slices/builder/builder.slice";
import { sectionActions } from "@/lib/slices/builder/section.slice";
import { componentActions } from "@/lib/slices/component_/component.slice";
import { Builder, YesOrNo } from "@lib/services/builder/builder.service.type";

import Navbar from "@/app/components/Navbar/Navbar";
import NavbarThree from "@/app/components/NavBarThree/NavBarThree";
import NavbarTwo from "@/app/components/NavBarTwo/NavBarTwo";
import ClubNavbar from "@/app/components/ClubNavbar/ClubNavbar";
//import Footer from "@/app/components/Footer/Footer";
const LazyFooter = dynamic(() => import("@/app/components/Footer/Footer"));
import News from "@/app/components/Marquee/Marquee";
// import CommonSubBanner from "@/app/components/CommonSubBanner/CommonSubBanner";
const LazyCommonSubBanner = dynamic(
  () => import("@/app/components/CommonSubBanner/CommonSubBanner")
);
import { COMPONENTS } from "@lib/utils/componentList";
//import FooterTwo from "@/app/components/FooterTwo/FooterTwo";
const LazyFooterTwo = dynamic(
  () => import("@/app/components/FooterTwo/FooterTwo")
);
//import FooterThree from "@/app/components/FooterThree/FooterThree";
const LazyFooterThree = dynamic(
  () => import("@/app/components/FooterThree/FooterThree")
);

//import ClubFooter from "@/app/components/ClubFooter/ClubFooter";
const LazyClubFooter = dynamic(
  () => import("@/app/components/ClubFooter/ClubFooter")
);

const LazyCommonSubBannerClub = dynamic(
  () => import("@/app/components/CommonSubBannerClub/CommonSubBannerClub")
);
//import CommonSubBannerClub from "@/app/components/CommonSubBannerClub/CommonSubBannerClub";
import LazyLoader from "@/app/components/LayLoader";

export default function DynamicPage() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // const label = Array.isArray(params.label) ? params.label[0] : params.label;
  const link = pathname;

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get data from Redux store
  const components = useAppSelector(
    (state) => state.component.getComponentResponse?.components
  );
  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);
  const builders = useAppSelector(
    (state) => state.builder.getBuildersResponse?.builders
  );
  const sections = useAppSelector(
    (state) => state.section.getSectionsResponse?.sections
  );

  // Current page and builder based on the params
  const [currentPage, setCurrentPage] = useState<Page>(null);
  const [currentBuilder, setCurrentBuilder] = useState<Builder>(null);
  const [pageSections, setPageSections] = useState([]);
  const [sectionGroups, setSectionGroups] = useState([]);

  // Initial data loading
  useEffect(() => {
    const fetchInitialData = () => {
      try {
        setIsLoading(true);

        // Fetch all necessary data
        dispatch(
          pageActions.getPages({
            request: {
              page: 1,
              limit: 100000,
            },
          })
        );

        // if (link) {
        //   dispatch(
        //     pageActions.getPageByLink({
        //       request: { link: link },
        //     })
        //   );
        // }

        dispatch(
          componentActions.getComponent({
            request: {
              page: 1,
              limit: 500,
            },
          })
        );

        // Fetch builders and sections at the same time as initial data
        dispatch(
          builderActions.getBuilders({
            request: {
              page: 1,
              limit: 100000,
            },
          })
        );

        dispatch(
          sectionActions.getSections({
            request: {
              page: 1,
              limit: 100000,
            },
          })
        );
      } catch (err) {
        console.error("Error loading initial data:", err);
        setError("Failed to load page data");
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [dispatch]);

  // When all data is loaded, process it
  useEffect(() => {
    if (pages && builders && sections && components && params) {
      // console.log("All data loaded. Processing...");
      // console.log("Pages:", pages.length, "Looking for link:", pathname);
      // console.log("Available components:", components);

      // Find current page
      const page = pages.find((p) => p.link === link);
      // console.log("Found page:", page);

      if (!page) {
        setError(`Page not found for this link: ${link}`);
        setIsLoading(false);
        return;
      }

      setCurrentPage(page);

      // Find builder for this page
      const builder = builders.find((b) => b.pageId === page.id);
      // console.log("Found builder:", builder);

      if (!builder) {
        setError(`No page found for this name: ${page.label}`);
        setIsLoading(false);
        return;
      }

      setCurrentBuilder(builder);

      // Find sections for this page
      const filteredSections = sections.filter((s) => s.pageId === page.id);
      // console.log("Found sections:", filteredSections.length);
      // console.log("Section details:", filteredSections);

      setPageSections(filteredSections);

      // Group sections by sectionOrder (note: API has a typo "secetionOrder" in some places)
      const groupedSections = {};
      filteredSections.forEach((section) => {
        // Handle both possible spellings of sectionOrder
        const orderKey = section.secetionOrder || section.secetionOrder || 0;

        if (!groupedSections[orderKey]) {
          groupedSections[orderKey] = [];
        }
        groupedSections[orderKey].push(section);
      });

      // Sort each group by columnOrder
      Object.keys(groupedSections).forEach((key) => {
        groupedSections[key].sort(
          (a, b) => (a.columnOrder || 0) - (b.columnOrder || 0)
        );
      });

      // Convert to array of section groups
      const orderedGroups = Object.keys(groupedSections)
        .sort((a, b) => Number(a) - Number(b))
        .map((key) => ({
          order: Number(key),
          sections: groupedSections[key],
        }));

      // console.log("Grouped sections:", orderedGroups);
      setSectionGroups(orderedGroups);
      setIsLoading(false); // All data is processed
    }
  }, [pages, builders, sections, components, params, link]);

  // Create a component lookup function
  const getComponentByComponentId = (componentId) => {
    // console.log("Looking for component with ID:", componentId);

    if (!components) {
      // console.error("No components data available");
      return null;
    }

    // Find the component definition by ID
    const componentDef = components.find((c) => c.id === componentId);
    if (!componentDef) {
      console.error(`Component definition not found for ID: ${componentId}`);
      return null;
    }

    // console.log("Found component definition:", componentDef);

    // Get the component by label
    const Component = COMPONENTS[componentDef.label.trim()];
    if (!Component) {
      console.error(`Component not found for label: ${componentDef.label}`);
      return null;
    }

    // console.log("Found component for label:", componentDef.label);
    return Component;
  };

  // Show loading state
  if (isLoading) {
    return (
      <div
        className="full-page-skeleton"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
          background: "#f8f9fa", // light gray background
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/East-west-university-LogoSVG.svg/768px-East-west-university-LogoSVG.svg.png?20210902215221"
          alt="Loader Logo"
          className="loader-logo"
          width={200}
          height={100}
          style={{
            width: "200px",
            height: "100px",
            animation: "zoomInOut 1.8s infinite ease-in-out",
          }}
        />
        <style>
          {`
                @keyframes zoomInOut {
                  0%, 100% {
                    transform: scale(1);
                    opacity: 0.8;
                  }
                  50% {
                    transform: scale(1.2);
                    opacity: 1;
                  }
                }
              `}
        </style>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center bg-red-50 p-8 rounded-lg max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => router.push("/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!currentPage) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center bg-yellow-50 p-8 rounded-lg max-w-md">
          <h2 className="text-xl font-bold text-yellow-600 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-700">
            {"We couldn't find the page you're looking for."}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => router.push("/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!currentBuilder || pageSections.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center bg-yellow-50 p-8 rounded-lg max-w-md">
          <h2 className="text-xl font-bold text-yellow-600 mb-2">
            Page Under Construction
          </h2>
          <p className="text-gray-700">
            This page exists but has no content yet.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => router.push("/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // console.log("Section groups ready to render:", sectionGroups);

  return (
    <>
      <div className="common-page">
        {/* <div className="common-page"> */}
        {/* Render the News component if enabled */}

        {currentBuilder.isLatestNewsEnable === YesOrNo.YES && <News />}
        <div>
          {/* Render Header/Navbar if enabled */}
          {(currentBuilder.isHeaderEnable === YesOrNo.YES && <Navbar />) ||
            (currentBuilder.isHeader2Enable === YesOrNo.YES && <NavbarTwo />) ||
            (currentBuilder.isHeader3Enable === YesOrNo.YES && (
              <NavbarThree />
            )) ||
            (currentBuilder.isClubHeaderEnable === YesOrNo.YES && (
              <ClubNavbar />
            ))}

          {/* Render Slider/Banner if enabled */}
          {currentBuilder?.isClubHeaderEnable === YesOrNo.NO && (
            <LazyLoader height="300px" threshold={0.1}>
              <LazyCommonSubBanner
                link={[currentPage?.link]}
                title={currentPage?.label}
              />
            </LazyLoader>
            // <CommonSubBanner
            //   link={[currentPage?.link]}
            //   title={currentPage?.label}
            // />
          )}

          {currentBuilder?.isClubHeaderEnable === YesOrNo.YES && (
            <LazyLoader height="300px" threshold={0.1}>
              <LazyCommonSubBannerClub
                link={[currentPage?.link]}
                title={currentPage?.label}
              />
            </LazyLoader>
            // <CommonSubBannerClub
            //   link={[currentPage?.link]}
            //   title={currentPage?.label}
            // />
          )}
        </div>

        {/* Render section groups with columns */}
        {sectionGroups.map((group) => {
          // console.log("Rendering section group:", group);

          // Get first section to display section title (assuming all sections in a group share the same title)
          //const firstSection = group.sections[0];

          return (
            <div className="section-main-wrapper" key={`group-${group.order}`}>
              <div className="container">
                <div className="row">
                  {/* Grid container for columns */}
                  {group.sections.map((section) => {
                    // console.log("Processing section in group:", section);
                    const Component = getComponentByComponentId(
                      section.componentId
                    );
                    // console.log("Component found:", Component ? "Yes" : "No");

                    // Calculate column span based on columRatio
                    let colSpanClass = "col-md-12"; // Default to full width

                    const firstSection = group.sections[0];
                    const columRatio = firstSection?.columRatio;

                    if (columRatio) {
                      if (columRatio.includes(":")) {
                        // Handle ratio format (e.g., "9:3", "3:9")
                        const ratios = columRatio.split(":").map(Number);
                        const currentSectionIndex =
                          group.sections.indexOf(section);

                        if (ratios.length === 2 && currentSectionIndex < 2) {
                          const totalRatio = ratios[0] + ratios[1];
                          const currentRatio = ratios[currentSectionIndex];
                          const columns = Math.round(
                            (currentRatio / totalRatio) * 12
                          );
                          colSpanClass = `col-md-${columns}`;
                        }
                      } else {
                        // Handle whole number format (equal division)
                        const numColumns = parseInt(columRatio);
                        if (numColumns && numColumns <= 6) {
                          const columns = Math.floor(12 / numColumns);
                          colSpanClass = `col-md-${columns}`;
                        }
                      }
                    } else {
                      // Fallback to existing logic if columRatio is not provided
                      if (group.sections.length === 2) {
                        colSpanClass = "col-md-6";
                      } else if (group.sections.length === 3) {
                        colSpanClass = "col-md-4";
                      } else if (group.sections.length === 4) {
                        colSpanClass = "col-md-3";
                      }
                    }

                    if (!Component) {
                      return (
                        <div key={section.id} className={`col-md-12 `}>
                          <p className="text-yellow-600">
                            Component not available:{" "}
                            {
                              components?.find(
                                (c) => c.id === section.componentId
                              )?.label
                            }
                          </p>
                        </div>
                      );
                    }

                    return (
                      <div key={section.id} className={colSpanClass}>
                        <Component sectionData={section} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Render Footer if enabled */}
        {(currentBuilder.isFooterEnable == YesOrNo.YES && (
          <LazyLoader height="300px" threshold={0.1}>
            <LazyFooter />
          </LazyLoader>
        )) ||
          (currentBuilder.isFooter2Enable === YesOrNo.YES && (
            <LazyLoader height="300px" threshold={0.1}>
              <LazyFooterTwo />
            </LazyLoader>
          )) ||
          (currentBuilder.isFooter3Enable === YesOrNo.YES && (
            <LazyLoader height="300px" threshold={0.1}>
              <LazyFooterThree />
            </LazyLoader>
          )) ||
          (currentBuilder.isClubFooterEnable === YesOrNo.YES && (
            <LazyLoader height="300px" threshold={0.1}>
              <LazyClubFooter />
            </LazyLoader>
          ))}
        {/* </div> */}
      </div>
    </>
  );
}
