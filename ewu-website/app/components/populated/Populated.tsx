"use client";

import "./populated.scss";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const Populated: React.FC = () => {
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <section className="populated-wrapper">
      <div
        {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
        className="container"
      >
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="items-wrapper">
              <div className="icon-wrapper">
                <Icon
                  icon="material-symbols-light:book-4-spark-outline"
                  width="64"
                  height="64"
                />
              </div>
              <div className="content-wrapper">
                <h4>Programs</h4>
                <p>For individuals</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="items-wrapper">
              <div className="icon-wrapper">
                <Icon icon="mdi:certificate-outline" width="64" height="64" />
              </div>
              <div className="content-wrapper">
                <h4>Certificate</h4>
                <p>For individuals</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="items-wrapper">
              <div className="icon-wrapper">
                <Icon
                  icon="streamline:dictionary-language-book"
                  width="64"
                  height="64"
                />
              </div>
              <div className="content-wrapper">
                <h4>Afford</h4>
                <p>For individuals</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="items-wrapper">
              <div className="icon-wrapper">
                <Icon
                  icon="carbon:ibm-application-and-discovery-delivery-intelligence"
                  width="64"
                  height="64"
                />
              </div>
              <div className="content-wrapper">
                <h4>Discover EDU</h4>
                <p>{"Don't Hesitate to Ask"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Populated;
