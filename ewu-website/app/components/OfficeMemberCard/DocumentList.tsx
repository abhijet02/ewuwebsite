"use client";

import { useState } from "react";
import "./DocumentList.scss";
import { OfficeMemberDocument } from "@lib/services/officeMemberDocument/officeMemberDocument.service.type";

// interface Document {
//   title: string;
//   filePath: string;
// }

interface DocumentListProps {
  documents: OfficeMemberDocument[];
  setSelectedDoc: (doc: OfficeMemberDocument) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  setSelectedDoc,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="preview-document-button-wrapper">
      <button
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          background: "#fff",
          color: "#0f2a55",
          cursor: "pointer",
          fontSize: "14px",
          transition: "all 0.2s ease-in-out",
        }}
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        Preview Documents
      </button>

      <ul
        style={{
          position: "absolute",
          top: 48,
          left: 0,
          margin: 0,
          padding: "8px 0",
          listStyle: "none",
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: "8px",
          minWidth: "180px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          transform: menuOpen ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.2s ease-in-out",
          zIndex: 100,
        }}
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        {documents?.map((doc, index) => (
          <li key={index}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSelectedDoc(doc);
                setMenuOpen(false);
              }}
              style={{
                display: "block",
                padding: "8px 16px",
                color: "#0f2a55",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              {doc.fileName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
