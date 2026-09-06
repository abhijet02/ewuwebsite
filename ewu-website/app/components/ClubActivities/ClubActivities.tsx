"use client";

import "./ClubActivities.scss";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const ClubActivities: React.FC = () => {
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <>
      <section className="club-activities-part">
        <div
          {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
          className="container"
        >
          <div className="major-activities">
            <div>
              <h2>Major activities of these clubs include</h2>
              <ul>
                <li>
                  incorporating various cultural programs, like drama,
                  celebration of national and international events such as
                  Pohela Boishakh, International Mother Language Day,
                  Independence Day, Victory Day
                </li>
                <li>Arranging debate competitions</li>
                <li>Competition in Art, Music, Photography</li>
                <li>
                  Hosting Tournaments for Cricket, Football and Indoor Games
                </li>
                <li>
                  Associates with various community volunteer works, such as,
                  Voluntary Blood Donation Campaigns
                </li>
                <li>
                  Organize numerous seminar and workshops such as, Grooming
                  session, Training session, symposia on formal writing and
                  etiquette, workshops on interview techniques, and corporate
                  networking
                </li>
                <li>Organize Club Fairs</li>
                <li>Arrange Study Tours</li>
                <li>Conduct Research, Computer Programming, Business Plan</li>
              </ul>
            </div>
            <div className="mt-3">
              <h2>Career Counseling Center (CCC)</h2>
              <p>
                The Career Counseling Center exists to aid and support students
                in reaching their full potential, which includes growth and
                development in social and intellectual areas. The center liaises
                with prospective employers and arranges internships and jobs for
                students and graduates. As a forerunner among private
                universities in Bangladesh, the Center endeavors not only to
                ensure excellence in education but also to help students find
                suitable careers. CCC is a guide and mentor for students in
                helping them to develop their aims and building their confidence
                by arranging and organizing different on-campus job fairs,
                workshops, seminars, corporate presentations, internship
                placements and symposia on a regular basis where students get to
                learn about formal writing, etiquette and grooming, successful
                interview techniques, corporate networking and how to succeed in
                the work place.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClubActivities;
