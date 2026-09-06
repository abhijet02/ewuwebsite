
import CommonSubBanner from "@/app/components/CommonSubBanner/CommonSubBanner";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import DegreeVerification from "@/app/components/DegreeVerification/DegreeVerification";
import React from "react";

const DegreeVerificationPage: React.FC = () => {
  return (
    <div className="common-page">
      <Navbar />
      <CommonSubBanner
        link={["Degree Verification"]}
        title={"Degree Verification"}
      />
      <DegreeVerification />
      <Footer />
    </div>
  );
};

export default DegreeVerificationPage;
