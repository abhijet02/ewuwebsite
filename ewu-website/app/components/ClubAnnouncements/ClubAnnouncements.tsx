// "use client";

// import Image from "next/image";
// import "./ClubAnnouncements.scss";
// import Img from "../../assets/why-choose-bg.jpg";
// import { useSelector } from "react-redux";
// import { RootState } from "@lib/root.reducer";
// const ClubAnnouncements: React.FC = () => {
//   const isStatic = useSelector((state: RootState) => state.accessibility.mode);

//   return (
//     <>
//       <section className="clubs-announcements-part">
//         <div className="container">
//           <div className="important-dates">
//             <div className="col-lg-6 col-md-12 col-12">
//               <div
//                 {...(!isStatic
//                   ? {
//                       "data-aos":
//                         window.innerWidth < 800 ? "fade-up" : "fade-left",
//                     }
//                   : {})}
//                 className="important-dates-content-part"
//               >
//                 {/* <CommonNoticeTabs data={Notice} /> */}
//               </div>
//             </div>
//             <div className="important-dates-bg col-lg-7">
//               <Image
//                 src={Img}
//                 width={400}
//                 height={400}
//                 alt="important dates img"
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ClubAnnouncements;
