"use client";

import Image from "next/image";
import "./DepartmentBGImage.scss";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const DepartmentBGImage: React.FC = () => {
  const { department } = useDepartmentData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <>
      <section className="only-bg-img-part">
        <div
          {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
          className="container"
        >
          {
            <div className="only-bg-img">
              {department?.photoUrl && (
                <Image
                  src={department?.photoUrl}
                  width={400}
                  height={400}
                  alt="Department Image"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              )}
              <div className="only-img-text">
                <h2>{department?.name}</h2>
                <p>Discover our Programs, Shape your future</p>
              </div>
            </div>
          }
        </div>
      </section>
    </>
  );
};

export default DepartmentBGImage;
