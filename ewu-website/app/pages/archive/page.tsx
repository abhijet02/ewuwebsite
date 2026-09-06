"use client";

import "./archive.scss";
import CommonSubBanner from "@/app/components/CommonSubBanner/CommonSubBanner";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import ArchiveFilter from "@/app/components/Archive/Archive";

const ArchiveList: React.FC = () => {
  return (
    <div className="contact-page common-page">
      <Navbar />
      <CommonSubBanner link={["Archive"]} title="Archive" />
      <section>
        <ArchiveFilter />
      </section>
       
      <Footer />
    </div>
  );
};

export default ArchiveList;
