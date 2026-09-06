// "use client";

// import "./DepartmentChairperson.scss";
// import Image from "next/image";
// import { Icon } from "@iconify/react";
// import Img from "../../assets/teachers/teachers-3.png";
// import GoogleScholar from "../../assets/google-scholar.png";
// import { useSelector } from "react-redux";
// import { RootState } from "@lib/root.reducer";

// const DepartmentChairperson: React.FC = () => {
//   const isStatic = useSelector((state: RootState) => state.accessibility.mode);

//   return (
//     <>
//       <section className="department-chairperson-part">
//         <div className="container">
//           <div
//             {...(!isStatic ? { "data-aos": "fade-up" } : {})}
//             className="chairperson-message-main"
//           >
//             <div className="row">
//               <div className="col-lg-3 my-2">
//                 <div className="chairperson-message-img">
//                   <Image
//                     src={Img}
//                     width={200}
//                     height={200}
//                     alt="chairperson-message-img"
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-9 my-2">
//                 <div className="chairperson-message-info">
//                   <div className="chairperson-message-name-social">
//                     <div>
//                       <h2>Department Chairperson</h2>
//                       <h4>Dr. Maheen Islam</h4>
//                       <h5>Faculty of Sciences and Engineering</h5>
//                     </div>
//                     <div className="social-links-part">
//                       <div className="social-links">
//                         <a href="#">
//                           <Icon
//                             icon="ri:facebook-fill"
//                             width="22"
//                             height="22"
//                           />
//                         </a>
//                         <a href="#">
//                           <Icon icon="prime:twitter" width="22" height="22" />
//                         </a>
//                         <a href="#">
//                           <Icon icon="uil:instagram" width="22" height="22" />
//                         </a>
//                         <a href="#">
//                           <Icon
//                             icon="flowbite:linkedin-solid"
//                             width="22"
//                             height="22"
//                           />
//                         </a>
//                       </div>
//                       <a className="google-scholar" href="#">
//                         <Image
//                           src={GoogleScholar}
//                           width={200}
//                           height={200}
//                           alt="google Scholar"
//                         />
//                       </a>
//                     </div>
//                   </div>
//                   <h3>
//                     Chairperson & Associate Professor Department of Computer
//                     Science and Engineering
//                   </h3>
//                   <p className="chairperson-message-contact">
//                     Telephone : <span>09666775577</span>
//                   </p>
//                   <p className="chairperson-message-contact">
//                     Ext : <span>-258</span>
//                   </p>
//                   <p className="chairperson-message-contact">
//                     Email : <span>maheen@ewubd.edu</span>
//                   </p>
//                   <p>
//                     At present, the department offers the following programs:
//                   </p>
//                   <ul>
//                     <li>
//                       Bachelor of Science in Computer Science and Engineering
//                     </li>
//                     <li>
//                       Bachelor of Science in Computer Science and Engineering
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default DepartmentChairperson;
