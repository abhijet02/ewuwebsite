"use client";
import CommonSubBanner from "@/app/components/CommonSubBanner/CommonSubBanner";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";

import NewsMedia from "@/app/components/NewsMedia/NewsMedia";

const NavbarTestPage: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <CommonSubBanner link={["News Media"]} title="News Media" />
      <NewsMedia />
      <Footer />
    </div>
  );
};

export default NavbarTestPage;
