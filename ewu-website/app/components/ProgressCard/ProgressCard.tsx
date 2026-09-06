"use client";
import "./ProgressCard.scss";
import { Icon } from "@iconify/react";
import CountUp from "react-countup";
import { useEffect, useRef, useState } from "react";
import { Publish } from "@lib/services/successCard/successCard.service.type";

type Titem = {
  title: string;
  countLabel: string;
  logoLink: string;
  isPublished: Publish;
};

interface IProgresCard {
  item: Titem;
  index: number;
}

const ProgressCard: React.FC<IProgresCard> = ({ item, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // animate only once
        }
      },
      { threshold: 0.5 } // trigger when 50% visible
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`success-card ${index % 2 === 0 ? "even" : "odd"}`}
    >
      <div className="sucess-icon-number">
        <Icon icon={item?.logoLink} width="30" height="30" />
        <h1>
          <CountUp
            start={0}
            end={isVisible ? Number(item?.countLabel) : 0}
            duration={2.5}
            separator=","
          />
          {item.title === "Student Enrolled" ? "K+" : "+"}
        </h1>
      </div>
      <p>{item.title}</p>
    </div>
  );
};

export default ProgressCard;
