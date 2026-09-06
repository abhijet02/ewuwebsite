// app/pages/landing-page/page.tsx (Server Component)
import dynamic from "next/dynamic";
const SuccessCardFour = dynamic(() => import("@/app/components/SuccessCardFour/SuccessCardFour"), {
  loading: () => <div className="skeleton-card" />,
});
const Marquee = dynamic(() => import("@/app/components/Marquee/Marquee"), {
  loading: () => <div className="skeleton-card" />,
});
const Slider = dynamic(() => import("@/app/components/Slider/Slider"), {
  loading: () => <div className="skeleton-card" />,
});
const VisitUs = dynamic(() => import("@/app/components/VisitUs/VisitUs"), {
  loading: () => <div className="skeleton-card" />,
});
const Navbar = dynamic(() => import("@/app/components/Navbar/Navbar"), {
  loading: () => <div className="skeleton-card" />,
});
const Footer = dynamic(() => import("@/app/components/Footer/Footer"), {
  loading: () => <div className="skeleton-card" />,
});
import { EnquiryForm } from "@/app/components/EnquiryForm/EnquiryForm";
const PartnershipsTwo = dynamic(() => import("@/app/components/PartnershipsTwo/PartnershipsTwo"), {
  loading: () => <div className="skeleton-card" />,
});
const HelpCenter = dynamic(() => import("@/app/components/Helpcenter/HelpCenter"), {
  loading: () => <div className="skeleton-card" />,
});


// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;


export default async function LandingPage() {
 return (
    <>
      <div className="landing-page common-page">
        <Marquee />
        <div>
          <Navbar />
          <Slider />
        </div>
        <SuccessCardFour />
        <section className="enquiry-section">
          <div className="container">
            <div
              className="row align-items-center justify-content-end main-enquiry-contant"
              style={{ margin: "48px 8px" }}
            >
              <EnquiryForm />
              <PartnershipsTwo />
            </div>
          </div>
        </section>
        <VisitUs />
        <Footer />
      </div>
    </>
  );
}