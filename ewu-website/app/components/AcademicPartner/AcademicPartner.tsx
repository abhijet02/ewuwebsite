"use client";

import Image from "next/image";
import "./AcademicPartner.scss";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { usePageData } from "@lib/hooks/usePageData";

const AcademicPartner: React.FC = () => {
  const { paramPartnerships: partnerships } = usePageData();

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <section className="academic-partner-part">
      <div className="container">
        <h2>Academic Partners</h2>
        <div
          {...(!isStatic ? { "data-aos": "fade-up" } : {})}
          className="academic-partner-main"
        >
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Academic Partner Name</th>
                  <th scope="col">Logo</th>
                </tr>
              </thead>
              <tbody>
                {partnerships?.map((p) => (
                  <tr key={p?.id}>
                    <td style={{ verticalAlign: "middle" }}>{p?.name}</td>
                    <td
                      style={{
                        width: "160px",
                        height: "120px",
                        position: "relative",
                      }}
                    >
                      {p?.logoUrl && (
                        <Image
                          src={p?.logoUrl}
                          alt="logo"
                          width={100}
                          height={100}
                          style={{ objectFit: "contain" }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicPartner;
