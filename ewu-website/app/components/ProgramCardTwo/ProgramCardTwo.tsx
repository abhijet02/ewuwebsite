"use client";

import { FC, useEffect } from "react";
import "./ProgramCardTwo.scss";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { programCardActions } from "@lib/slices/programCard/programCard.slice";
const ProgramCardTwo: FC = () => {
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
    <div className="sec-home-program-section">
      <div className="container-fluid px-0">
        <div className="row g-0">
          {programCardData?.length > 0 &&
            programCardData?.map((item, index) => (
              <div
                {...(!isStatic
                  ? {
                      "data-aos":
                        index === 0
                          ? "fade-left"
                          : index === 3
                          ? "fade-right"
                          : "zoom-in",
                    }
                  : {})}
                key={item.id}
                className="col-md-3"
              >
                <div className={`card-item card-item-${index + 1}`}>
                  <div className="icon-box">
                    <div className="nav-link-custom">
                      <Icon icon={item?.logoLink} width="60" />
                      <h5 className="nav-title">{item?.title}</h5>
                      <a href={item?.link}>View More</a>
                      <Icon
                        className="diagonal-arrow"
                        icon="cil:arrow-right"
                        width="18"
                        height="18"
                      />
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

export default ProgramCardTwo;
