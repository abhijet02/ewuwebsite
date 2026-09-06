"use client";

import ClubNavbar from "@/app/components/ClubNavbar/ClubNavbar";
import ClubFooter from "@/app/components/ClubFooter/ClubFooter";
import Description from "@/app/components/Description/Description";
import { usePageData } from "@lib/hooks/usePageData";
import CommonSubBannerClub from "@/app/components/CommonSubBannerClub/CommonSubBannerClub";

const ClubsPage: React.FC = () => {
  const { page } = usePageData();

  return (
    <>
      <div className="common-page">
        <ClubNavbar />
        <CommonSubBannerClub link={["About Club"]} title={page?.label} />
        <Description />
        <ClubFooter />
      </div>
    </>
  );
};

export default ClubsPage;
