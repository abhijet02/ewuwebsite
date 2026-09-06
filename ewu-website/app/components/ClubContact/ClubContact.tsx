// "use client";

// import "./ClubContact.scss";
// import { Icon } from "@iconify/react";
// import Footer from "@/app/components/Footer/Footer";
// import Navbar from "@/app/components/Navbar/Navbar";
// import Image from "next/image";
// import MapImg from "@/app/assets/clubs/map.jpg";
// // import ContactImg from "@/app/assets/clubs/air-mail.png";
// // import HotmailImg from "@/app/assets/clubs/hotmail.jpg";

// const ClubsContact: React.FC = () => {
//   return (
//     <div className="common-page">
//       <Navbar />
//       <div className="club-contact-section">
//         <div className="container">
//           <h1 className="contact-title">Contact Us</h1>

//           <div className="row text-center">
//             <div className="col-md-4 mb-3">
//               <div className="card contact-card blue-effect p-4">
//                 <Image src={MapImg} width={120} height={120} alt="map-img" />
//                 <h4>Address</h4>
//                 <p className="small-text mb-0">
//                   A/2, Jahurul Islam Avenue, Jahurul Islam City, Aftabnagar
//                   Dhaka-1212, Bangladesh
//                 </p>
//               </div>
//             </div>

//             {/* Contact Number Card */}
//             <div className="col-md-4 mb-3">
//               <div className="card contact-card green-effect p-4">
//                 <Image
//                   // src={HotmailImg}
//                   width={120}
//                   height={120}
//                   alt="map-img"
//                 />
//                 <h4 className="top-space">Contact Number</h4>
//                 <p className="small-text mb-0">09666775577</p>
//               </div>
//             </div>

//             {/* E-mail Card */}
//             <div className="col-md-4 mb-3">
//               <div className="card contact-card red-effect p-4">
//                 <Image
//                   src={ContactImg}
//                   width={120}
//                   height={120}
//                   alt="map-img"
//                 />
//                 <h4 className="top-space">E-mail</h4>
//                 <p className="small-text">ewuaiac@ewubd.edu</p>
//               </div>
//             </div>
//           </div>
//           <p className="description-text">
//             We welcome your inquiries! If you have any general questions or
//             requests, please complete the form below to connect with our
//             designated officer at East West University. Whether you are
//             interested in joining a club, starting a new initiative, or
//             collaborating on events, we are here to guide you. Our clubs offer a
//             dynamic platform for students to explore their passions, develop
//             leadership skills, and build lasting connections. Feel free to reach
//             out with any questions regarding membership, activities, or upcoming
//             events. We look forward to welcoming you to our vibrant community
//             and helping you make the most of your university experience!
//           </p>

//           <form>
//             <div className="row mb-3">
//               <div className="col-lg-6 mb-2">
//                 <div className="form-group">
//                   <label htmlFor="fullname" className="mb-2">
//                     Name of the Applicant
//                     <span className="must-fill"> *</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="fullname"
//                     required
//                     className="form-control  applicant-name-input"
//                     placeholder="Enter your Full Name..."
//                   />
//                 </div>
//               </div>

//               <div className="col-lg-6 mb-2">
//                 <div className="form-group">
//                   <label htmlFor="email" className="mb-2">
//                     E-mail <span className="must-fill"> *</span>
//                   </label>
//                   <input
//                     type="email"
//                     required
//                     id="email"
//                     className="form-control"
//                     placeholder="Enter your e-mail address..."
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="subject" className="form-label">
//                 Subject <span className="must-fill"> *</span>
//               </label>
//               <input
//                 type="text"
//                 id="subject"
//                 className="form-control"
//                 placeholder="Enter the subject of your message..."
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="message" className="form-label">
//                 Message <span className="must-fill"> *</span>
//               </label>
//               <textarea
//                 className="form-control"
//                 id="message"
//                 rows={5}
//                 placeholder="Write your message here…"
//               ></textarea>
//             </div>

//             <button className="submit-message-btn" type="submit">
//               Send Message
//               <Icon
//                 className="submit-btn-icon"
//                 icon="emojione-monotone:up-arrow"
//               />{" "}
//             </button>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ClubsContact;
