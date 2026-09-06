"use client";

import { FC, useEffect } from "react";
import "./SuccessCardThree.scss";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { successCardActions } from "@lib/slices/successCard/successCard.slice";
import ProgressCard from "../ProgressCard/ProgressCard";
const SuccessCardThree: FC = () => {
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const dispatch = useAppDispatch();

  const successCardData = useAppSelector(
    (state) => state.successCard.getSuccessCardResponse?.successCards
  );

  useEffect(() => {
    dispatch(
      successCardActions.getSuccessCard({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );
  }, [dispatch]);

  return (
    <div className="third-stat-section">
      <div className="container stat-container">
        <div className="row text-center">
          {successCardData?.length > 0 &&
            successCardData?.map((item, index) => (
              <div
                {...(!isStatic
                  ? {
                      "data-aos":
                        window.innerWidth < 800
                          ? "fade-up" // all items on small screens
                          : index === 0
                          ? "fade-right"
                          : index === successCardData.length - 1
                          ? "fade-left"
                          : "zoom-in", // middle items on large screens
                    }
                  : {})}
                key={item.id}
                className="col-lg-3 col-md-6 my-2 sucess-card"
              >
                <ProgressCard item={item} index={index} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessCardThree;
