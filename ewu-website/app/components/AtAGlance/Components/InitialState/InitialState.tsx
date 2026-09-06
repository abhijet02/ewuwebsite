"use client";

import Image from "next/image";
import "./InitialState.scss";
import ApprovedIcon from "../../../../../public/approved.png";
import CertificateIcon from "../../../../../public/certificate.png";
import ClassStartIcon from "../../../../../public/book.png";
import IntialStudentIcon from "../../../../../public/college.png";
// certificate.png book.png college.png
const InitialState: React.FC = () => {
  return (
    <div className="chart-grid">
      {/* Grid 1 Card */}
      <div className="grid1">
        <div className="grid-card">
          <div className="grid-card-media-container gov-approved-media">
            <div className="grid-card-media">
              <Image src={ApprovedIcon} alt="Arrpoved" fill />
            </div>
          </div>
          <div className="grid-card-content gov-approved-content">
            <h4 className="card-title">Government approved</h4>
            <p className="card-year">1996</p>
          </div>
        </div>
      </div>

      {/* Grid 2 Image */}
      <div className="grid2">
        <div className="grid-image">
          <Image
            src="https://new1.ewubd.edu/backend/uploads/Temporary-Website-Images/at-a-glance.webp"
            alt="At a glance"
            fill
          />
        </div>
      </div>

      {/* Grid 3 Card */}
      <div className="grid3">
        <div className="grid-card">
          <div className="grid-card-content prm-sanad-received-content">
            <h4 className="card-title">Permanent Sanad Received</h4>
            <div className="grid-card-media-container prm-sanad-received-media">
              <div className="grid-card-media">
                <Image src={CertificateIcon} alt="Arrpoved" fill />
              </div>
            </div>
            <p className="card-year">26 January 2016</p>
          </div>
        </div>
      </div>

      {/* Grid 4 Card */}
      <div className="grid4">
        <div className="grid-card">
          <div className="grid-card-content">
            <h4 className="card-title">Class Started</h4>
            <p className="card-year">September 1996</p>
          </div>
          <div className="grid-card-media-container class-start-media">
            <div className="grid-card-media">
              <Image src={ClassStartIcon} alt="Arrpoved" fill />
            </div>
          </div>
        </div>
      </div>

      {/* Grid 5 Card */}
      <div className="grid5">
        <div className="grid-card">
          <div className="grid-card-content">
            <h4 className="card-title">Initial Enrollment</h4>
            <p className="card-year">20 Students</p>
          </div>
          <div className="grid-card-media-container intial-enroll-media">
            <div className="grid-card-media">
              <Image src={IntialStudentIcon} alt="Arrpoved" fill />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialState;
