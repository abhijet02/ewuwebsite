// import React from "react";

// import {
//   //Builder,
//   YesOrNo,
// } from "@lib/services/builder/builder.service.type";
// //import { Component as CMSComponent } from "@lib/services/component_/component.service.type";
// import { COMPONENTS } from "@lib/utils/componentList";

// import { pageActions } from "@/lib/slices/page/page.slice";
// import { builderActions } from "@/lib/slices/builder/builder.slice";
// import { sectionActions } from "@/lib/slices/builder/section.slice";
// import { componentActions } from "@/lib/slices/component_/component.slice";

// import Navbar from "@/app/components/Navbar/Navbar";
// import NavbarTwo from "@/app/components/NavBarTwo/NavBarTwo";
// import NavbarThree from "@/app/components/NavBarThree/NavBarThree";
// import ClubNavbar from "@/app/components/ClubNavbar/ClubNavbar";
// import Footer from "@/app/components/Footer/Footer";
// import FooterTwo from "@/app/components/FooterTwo/FooterTwo";
// import FooterThree from "@/app/components/FooterThree/FooterThree";
// import ClubFooter from "@/app/components/ClubFooter/ClubFooter";
// import News from "@/app/components/Marquee/Marquee";
// import CommonSubBanner from "@/app/components/CommonSubBanner/CommonSubBanner";
// //import { Page } from "@lib/services/page/page.service.type";
// import { Section } from "@lib/services/builder/section.service.type";

// import { store } from "@lib/store"; // your function to create fresh store
// import { END } from "redux-saga";

// // type DynamicPageProps = {
// //   page: Page;
// //   builder: Builder | null;
// //   sectionGroups: {
// //     order: number;
// //     sections: Section[];
// //   }[];
// //   components: CMSComponent[];
// // };


// // The Server Component
// export default async function DynamicPage({
//   params,
// }: {
//   params: Promise<{ label: string; id: any }>;
// }) {
//   console.log("DynamicPage params:", params);
//   const { label: slugs, id } = await params;
//   const link = "/pages/" + slugs;
//   console.log("DynamicPage slugs:", link);

//   // Create fresh store instance for SSR

//   // Dispatch actions concurrently
//   await Promise.all([
//     store.dispatch(
//       pageActions.getPages({ request: { page: 1, limit: 10000 } })
//     ),
//     store.dispatch(
//       componentActions.getComponent({ request: { page: 1, limit: 10000 } })
//     ),
//     store.dispatch(
//       builderActions.getBuilders({ request: { page: 1, limit: 10000 } })
//     ),
//     store.dispatch(
//       sectionActions.getSections({ request: { page: 1, limit: 10000 } })
//     ),
//   ]);
//   // Tell saga middleware no more actions will be dispatched
//   store.dispatch(END);

//   // Wait for all running sagas to complete
//   await (store as any).sagaTask.toPromise();

//   const state = store.getState();
//   //console.log("DynamicPage pages:", state);
//   //console.log("DynamicPage pages:", state);

//   // Extract data from redux state
//   const pages = state.page.getPagesResponse?.pages || [];
//   const components = state.component.getComponentResponse?.components || [];
//   const builders = state.builder.getBuildersResponse?.builders || [];
//   const sections = state.section.getSectionsResponse?.sections || [];

//   const page = pages.find((p) => p.link === link);
//   console.log("DynamicPage pages:", page);
//   if (!page) {
//     // Optionally you can throw here to show 404 page
//     throw new Error("Page not found");
//   }

//   const builder = builders.find((b) => b.pageId === page.id) ?? null;
//   const filteredSections = sections.filter((s) => s.pageId === page.id);

//   // Group sections by order
//   const grouped: Record<number, Section[]> = {};
//   filteredSections.forEach((section) => {
//     const order = section.secetionOrder ?? 0;
//     if (!grouped[order]) grouped[order] = [];
//     grouped[order].push(section);
//   });

//   const sectionGroups = Object.entries(grouped)
//     .sort((a, b) => Number(a[0]) - Number(b[0]))
//     .map(([order, group]) => ({
//       order: Number(order),
//       sections: group.sort(
//         (a, b) => (a.columnOrder ?? 0) - (b.columnOrder ?? 0)
//       ),
//     }));

//   // Helper to get react component by componentId
//   const getComponentByComponentId = (componentId: string) => {
//     const componentDef = components.find((c) => c.id === parseInt(componentId));
//     if (!componentDef) return null;
//     return COMPONENTS[componentDef.label.trim()] || null;
//   };

//   return (
//     <div className="common-page">
//       {builder?.isLatestNewsEnable === YesOrNo.YES && <News />}

//       {(builder?.isHeaderEnable === YesOrNo.YES && <Navbar />) ||
//         (builder?.isHeader2Enable === YesOrNo.YES && <NavbarTwo />) ||
//         (builder?.isHeader3Enable === YesOrNo.YES && <NavbarThree />) ||
//         (builder?.isClubHeaderEnable === YesOrNo.YES && <ClubNavbar />)}

//       <CommonSubBanner link={[page?.label]} title={page?.label} />

//       {sectionGroups.map((group) => {
//         const columRatio = group.sections[0]?.columRatio;

//         return (
//           <div className="section-main-wrapper" key={group.order}>
//             <div className="container">
//               <div className="row">
//                 {group.sections.map((section, idx) => {
//                   const Component = getComponentByComponentId(
//                     section.componentId.toString()
//                   );
//                   let colSpanClass = "col-md-12";

//                   if (columRatio) {
//                     if (columRatio.includes(":")) {
//                       const ratios = columRatio.split(":").map(Number);
//                       if (ratios.length === 2) {
//                         const totalRatio = ratios[0] + ratios[1];
//                         const ratio = ratios[idx] || 1;
//                         colSpanClass = `col-md-${Math.round(
//                           (ratio / totalRatio) * 12
//                         )}`;
//                       }
//                     } else {
//                       const numColumns = parseInt(columRatio);
//                       if (numColumns && numColumns <= 6) {
//                         const columns = Math.floor(12 / numColumns);
//                         colSpanClass = `col-md-${columns}`;
//                       }
//                     }
//                   } else {
//                     const len = group.sections.length;
//                     colSpanClass =
//                       len === 2
//                         ? "col-md-6"
//                         : len === 3
//                         ? "col-md-4"
//                         : len === 4
//                         ? "col-md-3"
//                         : "col-md-12";
//                   }

//                   return (
//                     <div key={section.id} className={colSpanClass}>
//                       {Component ? (
//                         <Component sectionData={section} />
//                       ) : (
//                         <p className="text-warning">Component not found</p>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         );
//       })}

//       {(builder?.isFooterEnable === YesOrNo.YES && <Footer />) ||
//         (builder?.isFooter2Enable === YesOrNo.YES && <FooterTwo />) ||
//         (builder?.isFooter3Enable === YesOrNo.YES && <FooterThree />) ||
//         (builder?.isClubFooterEnable === YesOrNo.YES && <ClubFooter />)}
//     </div>
//   );
// }
