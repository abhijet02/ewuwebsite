"use client";

import "./Marquee.scss";
import { useRef } from "react";
import { useMarqueeData } from "@lib/hooks/useMarqueeData";

const Marquee: React.FC = () => {
  const { pageLatestNews } = useMarqueeData();

  // Normalize items into a common structure
  const normalize = () => {
    return [
      ...pageLatestNews?.map((item) => ({
        id: item.id,
        label: item.label,
        link: item.link,
      })),
    ];
  };

  const bulletin = normalize();

  const BulletIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.84712 1.36052C7.78848 1.38479 7.70401 1.43744 7.65943 1.47755C7.6148 1.51762 7.25915 2.18819 6.86901 2.96767C6.07224 4.55969 5.82522 4.96811 5.40538 5.38753C4.96572 5.82674 4.69141 5.99148 3.02366 6.81799C1.36678 7.63908 1.33325 7.66235 1.33325 7.9924C1.33325 8.31544 1.36915 8.34052 2.99932 9.15582C4.69618 10.0044 4.95751 10.1617 5.39197 10.5957C5.83971 11.043 6.05212 11.3921 6.87869 13.0393C7.56386 14.4047 7.63905 14.5356 7.77515 14.6001C7.9763 14.6955 8.10699 14.6887 8.2805 14.5739C8.40367 14.4925 8.55134 14.2311 9.22189 12.908C9.65931 12.0449 10.0841 11.2433 10.1657 11.1266C10.3779 10.8238 10.8764 10.3337 11.179 10.1304C11.3216 10.0346 12.1147 9.61796 12.9416 9.20443C13.7953 8.7775 14.4916 8.40262 14.5526 8.33709C14.6945 8.18471 14.7064 7.81658 14.5741 7.66983C14.5268 7.61735 13.8304 7.24603 13.0265 6.84461C11.4982 6.08154 11.1376 5.87115 10.7485 5.51589C10.2664 5.07573 10.0945 4.80255 9.24339 3.123C8.70644 2.06347 8.38974 1.48498 8.31911 1.43469C8.18038 1.33592 7.98194 1.30474 7.84712 1.36052Z"
        fill="#fff"
      />
    </svg>
  );
  const marqueeRef = useRef<HTMLMarqueeElement>(null);

  const handlePause = () => {
    marqueeRef.current?.stop();
  };

  const handleResume = () => {
    marqueeRef.current?.start();
  };
  if (!bulletin || bulletin.length === 0) return null;
  return (
    <div className="news-section marquee-section-for-print">
      <div className="news-inner">
        <div className="left-text">
          <p>Latest News</p>
          <p>Latest</p>
        </div>
        <div className="flex-grow-1 right-text">
          {/* @ts-expect-error : marquee tag is deprecated but essential for this component */}
          <marquee behavior="scroll" direction="left" ref={marqueeRef}>
            {bulletin?.map((item, index) => (
              <span key={`${item.id + index}`}>
                <BulletIcon />
                <a
                  href={item?.link?.toString()}
                  target="_blank"
                  onMouseEnter={handlePause}
                  onMouseLeave={handleResume}
                  onTouchStart={handlePause}
                  onTouchEnd={handleResume}
                >
                  {item.label}
                </a>
                {index !== bulletin.length - 1 && (
                  <span className="divider">|</span>
                )}
              </span>
            ))}
            {/* @ts-expect-error : marquee tag is deprecated but essential for this component */}
          </marquee>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
