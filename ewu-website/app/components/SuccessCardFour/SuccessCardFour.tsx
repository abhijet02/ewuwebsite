"use client";

import "./SuccessCardFour.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { successCardActions } from "@lib/slices/successCard/successCard.slice";
import { useEffect } from "react";
const SuccessCardFour: React.FC = () => {
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
    <section className="landing-page-achievement">
      <div className="container">
        <div className="row g-3">
          {successCardData?.length > 0 &&
            successCardData?.map((item, index) => (
              <div
                {...(!isStatic
                  ? {
                      "data-aos":
                        window.innerWidth < 575
                          ? "fade-up" // all items fade-up on small screens
                          : index === 0
                          ? "fade-right"
                          : index === successCardData?.length - 1
                          ? "fade-left"
                          : "zoom-in",
                    }
                  : {})}
                key={item.id}
                className="col-lg-3 col-md-6 col-sm-6 col-12"
              >
                <div className="achievement-card">
                  <Icon icon={item?.logoLink} width="40" height="40" />
                  <h2>
                    {item.title === "Students Enrolled"
                      ? `${item?.countLabel}K+`
                      : `${item?.countLabel}+`}
                  </h2>
                  <p>
                    {item?.title} {""}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessCardFour;
