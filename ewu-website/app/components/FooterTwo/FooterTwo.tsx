"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { FC, useEffect } from "react";
import { useMenuData } from "@lib/hooks/useMenuData";
import { usePageData } from "@lib/hooks/usePageData";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { followUsActions } from "@lib/slices/followUs/FollowUs.slice";
import { hotlineActions } from "@lib/slices/hotline/Hotline.slice";

const date = new Date().getFullYear();

const defaultMapLink =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.4062059057396!2d90.42292967592795!3d23.768545288078343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7892dcf0001%3A0x853ad729be4edc71!2sEast%20West%20University!5e0!3m2!1sen!2sbd!4v1738062812974!5m2!1sen!2sbd";

const FooterTwo: FC = () => {
  const { defaultFooter: footer } = usePageData();
  const { menus } = useMenuData();

  const dispatch = useAppDispatch();

  const footerMenus =
    menus && menus?.filter((menu) => menu?.menuType === "FOOTER");

  const parentFooterMenus =
    footerMenus?.filter((menu) => menu?.depth === 0) || [];

  const getChildMenus = (parentId) => {
    return footerMenus?.filter((menu) => menu?.parent === parentId) || [];
  };

  const followUsData = useAppSelector(
    (state) => state.followUs.getFollowUsResponse?.followUsList
  );

  const hotlineData = useAppSelector(
    (state) => state.hotline.getHotlineResponse?.hotlines
  );

  useEffect(() => {
    dispatch(
      followUsActions.getFollowUs({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );

    dispatch(
      hotlineActions.getHotline({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );
  }, [dispatch]);

  return (
    <div className="second-footer-section">
      <iframe
        className="map-embed"
        src={footer?.footerMapPath || defaultMapLink}
        loading="lazy"
      ></iframe>
      <div className="footer-wrapper">
        <div className="container-fluid footer">
          <div className="row gx-3">
            <div className="col-lg-3 col-md-6 mb-3 ">
              <h4 className="footer-text">Address</h4>
              <p className="footer-light-text">{footer?.footerAddress}</p>
              <h4 className="footer-text mt-4">Follow Us</h4>
              <div className="social-icons">
                {followUsData?.map((follow, index) => (
                  <a href={follow?.link} key={index}>
                    <Icon
                      className="effect-icon"
                      icon={follow?.logoLink}
                      width="30"
                    />
                  </a>
                ))}
              </div>
              {/* <div className="view-stats mt-3">
                {`174,484,743-Total Views | 14,202,452-Today's Views`}
              </div> */}
            </div>

            <div className="col-lg-3 col-md-12 mb-3">
              <h4 className="footer-text">Contact Us</h4>
              <div className="contact-info">
                <div className="info-item">
                  <Icon
                    className="footer-contact-icon"
                    icon="bytesize:telephone"
                    width="18"
                  />
                  {footer?.footerContactUsHotline}
                </div>
                <div className="info-item">
                  <Icon
                    className="footer-contact-icon"
                    icon="raphael:iphone"
                    width="18"
                  />
                  {footer?.footerContactUsMobile}
                </div>
                <div className="info-item">
                  <Icon
                    className="footer-contact-icon"
                    icon="ph:envelope-thin"
                    width="18"
                  />{" "}
                  {footer?.footerContactUsEmail}
                </div>
                {/* <div className="info-item">
                  <Icon
                    className="footer-contact-icon"
                    icon="mdi:web"
                    width="18"
                  />
                  admission@ewubd.edu
                </div> */}
              </div>
            </div>

            {parentFooterMenus.map((parentMenu) => (
              <div className="col-lg-2 col-md-6 mb-3" key={parentMenu.id}>
                <h4 className="footer-text">{parentMenu.label}</h4>
                {getChildMenus(parentMenu.id).some(
                  (childMenu) => childMenu.hasFooterMenuButton === "YES"
                ) ? (
                  // Render buttons for specific menus (like Quick Links)
                  <>
                    {getChildMenus(parentMenu.id).map((childMenu) => (
                      <button
                        key={childMenu.id}
                        className="btn quick-links-btn"
                        onClick={() => (window.location.href = childMenu.link)}
                      >
                        {childMenu.label}
                      </button>
                    ))}
                  </>
                ) : (
                  // Otherwise render as list items
                  <ul className="list-unstyled">
                    {getChildMenus(parentMenu.id).map((childMenu) => (
                      <li key={childMenu.id}>
                        <a href={childMenu.link}>{childMenu.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bottom-footer-headline-wrapper">
          {/* <!-- Footer Bottom --> */}
          <div className="footer-bottom">
            <div className="container">
              <div className="row">
                <div className="col-md-6 copyright-mob">
                  <div className="copyright-wrapper">
                    <span className="me-1">
                      © {date} {footer?.footerCopyRightTitle || ""}
                    </span>
                  </div>
                </div>
                <div className="col-md-6 help-line-mob">
                  <div className="help-line-wrapper mt-2 mt-md-0">
                    <div className="">
                      <strong>Emergency Hot Line</strong>
                    </div>
                    <div>
                      {hotlineData?.map((hotline, index) => (
                        <a href={hotline?.link} key={index}>
                          <Image
                            className="add-padd"
                            src={hotline?.logoLink}
                            width={36}
                            height={34}
                            alt="footer logo"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTwo;
