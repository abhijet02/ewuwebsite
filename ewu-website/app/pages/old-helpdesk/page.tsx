"use client";
import "./Helpdesk.scss";
import CommonSubBanner from "@/app/components/CommonSubBanner/CommonSubBanner";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { YesOrNo } from "@lib/services/helpDesk/helpDesk.service.type";
import { helpDeskActions } from "@lib/slices/helpDesk/helpDesk.slice";
import { useEffect } from "react";

const Helpdesk: React.FC = () => {
  

  const dispatch = useAppDispatch();

  const helpDesks = useAppSelector(
    (state) => state.helpDesk.getHelpDesksResponse?.allHelpDesk
  )?.filter((helpDesk) => helpDesk.isContact === YesOrNo.NO);

  useEffect(() => {
    dispatch(
      helpDeskActions.getHelpDesks({
        request: {
          page: 1,
          limit: 100,
        },
      })
    );
  }, [dispatch]);

  return (
    <div className="common-page faculty-common-page">
      <Navbar />
      <CommonSubBanner link={["helpdesk"]} title="Student Help Desk" />
      <div className="helpdesk-container container">
        <div className="row g-4">
          {helpDesks &&
            helpDesks?.map((helpdesk, index) => {
              const isEven = index % 2 === 0;
              const bgClass = isEven ? "card-even" : "card-odd";

              return (
                <div
                  key={index}
                  className="col-xs-12 col-sm-12 col-md-4 col-lg-4"
                >
                  <div className={`helpdesk-card ${bgClass}`}>
                    <div className="card-bg" />
                    <div className="helpdesk-card-content">
                      <div className="helpdesk-icon-wrapper">
                        <Icon
                          icon={helpdesk.iconPath}
                          width="56"
                          height="56"
                          color="#fff"
                        />
                      </div>
                      <p className="helpdesk-title">{helpdesk.name}</p>
                    </div>
                    <div className="helpdesk-button-wrapper">
                      <a
                        href={helpdesk.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="helpdesk-button">Preview</button>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Helpdesk;
