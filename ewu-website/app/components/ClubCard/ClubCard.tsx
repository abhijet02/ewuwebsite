"use client";

//import { Icon } from "@iconify/react";
import "./ClubCard.scss";
//import { clubActivityData, clubActivityRankingData } from "@lib/utils/data";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const ClubCard: React.FC = () => {
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <>
      <section className="club-card-part">
        <div className="container">
          <div className="row">
            {/* {clubActivityRankingData.map((item, index) => (
              <div
                {...(!isStatic
                  ? {
                      "data-aos":
                        window.innerWidth < 800
                          ? "fade-up" // all items fade-up on small screens
                          : index === 0
                          ? "fade-right"
                          : index === clubActivityData.length - 1
                          ? "fade-left"
                          : "zoom-in", // middle items on large screens
                    }
                  : {})}
                key={item.id}
                className="col-lg-3 col-md-6 my-3 px-3"
              >
                <div className="club-card">
                  <h1>{item.number}</h1>
                  <Icon icon={item.icon} width={50} height={50} />
                  <h2>{item.name}</h2>
                  <p>{item.text}</p>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </section>
    </>
  );
};

export default ClubCard;
