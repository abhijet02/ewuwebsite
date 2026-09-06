"use client";

import "./FooterThree.scss";
import Image from "next/image";
import ThirdFooter from "@/app/assets/third-footer.png";
import { Icon } from "@iconify/react";
import { FC, useEffect } from "react";
import { RootState } from "@lib/root.reducer";
import { useSelector } from "react-redux";
import { useMenuData } from "@lib/hooks/useMenuData";
import { usePageData } from "@lib/hooks/usePageData";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { followUsActions } from "@lib/slices/followUs/FollowUs.slice";
import { hotlineActions } from "@lib/slices/hotline/Hotline.slice";

const date = new Date().getFullYear();

const defaultMapLink =
  "https://maps.google.com/maps?q=East%20West%20University,%20Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed";

const FooterThree: FC = () => {
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

  // Separate menus into regular menus and quick links
  const regularMenus = parentFooterMenus.filter(
    (menu) =>
      !getChildMenus(menu.id).some(
        (childMenu) => childMenu.hasFooterMenuButton === "YES"
      )
  );
  const quickLinksMenu = parentFooterMenus.find((menu) =>
    getChildMenus(menu.id).some(
      (childMenu) => childMenu.hasFooterMenuButton === "YES"
    )
  );

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

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
    <div className="third-footer-section">
      <div className="container p-0">
        <div className="row">
          <div className="col-lg-3">
            <div
              {...(!isStatic ? { "data-aos": "fade-down" } : {})}
              className="logo-banner"
            >
              <Image src={ThirdFooter} width={190} alt="Footer Logo" />{" "}
            </div>

            <div className="address-map-contents">
              <div className="address-contents">
                <h4 className="footer-part-name text-start">Address</h4>
                <p className="footer-text">{footer?.footerAddress}</p>
              </div>

              <div
                {...(!isStatic
                  ? {
                      "data-aos":
                        window.innerWidth < 800 ? "fade-up" : "fade-left",
                    }
                  : {})}
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
                className="map-contents"
              >
                <h4 className="footer-part-name">Google Map</h4>
                <iframe
                  src={footer?.footerMapPath || defaultMapLink}
                  width="292"
                  height="167"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {regularMenus.length > 0 && (
            <div className="col-lg-3">
              <div
                {...(!isStatic ? { "data-aos": "zoom-right-out" } : {})}
                className="university-student-contents"
              >
                {regularMenus.map((parentMenu, index) => (
                  <div key={parentMenu.id}>
                    <h4
                      className={`footer-part-name ${
                        parentMenu.label.toLowerCase().includes("university")
                          ? "university-text"
                          : parentMenu.label.toLowerCase().includes("student")
                          ? "student-text"
                          : ""
                      } ${index > 0 ? "mt-4" : ""} text-start`}
                    >
                      {parentMenu.label}
                    </h4>
                    <ul className="footer-nav-lists">
                      {getChildMenus(parentMenu.id).map((childMenu) => (
                        <li key={childMenu.id}>
                          <a className="footer-text" href={childMenu.link}>
                            {childMenu.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {quickLinksMenu && (
            <div
              {...(!isStatic ? { "data-aos": "zoom-out-left" } : {})}
              className="col-lg-3"
            >
              <div className="btn-links-wrapper">
                <h4 className="footer-part-name mt-5 mb-3">
                  {quickLinksMenu.label}
                </h4>
                {getChildMenus(quickLinksMenu.id).map((childMenu) => (
                  <button
                    key={childMenu.id}
                    className="btn quick-links-btn"
                    onClick={() => (window.location.href = childMenu.link)}
                  >
                    {childMenu.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* <!-- Emergency and Follow Us --> */}
          <div
            {...(!isStatic
              ? {
                  "data-aos": window.innerWidth < 800 ? "fade-up" : "fade-left",
                }
              : {})}
            className="col-md-3"
          >
            <div className="contact-us-wrapper">
              <h4 className="footer-part-name text-start">Contact Us</h4>
              <div className="contact-info">
                <div className="info-item footer-text">
                  <Icon
                    className="footer-contact-icon"
                    icon="bytesize:telephone"
                    width="18"
                  />
                  {footer?.footerContactUsMobile}
                </div>
                <div className="info-item footer-text">
                  <Icon
                    className="footer-contact-icon"
                    icon="raphael:iphone"
                    width="18"
                  />
                  {footer?.footerContactUsHotline}
                </div>
                <div className="info-item footer-text">
                  <Icon
                    className="footer-contact-icon"
                    icon="ph:envelope-thin"
                    width="18"
                  />{" "}
                  {footer?.footerContactUsEmail}
                </div>
              </div>
            </div>
            <div className="emergency-number-wrapper">
              <h4 className="footer-part-name mb-3">Emergency Hot Line</h4>
              <div className="emergency-icons mb-5">
                <div className="logos">
                  {hotlineData?.map((hotline, index) => (
                    <a href={hotline?.link} key={index}>
                      <Image
                        className="add-padd"
                        src={hotline?.logoLink}
                        width={45}
                        height={35}
                        alt="footer logo"
                      />
                    </a>
                  ))}
                </div>
              </div>
              <h4 className="footer-part-name">Follow Us</h4>
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
            </div>
          </div>
          <hr />
          {/* <!-- Footer Bottom --> */}
          <div className="copyright-wrapper">
            <p className="bottom-footer-text">
              &copy; {date} {footer?.footerCopyRightTitle}
            </p>
            {/* <p className="bottom-footer-text">
              {`174,484,743 - Total Views | 14,202,452 - Today\'s Views`}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterThree;
