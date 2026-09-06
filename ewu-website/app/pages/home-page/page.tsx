// // app/home/page.tsx (Server Component)
import dynamic from "next/dynamic";
import LazyLoader from "@/app/components/LayLoader";
import LiveSession from "@/app/components/LiveSession/LiveSession";
import AdmissionResultLive from "@/app/components/AdmissionResultLive/AdmissionResultLive";

// Critical above-fold components
const Navbar = dynamic(() => import("@/app/components/Navbar/Navbar"), {
  loading: () => <div style={{ height: "60px", background: "#e0e0e0" }} />,
  //ssr: false // Disable SSR for above-fold components for faster initial load
});

const Marquee = dynamic(() => import("@/app/components/Marquee/Marquee"), {
  loading: () => <div style={{ height: "40px", background: "#f0f0f0" }} />,
  //ssr: false
});

const Slider = dynamic(() => import("@/app/components/Slider/Slider"), {
  loading: () => <div style={{ height: "60vh", background: "#d0d0d0" }} />,
  //ssr: false
});

// Lazy components with smaller bundles
const LazyProgramCard = dynamic(
  () => import("@/app/components/ProgramCard/ProgramCard")
);
const LazyQuoteCard = dynamic(
  () => import("@/app/components/QuoteCard/QuoteCard")
);
const LazyChooseDegreeAndChooseScholarship = dynamic(
  () =>
    import(
      "@/app/components/ChooseDegreeAndChooseScholarship/ChooseDegreeAndChooseScholarship"
    )
);
const LazyWhyChoose = dynamic(
  () => import("@/app/components/WhyChoose/WhyChoose")
);
const LazyCalendarDatesWithImage = dynamic(
  () => import("@/app/components/CalendarDatesWithImage/CalendarDatesWithImage")
);
const LazyAboutUs = dynamic(() => import("@/app/components/AboutUs/AboutUs"));
const LazyIntroVideo = dynamic(
  () => import("@/app/components/IntroVideo/IntroVideo")
);
const LazySuccessCard = dynamic(
  () => import("@/app/components/SuccessCard/SuccessCard")
);
const LazySearchCourse = dynamic(
  () => import("@/app/components/SearchCourse/SearchCourse")
);
const LazyNoticeForHomePage = dynamic(
  () => import("@/app/components/NoticeForHomePage/NoticeForHomePage")
);
const LazyEventsWithSocialMedia = dynamic(
  () =>
    import("@/app/components/EventListWithSocialMedia/EventListWithSocialMedia")
);
const LazyFacultyMemberSearch = dynamic(
  () => import("@/app/components/FacultyMemberSearch/FacultyMemberSearch")
);
const LazyCampusLife = dynamic(
  () => import("@/app/components/CampusLife/CampusLife")
);
const LazyPartnershipsOne = dynamic(
  () => import("@/app/components/PartnershipsOne/PartnershipsOne")
);
const LazyNewsListTwo = dynamic(
  () => import("@/app/components/NewsListTwo/NewsListTwo")
);
const LazyAchievementOne = dynamic(
  () => import("@/app/components/AchievementOne/AchievementOne")
);
const LazyClubsCarousel = dynamic(
  () => import("@/app/components/ClubsCarousel/ClubsCarousel")
);
const LazyFooter = dynamic(() => import("@/app/components/Footer/Footer"));
const LazyHelpCenter = dynamic(
  () => import("@/app/components/Helpcenter/HelpCenter")
);
const LazyLiveSession = dynamic(
  () => import("@/app/components/LiveSession/LiveSession")
);
const LazyAdmissionResultLive = dynamic(
  () => import("@/app/components/AdmissionResultLive/AdmissionResultLive")
);

export const revalidate = 60;

export default function HomePage() {
  return (
    <div className="common-page">
      {/* Critical: Load immediately */}
      <Marquee />
      <div>
        <Navbar />
        <Slider />
      </div>
      <AdmissionResultLive />

      {/* Lazy loaded components with different thresholds based on priority */}
      <LazyLoader height="300px" threshold={0.1}>
        <LazyProgramCard />
      </LazyLoader>

      <LazyLoader height="200px" threshold={0.1}>
        <LazyQuoteCard />
      </LazyLoader>

      <LazyLoader height="400px" threshold={0.05}>
        <LazyChooseDegreeAndChooseScholarship />
      </LazyLoader>

      <LazyLoader height="300px" threshold={0.1}>
        <LazyWhyChoose />
      </LazyLoader>

      <LazyLoader height="250px" threshold={0.1}>
        <LazyCalendarDatesWithImage />
      </LazyLoader>
      <LazyLoader height="350px" threshold={0.05}>
        <LazyIntroVideo />
      </LazyLoader>
      <LazyLoader height="350px" threshold={0.05}>
        <LazyAboutUs />
      </LazyLoader>

      <LazyLoader height="300px" threshold={0.1}>
        <LazySuccessCard />
      </LazyLoader>

      <LazyLoader height="400px" threshold={0.05}>
        <LazySearchCourse />
      </LazyLoader>

      <LazyLoader height="200px" threshold={0.2}>
        <LazyNoticeForHomePage />
      </LazyLoader>

      <LazyLoader height="350px" threshold={0.1}>
        <LazyEventsWithSocialMedia />
      </LazyLoader>

      <LazyLoader height="500px" threshold={0.05}>
        <div className="facultyMemberSearch-home">
          <LazyFacultyMemberSearch />
        </div>
      </LazyLoader>

      <LazyLoader height="300px" threshold={0.1}>
        <LazyCampusLife />
      </LazyLoader>

      <LazyLoader height="250px" threshold={0.2}>
        <LazyPartnershipsOne />
      </LazyLoader>

      <LazyLoader height="300px" threshold={0.1}>
        <LazyNewsListTwo />
      </LazyLoader>

      <LazyLoader height="250px" threshold={0.2}>
        <LazyAchievementOne />
      </LazyLoader>

      <LazyLoader height="300px" threshold={0.1}>
        <LazyClubsCarousel />
      </LazyLoader>

      <LazyLoader height="400px" threshold={0.3}>
        <LazyFooter />
      </LazyLoader>

      <LazyLoader height="150px" threshold={0.3}>
        <LazyHelpCenter />
      </LazyLoader>
      <LiveSession />
    </div>
  );
}

// import dynamic from "next/dynamic";

// const AboutUs = dynamic(() => import("@/app/components/AboutUs/AboutUs"), {
//   loading: () => <div className="skeleton-card" />,
// });
// const AchievementOne = dynamic(
//   () => import("@/app/components/AchievementOne/AchievementOne"),
//   {
//     loading: () => <div className="skeleton-card" />,
//   }
// );
// const ClubsCarousel = dynamic(
//   () => import("@/app/components/ClubsCarousel/ClubsCarousel"),
//   {
//     loading: () => <div className="skeleton-card" />,
//   }
// );
// const EventsWithSocialMedia = dynamic(
//   () =>
//     import(
//       "@/app/components/EventListWithSocialMedia/EventListWithSocialMedia"
//     ),
//   {
//     loading: () => <div className="skeleton-card" />,
//   }
// );
// const FacultyMemberSearch = dynamic(
//   () => import("@/app/components/FacultyMemberSearch/FacultyMemberSearch"),
//   {
//     loading: () => <div className="skeleton-card" />,
//   }
// );
// const Footer = dynamic(() => import("@/app/components/Footer/Footer"), {
//   loading: () => <div className="skeleton-card" />,
// });
// const CalendarDatesWithImage = dynamic(
//   () =>
//     import("@/app/components/CalendarDatesWithImage/CalendarDatesWithImage"),
//   {
//     loading: () => <div className="skeleton-card" />,
//   }
// );
// const Navbar = dynamic(() => import("@/app/components/Navbar/Navbar"), {
//   loading: () => <div style={{ height: "60px", background: "#e0e0e0" }} />,
// });
// const Marquee = dynamic(() => import("@/app/components/Marquee/Marquee"), {
//   loading: () => <div style={{ height: "40px", background: "#f0f0f0" }} />,
// });
// const PartnershipsOne = dynamic(
//   () => import("@/app/components/PartnershipsOne/PartnershipsOne"),
//   {
//     loading: () => <div className="skeleton-card" />,
//   }
// );
// const ProgramCard = dynamic(
//   () => import("@/app/components/ProgramCard/ProgramCard"),
//   {
//     loading: () => <div className="skeleton-card" />,
//   }
// );
// const NewsListTwo = dynamic(
//   () => import("@/app/components/NewsListTwo/NewsListTwo"),
//   {
//     loading: () => <div className="skeleton-card" />,
//   }
// );
// const ChooseDegreeAndChooseScholarship = dynamic(
//   () =>
//     import(
//       "@/app/components/ChooseDegreeAndChooseScholarship/ChooseDegreeAndChooseScholarship"
//     ),
//   {
//     loading: () => <div className="skeleton-card" />,
//   }
// );
// const SearchCourse = dynamic(
//   () => import("@/app/components/SearchCourse/SearchCourse"),
//   {
//     loading: () => <div className="skeleton-card" />,
//   }
// );
// const SuccessCard = dynamic(
//   () => import("@/app/components/SuccessCard/SuccessCard"),
//   {
//     loading: () => <div className="skeleton-card" />,
//   }
// );
// const CampusLife = dynamic(
//   () => import("@/app/components/CampusLife/CampusLife"),
//   {
//     loading: () => <div className="skeleton-card" />,
//   }
// );
// const QuoteCard = dynamic(
//   () => import("@/app/components/QuoteCard/QuoteCard"),
//   {
//     loading: () => <div className="skeleton-card" />,
//   }
// );
// const Slider = dynamic(() => import("@/app/components/Slider/Slider"), {
//   loading: () => <div style={{ height: "60vh", background: "#d0d0d0" }} />,
// });
// const HelpCenter = dynamic(
//   () => import("@/app/components/Helpcenter/HelpCenter"),
//   {
//     loading: () => <div className="skeleton-card" />,
//   }
// );
// const LiveSession = dynamic(
//   () => import("@/app/components/LiveSession/LiveSession"),
//   {
//     loading: () => <div className="skeleton-card" />,
//   }
// );
// const AdmissionResultLive = dynamic(
//   () => import("@/app/components/AdmissionResultLive/AdmissionResultLive"),
//   {
//     loading: () => <div className="skeleton-card" />,
//   }
// );
// const NoticeForHomePage = dynamic(
//   () => import("@/app/components/NoticeForHomePage/NoticeForHomePage"),
//   {
//     loading: () => <div className="skeleton-card" />,
//   }
// );
// const WhyChoose = dynamic(
//   () => import("@/app/components/WhyChoose/WhyChoose"),
//   {
//     loading: () => <div className="skeleton-card" />,
//   }
// );

// export const revalidate = 60;

// export default async function HomePage() {
//   return (
//     <div className="common-page">
//       <Marquee />
//       <div>
//         <Navbar />
//         <Slider />
//       </div>
//       <ProgramCard />
//       <QuoteCard />

//       <ChooseDegreeAndChooseScholarship />
//       <WhyChoose />
//       <CalendarDatesWithImage />
//       <AboutUs />
//       <SuccessCard />
//       <SearchCourse />
//       <NoticeForHomePage />
//       <EventsWithSocialMedia />
//       <div className="facultyMemberSearch-home">
//         <FacultyMemberSearch />
//       </div>
//       <CampusLife />
//       <PartnershipsOne />
//       <NewsListTwo />
//       <AchievementOne />
//       <ClubsCarousel />
//       <Footer />
//       <HelpCenter />
//       <LiveSession />
//       <AdmissionResultLive />
//     </div>
//   );
// };
