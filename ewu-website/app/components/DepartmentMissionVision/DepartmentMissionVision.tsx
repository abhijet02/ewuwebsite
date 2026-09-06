// "use client";

// import Image from "next/image";
// import "./DepartmentMissionVision.scss";
// import Img from "../../assets/why-choose-bg.jpg";
// import { useSelector } from "react-redux";
// import { RootState } from "@lib/root.reducer";
// const DepartmentMissionVision: React.FC = () => {
//   const isStatic = useSelector((state: RootState) => state.accessibility.mode);

//   return (
//     <>
//       <section className="department-mission-vision-part">
//         <div className="container">
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
//               <div className="department-mission-vision">
//                 <div>
//                   <h1>Mission</h1>
//                   <p>
//                     (i) To advance knowledge and learning of evolving challenges
//                     in Computer Science and Engineering through quality
//                     education and research towards the development of the
//                     society. (ii) To sustain an outstanding hub dedicated to
//                     excellence in teaching, learning, and research and to become
//                     internationally recognized to meet national and
//                     international needs. (iii) To enhance the quality of
//                     students with advanced knowledge and skills of Computer
//                     Science and Engineering to meet contemporary industrial
//                     requirements.
//                   </p>
//                 </div>
//                 <div>
//                   <h1>Vision</h1>
//                   <p>
//                     To be internationally renowned in Computer Science and
//                     Engineering and to exalt excellence in education, research
//                     and industrial profession for sustainable transformation of
//                     the society.
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
//               <div className="department-mission-vision-img">
//                 <Image
//                   src={Img}
//                   alt="mission-vision"
//                   width={800}
//                   height={800}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default DepartmentMissionVision;
