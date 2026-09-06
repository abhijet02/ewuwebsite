import React from "react";
import "./ArticlePageLayout.scss";
interface ArticlePageLayoutProps {
  children: React.ReactNode;
}

const ArticlePageLayout: React.FC<ArticlePageLayoutProps> = ({ children }) => {
  return (
    <div id="print-content-area">
      <div className="print-logo-container">
        <img
          src="https://new1.ewubd.edu/backend/uploads/others/files/1759425522723_logo-print.png"
          alt="EWU Logo"
          width={400}
          height={100}
          style={{ objectFit: "contain" }}
        />
      </div>
      <main className="article-content-wrapper">{children}</main>
      <div className="print-footer">
        <p style={{ margin: 0, fontWeight: 700 }}>
          Contact No:
          <span style={{ fontWeight: 500 }}>
            &nbsp; 55046678, 09666775577, 01755587224
          </span>
        </p>
        <p style={{ margin: 0, fontWeight: 700 }}>
          Email:<span style={{ fontWeight: 500 }}>&nbsp;info@ewubd.edu</span>
        </p>
        <p style={{ margin: 0, fontWeight: 700 }}>
          Website:{" "}
          <span style={{ fontWeight: 500 }}>&nbsp;https://www.ewubd.edu</span>
        </p>
        <p style={{ margin: 0, fontWeight: 700 }}>
          Address:
          <span style={{ fontWeight: 500 }}>
            &nbsp; A/2, Jahurul Islam Avenue, Jahurul Islam City, Aftabnagar,
            Dhaka-1212, Bangladesh
          </span>
        </p>
      </div>
    </div>
  );
};

export default ArticlePageLayout;
