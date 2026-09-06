"use client";

import "./footer.scss";
import "./newsLetter.scss";
import Image from "next/image";
import logo from "@/app/assets/logo-bw.png";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useMenuData } from "@lib/hooks/useMenuData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { useEffect } from "react";
import { followUsActions } from "@lib/slices/followUs/FollowUs.slice";
import { hotlineActions } from "@lib/slices/hotline/Hotline.slice";
import { footerActions } from "@lib/slices/footer/footer.slice";

const date = new Date().getFullYear();

const defaultMapLink =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.4062059057396!2d90.42292967592795!3d23.768545288078343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7892dcf0001%3A0x853ad729be4edc71!2sEast%20West%20University!5e0!3m2!1sen!2sbd!4v1738062812974!5m2!1sen!2sbd";

const Footer: React.FC = () => {
  //const { defaultFooter: footer } = usePageData();
  const { defaultMenus: menus } = useMenuData();

  const dispatch = useAppDispatch();

  const footers = useAppSelector(
    (state) => state.footer.getFootersResponse?.allFooter
  );

  const footerMenus =
    menus && menus?.filter((menu) => menu?.menuType === "FOOTER");

  const parentFooterMenus =
    footerMenus?.filter((menu) => menu?.depth === 0) || [];

  const getChildMenus = (parentId) => {
    return footerMenus?.filter((menu) => menu?.parent === parentId) || [];
  };

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const followUsData = useAppSelector(
    (state) => state.followUs.getFollowUsResponse?.followUsList
  );

  const hotlineData = useAppSelector(
    (state) => state.hotline.getHotlineResponse?.hotlines
  );
  const footer = footers?.find((footer) => footer.pageId === 0);

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

    dispatch(
      footerActions.getFooters({
        request: { page: 0, limit: 500 },
      })
    );
  }, [dispatch]);

  return (
    <div className="footer-main-body">
      <section className="news-letter-part">
        <div className="container">
          <div className="news-letter-bg">
            <div className="news-letter">
              <h1>{footer?.headerText || ""}</h1>
              <Link
                href={"https://admission.ewubd.edu/"}
                className="news-letter-input"
              >
                {footer?.footerApplyNowText || ""}
                <Icon icon="si:arrow-right-duotone" width="30" height="30" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section
        className="footer-part"
        style={{
          backgroundImage: `url(${
            footer?.footerMediaUrl || "/footer-shape.svg"
          })`,
          // backgroundImage: `url(../../../public/footer-shape.svg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="footer-logo">
            <div className="footer-logo-wrapper">
              <Image
                src={footer?.footerLogoUrl || logo}
                fill
                alt="Footer Logo"
                className="footer-logo-image"
              />
            </div>
          </div>
          <div>
            <div className="row mt-5 mb-4">
              {/* Column 1: Address + Google Map */}
              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                <div className="footer-part-child pe-4">
                  <div className="footer-part-address">
                    <h2>Address</h2>
                    <p>{footer?.footerAddress}</p>
                  </div>
                  <div>
                    <h2>Google Map</h2>
                    <iframe
                      src={footer?.footerMapPath || defaultMapLink}
                      width="100%"
                      height="242"
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Column 2: Nested layout with two rows */}
              <div className="col-lg-8 col-md-6">
                {/* Row 1: University, Student, Quick Links */}
                <div className="row">
                  {parentFooterMenus.map((parentMenu) => (
                    <div
                      className={`col-lg-4 col-md-${
                        parentMenu.label === "Quick Links" ? "12" : "6"
                      } mb-4`}
                      key={parentMenu.id}
                    >
                      <div className="footer-part-child">
                        <div>
                          <h2>{parentMenu.label}</h2>
                          {getChildMenus(parentMenu.id).some(
                            (childMenu) =>
                              childMenu.hasFooterMenuButton === "YES"
                          ) ? (
                            // Render buttons for specific menus
                            <>
                              {getChildMenus(parentMenu.id).map((childMenu) => (
                                <button
                                  key={childMenu.id}
                                  onClick={() =>
                                    (window.location.href = childMenu.link)
                                  }
                                >
                                  {childMenu.label}
                                </button>
                              ))}
                            </>
                          ) : (
                            // Otherwise render as list items
                            <ul>
                              {getChildMenus(parentMenu.id).map((childMenu) => (
                                <li key={childMenu.id}>
                                  <Link
                                    className="footer-link"
                                    href={childMenu.link}
                                  >
                                    {childMenu.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Row 2: Contact Us and Follow Us */}
                <div className="row">
                  <div className="col-md-8 mb-4">
                    <div className="footer-part-child">
                      <div className="footer-contact-us">
                        <h2>Contact Us</h2>
                        <div className="mt-3">
                          <div className="contact-box">
                            <div>
                              <Icon
                                icon="fluent:phone-32-light"
                                width="26"
                                height="26"
                              />
                            </div>
                            <div>
                              <p>Phone no: {footer?.footerContactUsMobile}</p>
                              <p>Hotline: {footer?.footerContactUsHotline}</p>
                            </div>
                          </div>
                          <div className="contact-box">
                            <div>
                              <Icon
                                icon="system-uicons:mail"
                                width="26"
                                height="26"
                              />
                            </div>
                            <div>
                              <p>Email: {footer?.footerContactUsEmail}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="footer-part-child">
                      <div className="footer-contact-us">
                        <h2>Follow Us</h2>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                          }}
                        >
                          {followUsData?.map((follow, index) => (
                            <Link
                              href={follow?.link}
                              key={index}
                              style={{
                                border: "1px solid #fff",
                                color: "#FFF",
                                width: "40px",
                                height: "40px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "8px",
                              }}
                            >
                              <Icon
                                icon={follow?.logoLink}
                                width="22"
                                height="22"
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-copy-right-part">
            <div>
              <p>
                &copy; {date} {footer?.footerCopyRightTitle}
              </p>
            </div>
            <div className="copy-right-link">
              <h3>Emergency hotline</h3>
              {hotlineData?.map((hotline, index) => (
                <Link href={hotline?.link} key={index}>
                  <Image
                    src={hotline?.logoLink}
                    width={40}
                    height={40}
                    alt="footer logo"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
