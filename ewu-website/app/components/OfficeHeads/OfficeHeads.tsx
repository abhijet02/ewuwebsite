"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import "./OfficeHeads.scss";
import { useOfficeData } from "@lib/hooks/useOfficeData";
import Placeholder_Person from "@/app/assets/Placeholder_Person.jpg";
import { YesOrNo } from "@lib/services/slider/slider.service.type";

const OfficeHeads = () => {
  const { heads } = useOfficeData();
    //  /* 👈 soft subtle shadow */

  return (
    <section
      className="office-chairperson-message-part"
      style={{ marginTop: heads && "40px" }}
    >
      <div className="row">
        <div className="col-lg-12 col-md-12 my-2">
          {heads &&
            heads?.map((head, i) => (
              <div className="chairperson-message-main" key={i}>
                <div className="d-flex gap-3 office-chairperson-message">
                  <div className="chairperson-message-img">
                    <Image
                      src={head?.profilePhotoUrl || Placeholder_Person}
                      fill
                      sizes="100vw"
                      alt="Head Photo"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <div className="chairperson-message-info">
                      <div>
                        <h4>{head?.name}</h4>
                        <h5>{head?.designation}</h5>

                        <div>
                          {head?.email && head?.isBoT !== YesOrNo.YES && (
                            <div className="faculty-head-contact">
                              <div style={{ width: "20px", height: "20px" }}>
                                <Icon
                                  icon="material-symbols:mail-outline-rounded"
                                  width="18"
                                  height="18"
                                />
                              </div>

                              <p>{head?.email}</p>
                            </div>
                          )}
                          <div className="faculty-head-contact">
                            <div style={{ width: "20px", height: "20px" }}>
                              <Icon icon="bx:phone" width="18" height="18" />
                            </div>
                            <p>
                              09666775577 {head?.ext && `(Ext: ${head.ext})`}
                            </p>
                          </div>

                          {head?.location && (
                            <div className="faculty-head-contact">
                              <div style={{ width: "20px", height: "20px" }}>
                                <Icon
                                  icon="mynaui:location"
                                  width="20"
                                  height="20"
                                />
                              </div>
                              <p style={{ margin: 0, fontSize: "14px" }}>
                                Room No: {head?.location}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="mt-3">
                          <a href={`/pages/office-member/${head?.slug}`}>
                            View Profile
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default OfficeHeads;
