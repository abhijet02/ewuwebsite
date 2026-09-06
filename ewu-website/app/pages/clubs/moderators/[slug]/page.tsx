//export const dynamic = "force-static";
"use client";

import ClubFooter from "@/app/components/ClubFooter/ClubFooter";
import ClubNavbar from "@/app/components/ClubNavbar/ClubNavbar";
import ClubMember from "@/app/components/ClubMember/ClubMember";
import CommonSubBanner from "@/app/components/CommonSubBanner/CommonSubBanner";
import { usePageData } from "@lib/hooks/usePageData";

const ClubLeadersPage: React.FC = () => {
  const { page } = usePageData();
  return (
    <>
      <div className="common-page clubs-common-page">
        <ClubNavbar />
         <CommonSubBanner link={["Club Moderators"]} title={page?.label} />
        <ClubMember />
        <ClubFooter />
      </div>
    </>
  );
};

export default ClubLeadersPage;
