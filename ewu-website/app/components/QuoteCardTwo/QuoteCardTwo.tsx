"use client";

import { FC, useEffect } from "react";
import "./QuoteCardTwo.scss";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { quoteActions } from "@lib/slices/quote/quote.slice";

const QuoteCardTwo: FC = () => {
  const dispatch = useAppDispatch();

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
    <div className="second-home-page-advisor-card-section">
      <div className="container">
        <div className="row">
          {quotes?.map((item, index) => (
            <div key={index} className="col-md-6">
              <div key={index} className="advisor-wrapper">
                <div className="advisor-top">
                  <Image
                    src={item.imageUrl}
                    width={300}
                    height={300}
                    alt="Picture of the author"
                  />
                </div>
                <div className="advisor-bottom">
                  <p className="advisor-text">{item.quote}</p>
                  <div>
                    <p className="advisor-name">{item.name}</p>
                    <p className="advisor-title">{item.designation}</p>
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

export default QuoteCardTwo;
