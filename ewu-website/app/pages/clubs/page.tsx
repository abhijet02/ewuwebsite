"use client";

import CommonSubBanner from "@/app/components/CommonSubBanner/CommonSubBanner";
import ClubList from "@/app/components/ClubList/ClubList";
import ClubActivities from "@/app/components/ClubActivities/ClubActivities";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import SidebarMenu from "@/app/components/SideBarMenu/SidebarMenu";

const ClubsPage: React.FC = () => {
  return (
    <>
      <div className="common-page">
        <Navbar />
        <CommonSubBanner link={["EWU Clubs"]} title="All Clubs" />
        <div className="container">
          <div className="row g-3">
            <div className="col-12 col-sm-12 col-md-4 col-lg-3">
              <SidebarMenu />
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-9">
              <div>
                <ClubList />
                <ClubActivities />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ClubsPage;
