"use client";

import CommonSubBanner from "@/app/components/CommonSubBanner/CommonSubBanner";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import { ContactForm } from "@/app/components/ContactForm/ContactForm";
import { ContactInfo } from "@/app/components/ContactInfo/ContactInfo";
import "./ContactFormWithContactInfo.scss";

const ContactFormWithContactInfo: React.FC = () => {
  return (
    <div className="contact-page common-page">
      <div className="contact-page-section">
        <div className="container">
          <div className="row g-2">
            <div className="col-lg-7">
              <ContactForm />
            </div>

            <div className="col-lg-5">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormWithContactInfo;
