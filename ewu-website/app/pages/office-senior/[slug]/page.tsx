"use client";

import "./office.scss";
import Image from "next/image";
import { Icon } from "@iconify/react";
import CommonSubBanner from "@/app/components/CommonSubBanner/CommonSubBanner";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import { useOfficeData } from "@lib/hooks/useOfficeData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { BoTHtmlParse } from "@/app/components/BoTMemberCard/BoTHtmlParse";
import { renderSafeHTML } from "@lib/utils/html2text";
import Link from "next/link";
import Avatar from "public/male.png";
const OfficePage: React.FC = () => {
  const { office, heads, members } = useOfficeData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <div>
      <Navbar />
      <CommonSubBanner link={["Office"]} title={office?.title} />
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-12 col-sm-12 col-md-6 col-lg-3">
            <h3
              className="page-title"
              {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
            >
              {office?.title}, EWU
            </h3>
          </div>
          {heads &&
            heads?.map((head, i) => (
              <div className="col-12 col-sm-12 col-md-12 col-lg-9" key={i}>
                <div className="chairperson-card">
                  <div className="chairperson-image">
                    <Image
                      src={head?.profilePhotoUrl}
                      fill
                      sizes="100vw"
                      {...(!isStatic
                        ? {
                            "data-aos":
                              window.innerWidth < 800 ? "fade-up" : "zoom-in",
                          }
                        : {})}
                      alt="Head Photo"
                    />
                  </div>
                  <div
                    className="chairperson-info"
                    {...(!isStatic
                      ? {
                          "data-aos":
                            window.innerWidth < 800 ? "fade-up" : "fade-right",
                        }
                      : {})}
                  >
                    <h4 className="name">{head?.name}</h4>
                    <p className="degnation">
                      {renderSafeHTML(head?.educationDescription)}
                    </p>
                    <h5 className="doc-lable">{head?.designation}</h5>
                    {BoTHtmlParse(head?.previousWorkExperience)}

                    <div className="mt-3">
                      <Link
                        href={`/pages/bot-member/${head?.slug}`}
                        className="button-outline primary-button-outline"
                      >
                        View Profile
                        <Icon icon="gravity-ui:arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="bot-members-card-deck mt-5">
          <h2
            className="bot-members-title"
            {...(!isStatic ? { "data-aos": "fade-down" } : {})}
          >
            Members, {office?.title}
          </h2>
          <div className="row gx-2 gy-5">
            {members &&
              members?.map((member, i) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
                  <div
                    className="bot-member-card"
                    {...(!isStatic
                      ? {
                          "data-aos":
                            window.innerWidth < 800 ? "fade-up" : "fade-right",
                        }
                      : {})}
                  >
                    <div className="bot-member-info">
                      <Image
                        src={
                          member?.profilePhotoUrl
                            ? member?.profilePhotoUrl
                            : Avatar
                        }
                        width={250}
                        height={250}
                        className="img-fluid"
                        alt="Head Photo"
                      />
                      <div style={{ margin: 0 }}>
                        <h5 className="title" style={{ margin: 0 }}>
                          {member?.name}
                        </h5>
                        <p className="designation" style={{ margin: 0 }}>
                          {member?.designation}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link
                        href={`/pages/bot-member/${member?.slug}`}
                        className="button-outline primary-button-outline"
                      >
                        View Profile
                        <Icon icon="gravity-ui:arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OfficePage;
