"use client";
import "./HelpdeskCompo.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { YesOrNo } from "@lib/services/helpDesk/helpDesk.service.type";
import { helpDeskActions } from "@lib/slices/helpDesk/helpDesk.slice";
import { useEffect } from "react";

const HelpdeskCompo: React.FC = () => {
  const cards = [
    {
      text: "Student Portal",
      link: "https://portal.ewubd.edu/",
      icon: "mdi:school",
    },
    {
      text: "Activating G Suite Email Account",
      link: "https://www.ewubd.edu/activating-g-suite-email-account",
      icon: "mdi:email-check-outline",
    },
    {
      text: "Advisory for the newly admitted students",
      link: "https://www.ewubd.edu/advisory-newly-admitted-students",
      icon: "mdi:account-group-outline",
    },
    {
      text: "Online Helpdesk (List of Email Accounts)",
      link: "https://www.ewubd.edu/notice-details/online-helpdesk-list-email-accounts",
      icon: "mdi:headset",
    },
    {
      text: "Guideline for Depositing Students’ Fees",
      link: "https://www.ewubd.edu/notice-details/guideline-depositing-students-fees-fall-2021-semester",
      icon: "mdi:bank-transfer",
    },
    {
      text: "Payment of Tuition Fees",
      link: "https://www.ewubd.edu/payment-procedure",
      icon: "mdi:receipt-text-check-outline",
    },
  ];

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
    <div className="helpdesk-container container">
      <div className="row g-4">
        {helpDesks &&
          helpDesks?.map((helpdesk, index) => {
            const patternGroupA = [1, 4, 5]; // positions for card-even
            const position = (index + 1) % 6 || 6; // cycle through 1-6

            const bgClass = patternGroupA.includes(position)
              ? "card-even"
              : "card-odd";

            return (
              <div key={index} className="col-12 col-sm-12 col-md-6 col-lg-6">
                <div className={`helpdesk-card ${bgClass}`}>
                  <div className="card-bg" />
                  <div className="helpdesk-card-content">
                    <div className="helpdesk-icon-wrapper">
                      <Icon
                        icon={helpdesk.iconPath}
                        width="40"
                        height="40"
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
  );
};

export default HelpdeskCompo;
