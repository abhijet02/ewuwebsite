"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { pageActions } from "@/lib/slices/page/page.slice";
import { builderActions } from "@/lib/slices/builder/builder.slice";
import { sectionActions } from "@/lib/slices/builder/section.slice";
import { componentActions } from "@/lib/slices/component_/component.slice";
import LazyLoader from "@/app/components/LayLoader";
import Footer from "@/app/components/Footer/Footer";
const LazyFooter = dynamic(() => import("@/app/components/Footer/Footer"));
import Navbar from "@/app/components/Navbar/Navbar";
import News from "@/app/components/Marquee/Marquee";
//import CommonSubBanner from "@/app/components/CommonSubBanner/CommonSubBanner";
const LazyCommonSubBanner = dynamic(
  () => import("@/app/components/CommonSubBanner/CommonSubBanner")
);
import { COMPONENTS } from "@lib/utils/componentList";
import { YesOrNo } from "@lib/services/builder/builder.service.type";
import NavbarTwo from "@/app/components/NavBarTwo/NavBarTwo";
import ClubNavbar from "@/app/components/ClubNavbar/ClubNavbar";
import NavbarThree from "@/app/components/NavBarThree/NavBarThree";
import FooterTwo from "@/app/components/FooterTwo/FooterTwo";
const LazyFooterTwo = dynamic(
  () => import("@/app/components/FooterTwo/FooterTwo")
);
import FooterThree from "@/app/components/FooterThree/FooterThree";
import ClubFooter from "@/app/components/ClubFooter/ClubFooter";
import Image from "next/image";
//import CommonSubBannerClub from "@/app/components/CommonSubBannerClub/CommonSubBannerClub";
const LazyCommonSubBannerClub = dynamic(
  () => import("@/app/components/CommonSubBannerClub/CommonSubBannerClub")
);

export default function DynamicPage() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // const label = Array.isArray(params.label) ? params.label[0] : params.label;
  // const link = pathname;

  const id = params?.id || "";
  const link = pathname.endsWith(`/${id}`)
    ? pathname.slice(0, -`/${id}`.length)
    : pathname;
  // console.log("DynamicPage id:", id);
  // console.log("DynamicPage link:", link);

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
  const [currentPage, setCurrentPage] = useState(null);
  const [currentBuilder, setCurrentBuilder] = useState(null);
  const [pageSections, setPageSections] = useState([]);
  const [sectionGroups, setSectionGroups] = useState([]);

  // Initial data loading
  useEffect(() => {
    const fetchInitialData =  () => {
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
      // Find current page
      const page = pages.find((p) => p.link === link);

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

    // Get the React component by label
    const Component = COMPONENTS[componentDef.label];
    if (!Component) {
      console.error(
        `React component not found for label: ${componentDef.label}`
      );
      return null;
    }

    // console.log("Found React component for label:", componentDef.label);
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
          position: "absolute",
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

  console.log(currentBuilder.isClubHeaderEnable);

  return (
    <>
      <div className="common-page">
        {/* <div className="common-page"> */}

        {currentBuilder.isLatestNewsEnable === "YES" && <News />}
        <div>
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
                <div className="row flex-column-reverse flex-md-row">
                  {/* Grid container for columns */}
                  {group.sections.map((section) => {
                    // console.log("Processing section in group:", section);
                    const Component = getComponentByComponentId(
                      section.componentId
                    );
                    // console.log("Component found:", Component ? "Yes" : "No");

                    // Instead of calculating dynamically, use fixed classes based on section count
                    let colSpanClass = "col-12 col-sm-12 col-md-12"; // Default to full width

                    const firstSection = group.sections[0];
                    const columRatio = firstSection?.columRatio;

                    if (columRatio && columRatio.includes(":")) {
                      const [left, right] = columRatio.split(":").map(Number);
                      const currentIndex = group.sections.indexOf(section);

                      // Predefine responsive mapping
                      const responsiveMap = {
                        "3:9": [
                          "col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3", // Left
                          "col-12 col-sm-12 col-md-8 col-lg-9 col-xl-9", // Right
                        ],
                        "4:8": [
                          "col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4", // Left
                          "col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8", // Right
                        ],
                        "6:6": [
                          "col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6",
                          "col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6",
                        ],
                      };

                      // Match ratio or fall back to calculated value
                      if (responsiveMap[columRatio]) {
                        colSpanClass = responsiveMap[columRatio][currentIndex];
                      } else {
                        // fallback: calculate dynamically
                        const total = left + right;
                        const ratio = currentIndex === 0 ? left : right;
                        const columns = Math.round((ratio / total) * 12);
                        colSpanClass = `col-12 col-sm-12 col-md-${columns} col-lg-${columns} col-xl-${columns}`;
                      }
                    } else {
                      // fallback for equal divisions
                      const numColumns = parseInt(columRatio);
                      if (numColumns && numColumns <= 6) {
                        const columns = Math.floor(12 / numColumns);
                        colSpanClass = `col-12 col-sm-12 col-md-${columns} col-lg-${columns} col-xl-${columns}`;
                      } else {
                        // Fallbacks
                        if (group.sections.length === 2)
                          colSpanClass = "col-md-6";
                        else if (group.sections.length === 3)
                          colSpanClass = "col-md-4";
                        else if (group.sections.length === 4)
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
        {(currentBuilder.isFooterEnable === YesOrNo.YES && <LazyLoader height="300px" threshold={0.1}><LazyFooter /></LazyLoader>) ||
          (currentBuilder.isFooter2Enable === YesOrNo.YES && <FooterTwo />) ||
          (currentBuilder.isFooter3Enable === YesOrNo.YES && <FooterThree />) ||
          (currentBuilder.isClubFooterEnable === YesOrNo.YES && <ClubFooter />)}
        {/* </div> */}
      </div>
    </>
  );
}
