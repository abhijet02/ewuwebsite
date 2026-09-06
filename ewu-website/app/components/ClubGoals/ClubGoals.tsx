"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import "./ClubGoals.scss";
//import { stripHTMLAndLimitWords } from "@lib/utils/html2text";
import { useClubData } from "@lib/hooks/useClubData";

const ClubGoals: React.FC = () => {
  const { club, clubActivityRanking, dynamicStyles } = useClubData();

  return (
    <>
      <section className="clubs-goal-part" style={dynamicStyles}>
        <div className="container">
          {/* <div className="clubs-goal-title">
            <h1>{stripHTMLAndLimitWords(club?.mission)}</h1>
          </div> */}
          <div className="row justify-content-end">
            <div className="col-lg-8 ">
              <div className="row clubs-goal-all-cards">
                <div className="col-lg-6 col-md-6 clubs-goal-main">
                  <div className="clubs-goal-card">
                    <div>
                      <Icon icon="hugeicons:course" width="26" height="26" />
                    </div>
                    <h1>{clubActivityRanking?.groomingSessionCount}</h1>
                    <div className="text-center">
                      <h2>GROOMING SESSION</h2>
                      <p>
                        {clubActivityRanking?.groomingSessionShortDescription}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 clubs-goal-main">
                  <div className="clubs-goal-card">
                    <div>
                      <Icon icon="mage:trophy" width="26" height="26" />
                    </div>
                    <h1>{clubActivityRanking?.competitionCount}</h1>
                    <div className="text-center">
                      <h2>COMPETITIONS</h2>
                      <p>{clubActivityRanking?.competitionShortDescription}</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 clubs-goal-main">
                  <div className="clubs-goal-card">
                    <div>
                      <Icon
                        icon="material-symbols-light:movie-info-outline-rounded"
                        width="26"
                        height="26"
                      />
                    </div>
                    <h1>{clubActivityRanking?.seminerCount}</h1>
                    <div className="text-center">
                      <h2>SEMINARS</h2>
                      <p>{clubActivityRanking?.seminerShortDescription}</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 clubs-goal-main">
                  <div className="clubs-goal-card">
                    <div>
                      <Icon
                        icon="material-symbols-light:home-work-outline-rounded"
                        width="26"
                        height="26"
                      />
                    </div>
                    <h1>{clubActivityRanking?.workshopCount}</h1>
                    <div className="text-center">
                      <h2>WORKSHOPS</h2>
                      <p>{clubActivityRanking?.workshopShortDescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClubGoals;
