"use client";

import "./department.scss";
import dynamic from "next/dynamic";
import LazyLoader from "@/app/components/LayLoader";

import CommonSubBanner from "@/app/components/CommonSubBanner/CommonSubBanner";
import Navbar from "@/app/components/Navbar/Navbar";
import Marquee from "@/app/components/Marquee/Marquee";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import ChairpersonMessage from "@/app/components/ChairpersonMessage/ChairpersonMessage";
import SidebarMenu from "@/app/components/SideBarMenu/SidebarMenu";
const LazyDeptAboutUs = dynamic(
  () =>
    import("@/app/components/DepartmentSections/DepartmentAboutUs/DeptAboutUs"),
);
const LazyMissionVision = dynamic(
  () =>
    import("@/app/components/DepartmentSections/MissionVision/MissionVision"),
);
const LazyFacultyMemberListShort = dynamic(
  () =>
    import("@/app/components/FacultyMemberListShort/FacultyMemberListShort"),
);
const LazyPoE = dynamic(
  () => import("@/app/components/DepartmentSections/POE/PoE"),
);
const LazyWhyStudyHere = dynamic(
  () => import("@/app/components/DepartmentSections/WhyStudyHere/WhyStudyHere"),
);
const LazyNoticeList = dynamic(
  () => import("@/app/components/NoticeList/NoticeList"),
);
const LazyCourseByProgram = dynamic(
  () => import("@/app/components/CourseByProgram/CourseByProgram"),
);
const LazyStudentsSay = dynamic(
  () => import("@/app/components/StudentsSay/StudentsSay"),
);
const LazyDepartmentAlumni = dynamic(
  () =>
    import("@/app/components/DepartmentSections/DepartmentAlumni/DepartmentAlumni"),
);
const LazyNewsListShort = dynamic(
  () => import("@/app/components/NewsListShort/NewsListShort"),
);
const LazyCareerSlider = dynamic(
  () => import("@/app/components/DepartmentSections/CareerSlider/CareerSlider"),
);
const LazyDepartmentFaQ = dynamic(
  () =>
    import("@/app/components/DepartmentSections/DepartmentFaQ/DepartmentFaQ"),
);
const LazyFooter = dynamic(() => import("@/app/components/Footer/Footer"));
const LazyHelpCenter = dynamic(
  () => import("@/app/components/Helpcenter/HelpCenter"),
);

const DepartmentPage: React.FC = () => {
  const { department } = useDepartmentData();

  return (
    <div
      className="common-page department-common-page"
      style={{ background: "rgba(30, 62, 109, 0.05)" }}
    >
      <Navbar />
      <CommonSubBanner link={["Department"]} title={department?.name || ""} />
      <Marquee />
      <section className="chairperson-message-part">
        <div className="container">
          <div className="row flex-column-reverse flex-lg-row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-3">
              <SidebarMenu />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-9">
              <ChairpersonMessage />
            </div>
          </div>
        </div>
      </section>
      <LazyLoader height="300px" threshold={0.1}>
        <LazyDeptAboutUs />
      </LazyLoader>
      <LazyLoader height="300px" threshold={0.1}>
        <LazyMissionVision />
      </LazyLoader>
      <LazyLoader height="300px" threshold={0.1}>
        <LazyFacultyMemberListShort />
      </LazyLoader>
      <LazyLoader height="300px" threshold={0.1}>
        <LazyPoE />
      </LazyLoader>
      <LazyLoader height="300px" threshold={0.1}>
        <LazyWhyStudyHere />
      </LazyLoader>
      <LazyLoader height="300px" threshold={0.1}>
        <LazyNoticeList />
      </LazyLoader>
      <LazyLoader height="300px" threshold={0.1}>
        <LazyCourseByProgram />
      </LazyLoader>
      <LazyLoader height="300px" threshold={0.1}>
        <LazyStudentsSay />
      </LazyLoader>
      <LazyLoader height="300px" threshold={0.1}>
        <LazyDepartmentAlumni />
      </LazyLoader>
      <LazyLoader height="300px" threshold={0.1}>
        <LazyNewsListShort />
      </LazyLoader>
      <LazyLoader height="300px" threshold={0.1}>
        <LazyCareerSlider />
      </LazyLoader>
      <LazyLoader height="300px" threshold={0.1}>
        <LazyDepartmentFaQ />
      </LazyLoader>
      <LazyLoader height="300px" threshold={0.1}>
        <LazyFooter />
      </LazyLoader>
      <LazyLoader height="300px" threshold={0.1}>
        <LazyHelpCenter />
      </LazyLoader>
    </div>
  );
};

export default DepartmentPage;
