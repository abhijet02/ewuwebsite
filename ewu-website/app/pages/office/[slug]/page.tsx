"use client";

import "./office.scss";
import CommonSubBanner from "@/app/components/CommonSubBanner/CommonSubBanner";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import OfficeHeads from "@/app/components/OfficeHeads/OfficeHeads";
import OfficeMembers from "@/app/components/OfficeMembers/OfficeMembers";
import { useOfficeData } from "@lib/hooks/useOfficeData";
import SidebarMenu from "@/app/components/SideBarMenu/SidebarMenu";
import { useOfficeDocumentData } from "@lib/hooks/useOfficeDocumentData";
import { useState } from "react";
import PdfViewer from "@/app/components/PdfViewer/PdfViewer";

const OfficePage: React.FC = () => {
  const { office, heads, members } = useOfficeData();
  const { officeDocuments } = useOfficeDocumentData();

  // selected item state
  const [selectedItem, setSelectedItem] = useState("");

  // --- PDF Modal State ---
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const handlePreview = (url: string) => {
    setPdfUrl(url);
    setPdfOpen(true);
  };

  // Get documents for the current office
  const selectedOfficeDocuments = officeDocuments?.filter(
    (document) => document.officeId === office?.id
  );

  return (
    <div>
      <Navbar />
      <CommonSubBanner link={["Office"]} title={office?.title} />
      <div style={{ paddingBottom: "64px" }}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-4 col-lg-3">
              <SidebarMenu />
            </div>
            <div className="col-sm-12 col-md-8 col-lg-9">
              {selectedOfficeDocuments?.length > 0 && (
                <div 
                className="office-document-filter"
                  
                >
                  <h5>Important Links & documents</h5>
                  <select
                    className="form-select"
                    value={selectedItem}
                    onClick={() => setSelectedItem("")}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      setSelectedItem(selectedId);

                      const doc = selectedOfficeDocuments?.find(
                        (d) => d.id.toString() === selectedId
                      );

                      if (!doc) return;

                      if (doc.fileUrl) {
                        handlePreview(doc.fileUrl);
                      } else if (doc.link) {
                        window.open(doc.link, "_blank");
                      }
                    }}
                    style={{ width: "220px" }} // ← set fixed width here
                  >
                    <option value="" disabled>
                      Select Document
                    </option>
                    {selectedOfficeDocuments.map((doc) => (
                      <option key={doc?.id} value={doc?.id}>
                        {doc?.fileName}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {heads?.length > 0 && <OfficeHeads />}
              {members && <OfficeMembers />}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Pdf Viewer Modal */}
      <PdfViewer
        url={pdfUrl}
        title="PDF Preview"
        open={pdfOpen}
        onClose={() => setPdfOpen(false)}
      />
    </div>
  );
};

export default OfficePage;
