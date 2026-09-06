"use client";

import "./QuoteCardThree.scss";
import { FC, useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { quoteActions } from "@lib/slices/quote/quote.slice";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const QuoteCardThree: FC = () => {
  const dispatch = useAppDispatch();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const quotes = useAppSelector(
    (state) => state.quote.getQuotesResponse?.Quotes
  );

  useEffect(() => {
    dispatch(
      quoteActions.getQuotes({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );
  }, [dispatch]);

  return (
    <div className="third-advisor-container">
      <div className="container">
        {/* <!-- First Block --> */}
        {quotes?.map((item, index) => (
          <div
            key={index}
            {...(!isStatic
              ? { "data-aos": index % 2 === 0 ? "fade-right" : "fade-left" }
              : {})}
            className={
              index % 2 === 0
                ? "row align-items-center"
                : "row align-items-center flex-md-row-reverse"
            }
          >
            <div className="col-md-4">
              <div className="advisor-img-container">
                <Image
                  src={item.imageUrl}
                  width={300}
                  height={300}
                  className="logo"
                  alt="Picture of the author"
                />
              </div>
            </div>
            <div className="col-md-8">
              <p className="advisor-text">{item.quote}</p>
              <h5 className="advisor-name mb-2">{item.name}</h5>
              <p className="designation-text">{item.designation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuoteCardThree;
