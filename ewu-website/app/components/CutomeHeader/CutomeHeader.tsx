"use client";

import "./CutomeHeader.scss";
import { renderSafeHTML } from "@lib/utils/html2text";
import { usePageData } from "@lib/hooks/usePageData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";

const CutomeHeader: React.FC = () => {
  const { pageDescription } = usePageData();
  const withoutStatic = useSelector(
    (state: RootState) => state.accessibility.mode,
  );

  return (
    <section className="description-part">
      <div
        {...(withoutStatic !== true && { "data-aos": "fade-up" })}
        className="container"
      >
        <div className="description">
          <h2 className="mb-4">
            {pageDescription && pageDescription[0]?.title}
          </h2>
          <div className="myhtml2-main-wrapper">
            {pageDescription && renderSafeHTML(pageDescription[0]?.description)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CutomeHeader;
