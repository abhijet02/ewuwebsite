"use client";

import Image from "next/image";
import "./ClubList.scss";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useClubData } from "@lib/hooks/useClubData";

const ClubList: React.FC = () => {
  const { clubs } = useClubData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <section className="student-welfare-part">
      <div className="container">
        <div className="row">
          {clubs?.map((item, index) => (
            <div
              key={index}
              {...(!isStatic
                ? {
                    "data-aos":
                      window.innerWidth < 800
                        ? "fade-up" // all items on small screens
                        : index % 4 === 0
                        ? "fade-right"
                        : index % 4 === 1 || index % 4 === 2
                        ? "fade-up"
                        : "fade-left",
                  }
                : {})}
              className="col-lg-4 col-md-6 col-sm-6 col-12 px-3 my-3"
            >
              <Link href={`/pages/clubs/${item?.slug}`}>
                <div className="student-welfare-card">
                  <div className="student-welfare-card-img">
                    <Image
                      src={item?.logoUrl}
                      width={130}
                      height={130}
                      alt="student-welfare-card-img"
                    />
                  </div>
                  <div className="student-welfare-card-info">
                    <h2>{item?.title}</h2>
                    <span className="student-welfare-card-link">
                      <Icon
                        icon="si:arrow-right-duotone"
                        width="24"
                        height="24"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubList;
