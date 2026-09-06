// "use client";

// import "./WhyChooseOne.scss";
// import WhyBG from "@/app/assets/why-choose-bg.jpg";
// import Image from "next/image";
// import { Icon } from "@iconify/react";
// import { useSelector } from "react-redux";
// import { RootState } from "@lib/root.reducer";

// const WhyChooseOne: React.FC = () => {
//   const isStatic = useSelector((state: RootState) => state.accessibility.mode);

//   return (
//     <>
//       <section className="why-choose-part">
//         <div className="why-chosse-bg">
//           <Image src={WhyBG} width={300} height={300} alt="why-choose-bg" />
//         </div>
//         <div className="container why-main-contant">
//           <div className="row">
//             <div
//               {...(!isStatic
//                 ? {
//                     "data-aos":
//                       window.innerWidth < 800 ? "fade-up" : "fade-right",
//                   }
//                 : {})}
//               className="col-lg-6"
//             >
//               <div className="why-choose-box">
//                 <div className="box-item">
//                   <p>
//                     1 in 5 gets 25% to 100% scholarship based on trimester
//                     results
//                   </p>
//                 </div>
//                 <div className="box-item">
//                   <p>Strong career development center for job placement</p>
//                 </div>
//                 <div className="box-item">
//                   <p>
//                     Strong faculty line up with 40 full time Ph.D. faculties
//                   </p>
//                 </div>
//                 <div className="box-item">
//                   <p>
//                     Flexible payment system & 1 in 5 gets 25% to 100%
//                     scholarship based on trimester results
//                   </p>
//                 </div>
//                 <div className="box-item">
//                   <p>
//                     Strong faculty line up with 40 full time Ph.D. faculties
//                   </p>
//                 </div>
//                 <div className="box-item">
//                   <p>
//                     Flexible payment system & 1 in 5 gets 25% to 100%
//                     scholarship based on trimester results
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div
//               {...(!isStatic
//                 ? {
//                     "data-aos":
//                       window.innerWidth < 800 ? "fade-up" : "fade-left",
//                   }
//                 : {})}
//               className="col-lg-6"
//             >
//               <div className="why-chooes-info">
//                 <div className="common-header">
//                   <p>choose uS</p>
//                   <h2>why Choose east West University</h2>
//                 </div>
//                 <h5>Please visit us before taking any decision</h5>
//                 <div className="why-contact">
//                   <div>
//                     <Icon icon="system-uicons:mail" width="34" height="34" />
//                   </div>
//                   <div>
//                     <span>Email</span>
//                     <p>- admissions@ewubd.edu</p>
//                     <p>- info@ewubd.edu</p>
//                   </div>
//                 </div>
//                 <div className="why-contact">
//                   <div>
//                     <Icon icon="fluent:phone-32-light" width="34" height="34" />
//                   </div>
//                   <div>
//                     <span>Phone</span>
//                     <p>- 09666775577</p>
//                     <p>- 234</p>
//                   </div>
//                 </div>
//                 <div className="why-contact">
//                   <div>
//                     <Icon icon="ph:phone-plus-thin" width="34" height="34" />
//                   </div>
//                   <div>
//                     <span>Hotline</span>
//                     <p>- +8801755587224</p>
//                     <p>- +8801851933094</p>
//                   </div>
//                 </div>
//                 {/* <button className="mt-5">
//                   View Details{" "}
//                   <Icon icon="si:arrow-right-duotone" width="22" height="22" />
//                 </button> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default WhyChooseOne;
