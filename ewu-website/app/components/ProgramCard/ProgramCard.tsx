"use client";

import { Icon } from "@iconify/react";
import "./ProgramCard.scss";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { useEffect } from "react";
import { programCardActions } from "@lib/slices/programCard/programCard.slice";
import { useScrollToTop } from "../ScrollToTop/ScrollToTop";

const ProgramCardSkeleton = () => {
  return (
    <div className="col-lg-3 col-md-6 my-2 program-card-item">
      <div>
        <div className="skeleton skeleton-img" />
        <div className="skeleton skeleton-title" />
      </div>
    </div>
  );
};

const ProgramCard: React.FC = () => {
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);
  const scrollToTop = useScrollToTop();
  const dispatch = useAppDispatch();

  const programCardData = useAppSelector(
    (state) => state.programCard.getProgramCardResponse?.programCards
  );

  const loading = !programCardData || programCardData.length === 0;

  useEffect(() => {
    dispatch(
      programCardActions.getProgramCard({
        request: { page: 1, limit: 10000 },
      })
    );
  }, [dispatch]);
  const images = [
    "https://new1.ewubd.edu/backend/uploads/Temporary-Website-Images/undergraduate.webp",
    "https://new1.ewubd.edu/backend/uploads/Temporary-Website-Images/grade.webp",
    "https://images.unsplash.com/photo-1720540010412-343f3f81b91f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074", // index 2
    "https://new1.ewubd.edu/backend/uploads/Temporary-Website-Images/schl.webp", 
  ];
  
  return (
    <div className="program-card-part">
      <div className="container">
        <div className="row g-3">
          {loading
            ? // 🔹 Render 4 skeleton cards while loading
              Array.from({ length: 4 }).map((_, idx) => (
                <ProgramCardSkeleton key={idx} />
              ))
            : // 🔹 Render actual card data
              programCardData?.map((item, index) => (
                <div
                  {...(!isStatic
                    ? {
                        "data-aos":
                          window.innerWidth < 800
                            ? "fade-up"
                            : index === 0
                            ? "fade-right"
                            : index === programCardData?.length - 1
                            ? "fade-left"
                            : "zoom-in",
                      }
                    : {})}
                  key={item?.id}
                  className="col-lg-3 col-md-6 col-sm-6 col-12"
                >
                  <div
                    className="program-card"
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(28,67,112,0.9) 0%, rgba(28,67,112,0.7) 40%, rgba(28,67,112,0.3) 70%, rgba(28,67,112,0) 100%), url(${
                        images[index % images.length]
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div style={{ height: "100%" }}>
                      <div className="program-card-icon">
                        <Icon icon={item.logoLink} />
                      </div>
                      <div className="program-card-info">
                        <h2>{item?.title}</h2>
                      </div>
                    </div>
                    <Link href={item?.link} className="program-card-link">
                      View More
                      <Icon
                        icon="si:arrow-right-duotone"
                        width="22"
                        height="22"
                      />
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
