"use client";

import "./ProgramCardThree.scss";
import { FC, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { programCardActions } from "@lib/slices/programCard/programCard.slice";
const ProgramCardThree: FC = () => {
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const dispatch = useAppDispatch();

  const programCardData = useAppSelector(
    (state) => state.programCard.getProgramCardResponse?.programCards
  );

  useEffect(() => {
    dispatch(
      programCardActions.getProgramCard({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );
  }, [dispatch]);

  return (
    <div className="third-home-program-section">
      <div className="container-fluid p-0">
        <div className="row g-0">
          {programCardData?.length > 0 &&
            programCardData?.map((item) => (
              <div
                {...(!isStatic
                  ? {
                      "data-aos":
                        window.innerWidth < 800 ? "fade-up" : "fade-right",
                    }
                  : {})}
                className="col-md-3"
                key={item.id}
              >
                <div className="card-item-1">
                  <div className="icon-box">
                    <div className="nav-link-custom">
                      <Icon icon={item?.logoLink} width="40" />
                      <br />
                      <h5 className="nav-title">{item?.title}</h5>
                      <a href={item?.link}> View More</a>
                      <Icon
                        className="diagonal-arrow"
                        icon="cil:arrow-right"
                        width="18"
                        height="18"
                      />{" "}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramCardThree;
