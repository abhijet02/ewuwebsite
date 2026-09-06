"use client";

import CommonSubBanner from "@/app/components/CommonSubBanner/CommonSubBanner";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import NewsMedia from "@/app/components/NewsMedia/NewsMedia";

const NewsMediaPage: React.FC = () => {
  return (
    <div className="common-page office-common-page">
      <Navbar />
      <CommonSubBanner link={["News Media"]} title="News Media" />
      <NewsMedia />
      <Footer />
    </div>
  );
};

export default NewsMediaPage;
