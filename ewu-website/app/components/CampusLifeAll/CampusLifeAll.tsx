import { useCampusLifeData } from "@lib/hooks/useCampusLifeData";
import { RootState } from "@lib/root.reducer";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import "./CampusLifeAll.scss";

const CampusLifeAll = () => {
  const { campusLifes } = useCampusLifeData(); // no loading state
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  // Show 3 skeleton cards while data is undefined
  const skeletonArray = [1, 2, 3, 4, 5, 6];

  return (
    <div className="all-campus-life-body">
      <div className="container">
        <div className="all-campus-life-title">
          <h2>Campus Life</h2>
        </div>

        <div className="row g-3">
          {!campusLifes ? (
            skeletonArray.map((_, i) => (
              <div
                className="col-12 col-sm-12 col-md-4 col-lg-3"
                key={`skeleton-${i}`}
              >
                <div>
                  <div className="skeleton-img skeleton"></div>
                </div>
              </div>
            ))
          ) : campusLifes.length > 0 ? (
            campusLifes.map((campusLife) => (
              <div
                className="col-12 col-sm-12 col-md-4 col-lg-3"
                key={campusLife?.id}
              >
                <Link href={campusLife?.link} className="all-campus-life-card">
                  <div className="all-campus-life-image">
                    <Image
                      src={campusLife?.mediaUrl}
                      alt="Campus Life"
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "top",
                      }}
                    />
                  </div>
                  <div className="all-campus-life-card-content">
                    <h4>{campusLife?.title}</h4>
                    <p>{campusLife?.subtitle}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No campus life data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampusLifeAll;
